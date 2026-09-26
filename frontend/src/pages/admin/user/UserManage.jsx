import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// 공통 UI 컴포넌트
import Pagination from '../../../components/common/pagination/Pagination';
import TabMenus from '../../../components/common/tab-menus/TabMenus';
import MemberCard from '../../../components/admin/member-card/MemberCard';
import UserManageFilters from './UserManageFilters';
import DashboardHeader from '../OperationStatus/DashboardHeader';

// 이 페이지에서 사용하는 스타일
import styles from './UserManage.module.scss';

// status 탭
// NORMAL, SUSPENDED, SLEEP, WITHDRAW
export const STATUS_TABS = [
    { value : "", label: "전체 상태" },
    { value : "NORMAL", label: "일반" },
    { value : "SUSPENDED", label: "정지" },
    { value : "SLEEP", label: "휴면" },
    { value : "WITHDRAWN", label: "탈퇴" },
];

export default function UserManage() {
  // 다른 페이지로 이동할 때 사용하는 함수


  
  const navigate = useNavigate();


  // 조회한 회원 목록
  const [members, setMembers] = useState([]);

  // 서버에서 받은 페이지네이션 정보
  const [pager, setPager] = useState(null);

  // 데이터 조회 중인지 나타내는 상태
  const [loading, setLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  //import DashboardHeader 기능 추가-> 새로고침 + 우측 상단 시간 계산 기능
  const [currentTime, setCurrentTime] = useState(
    () => `${new Date().toLocaleString('sv-SE')} 기준`
  );


  // 서버에 전달할 조회 조건
  const [searchParams, setSearchParams] = useState({
    page: 1,      // 현재 페이지
    perPage: 10,  // 페이지 당 회원수
    status: '',   // 회원 상태 필터
    search: '',   // 검색 대상 필드
    keyword: '',   // 검색어
    joinedFrom: '',
    joinedTo: '',
    activityStatus: '',
    regionCode: '',
    rating: '',
  });

  /*회원 목록 조회 함수*/
  // useCallback으로 함수 참조를 유지
  // searchParams가 변경되면 새 함수를 생성
  const fetchMembers = useCallback(async() => {
    //조회 시작 -> 로딩 상태 활성화
    setLoading(true);

    //조회 조건을 URL 쿼리 문자열로 변환
    const query = new URLSearchParams();

    Object.keys(searchParams).forEach((key) => {
      // 값이 truthy인 조건만 쿼리에 추가
      // 현재 초기값에서는 빈 문자열은 빠지고 page, perPage만 포함됨
      // 주의: 숫자 0이나 boolean false도 제외되는 조건임
      if (searchParams[key]) {
        query.append(key, searchParams[key]);
      }
    });

    try {
      // 예: /api/admin/products?page=1&perPage=10
      const response = await fetch(
        `/api/admin/members?${query.toString()}`
      );

      // HTTP 응답이 성공 상태(200~299)가 아니면 catch로 이동
      if (!response.ok) {
        throw new Error('데이터 로딩 실패');
      }

      // 서버의 JSON 응답을 자바스크립트 객체로 변환
      const result = await response.json();

      if (result.data) {
        // 상품 목록 갱신 → DataTable에 반영
        setMembers(result.data.content);

        // 페이지 정보 갱신 → Pagination에 반영
        setPager(result.data.pager);

        //시간은 조회 성공 시에만 갱신하도록
        setMembers(result.data.content);
        setPager(result.data.pager);
        setCurrentTime(`${new Date().toLocaleString('sv-SE')} 기준`);
        
        console.log("데이터 갱신 완료");
      }
    } catch (error) {
      // 요청 실패나 JSON 처리 중 발생한 오류를 콘솔에 출력
      console.error('Fetch Error', error);
    } finally {
      // 성공·실패와 관계없이 로딩 종료
      setLoading(false);
    }
  }, [searchParams]);

  // 첫 화면 진입 시 상품 조회
  // 이후 searchParams가 바뀌어 fetchProducts가 새로 생성되면 다시 조회
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // 상태 탭 선택 시 실행
  const handleTabChange = (statusValue) => {
    setSearchParams((prev) => ({
      ...prev,
      status: statusValue,
      page: 1,
    }));
  };


  // SearchBox에서 검색을 제출하면 실행
  // searchData는 SearchBox가 전달하는 검색 조건 객체
  const handleSearchSubmit = (searchData) => {
    setSearchParams((prev) => ({
      ...prev,        // 기존 조건 유지
      ...searchData,  // 전달받은 검색 조건으로 덮어쓰기
      page: 1,        // 새 검색은 첫 페이지부터 시작
    }));
  };

  // 페이지네이션에서 페이지를 선택하면 실행
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => ({
      ...prev,
      page: newPage, // 검색 조건은 유지하고 페이지만 변경
    }));
  };

  const handleFilterChange = (name, value) => {
  setSearchParams((prev) => ({
    ...prev,
    [name]: value,
    page: 1,
  }));
};

//import DashboardHeader 기능 추가
const handleRefresh = async () => {
  if (loading || isSpinning) return;

  setIsSpinning(true);

  try {
    await fetchMembers();
  } finally {
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  }
};

  return (
    <div className={styles.container}>
       {/* 제목 + 새로고침 + 현재 시각 */}
        <div className={styles.header}>
          <DashboardHeader
            title="관리자 회원 관리"
            lastUpdated={currentTime}
            isSpinning={isSpinning}
            handleRefresh={handleRefresh}
          />
        </div>

      {/* 회원 상태 탭 */}
      <TabMenus
        className={styles.tabs}
        tabs={STATUS_TABS}
        activeStatus={searchParams.status}
        onTabChange={handleTabChange}
      />

      {/* 날짜·드롭다운·검색창 */}
      <UserManageFilters
        filters={searchParams}
        onFilterChange={handleFilterChange}
        onSearch={handleSearchSubmit}
      />

      {/* 회원 카드 목록 */}
      {loading ? (
        <p>회원 목록을 불러오는 중입니다.</p>
      ) : members.length === 0 ? (
        <p>조회된 회원이 없습니다.</p>
      ) : (
        <div className={styles.memberGrid}>
          {members.map((member) => (
            <MemberCard key={member.code} member={member} />
          ))}
        </div>
      )}

      {/* 페이지 이동 */}
      <Pagination
        pager={pager}
        onChangePage={handlePageChange}
      />
    </div>
  );  
}