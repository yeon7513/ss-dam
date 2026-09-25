
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 공통 UI 컴포넌트
import DataTable from '../../../components/common/data-table/DataTable';
import Pagination from '../../../components/common/pagination/Pagination';
import SearchBox from '../../../components/common/search-box/SearchBox';
import TabMenus from '../../../components/common/tab-menus/TabMenus';

// 이 페이지에서 사용하는 스타일
import styles from './UserManage.module.scss';

// 검색 옵션, 상태 탭, 테이블 컬럼 설정은 별도 파일에서 관리
import {
  DELETE_YN_OPTIONS,
  SEARCH_OPTIONS,
  STATUS_TABS,
  getMemberColumns,
} from './UserManage.constants';

export default function UserManage() {
  // 다른 페이지로 이동할 때 사용하는 함수
  const navigate = useNavigate();

  // 회원 테이블의 컬럼 설정 생성
  // 컬럼 내부에서 페이지 이동 기능을 사용할 수 있도록 navigate 전달
  const columns = getMemberColumns(navigate);

  // 조회한 회원 목록
  const [members, setMembers] = useState([]);

  // 서버에서 받은 페이지네이션 정보
  const [pager, setPager] = useState(null);

  // 데이터 조회 중인지 나타내는 상태
  const [loading, setLoading] = useState(false);

  // 서버에 전달할 조회 조건
  const [searchParams, setSearchParams] = useState({
    page: 1,      // 현재 페이지
    perPage: 10,  // 페이지 당 회원수
    status: '',   // 회원 상태 필터
    deleteYn: '', // 탈퇴&휴면 여부 필터
    search: '',   // 검색 대상 필드
    keyword: '',   // 검색어
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

  // 삭제 여부 라디오 버튼 선택 시 실행
  const handleDeleteYnChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      deleteYn: e.target.value, // 선택한 라디오 버튼의 값
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

  return (
    <div className={styles.container}>
      <h2>관리자 회원 관리</h2>

      {/* 상품 상태별 탭 */}
      <TabMenus
        tabs={STATUS_TABS}                  // 표시할 탭 목록
        activeStatus={searchParams.status}  // 현재 선택한 상태
        onTabChange={handleTabChange}       // 탭 선택 시 실행할 함수
      />

      {/*검색창과 삭제 여부 필터를 배치하는 영역*/}
      <div className={styles.filterBar}>

        {/* 빈 요소: 구체적인 배치 역할은 SCSS 설정에 따라 결정 */}
        {/* 내용이 없는 HTML 요소지만 CSS Grid에서는 하나의 칸을 차지하는 요소 */}
        <div/>

        <div className={styles.searchWrapper}>
        {/* 검색창 : 검색 대상 선택과 검색어 입력 */}
        <SearchBox
          name="search"
          options={SEARCH_OPTIONS} // 검색 대상 옵션 목록
          initSelectValue=""       // 초기 선택값
          initKeyword=""           // 초기 검색어
          onSearch={handleSearchSubmit}
        />
        </div>

        {/* 라디오 버튼 : 삭제 여부 선택 영역 */}
          <div className={styles.radioGroup}>
          {DELETE_YN_OPTIONS.map((opt) => (
            <label key={opt.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="deleteYn" // 같은 name으로 하나의 선택 그룹 구성
                value={opt.value}
                // 현재 조회 조건과 같은 값을 가진 버튼을 선택 표시
                checked={searchParams.deleteYn === opt.value}
                onChange={handleDeleteYnChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* 상품 목록 표시 */}
      <DataTable
        columns={columns}
        data={members}
        loading={loading}
      />

      {/* 페이지 이동 UI */}
      <Pagination
        pager={pager}
        onChangePage={handlePageChange}
      />
    </div>
  );
}

