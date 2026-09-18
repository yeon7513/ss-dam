import { useCallback, useEffect, useState } from 'react';
import DataTable from '../../components/common/data-table/DataTable';
import TabMenus from '../../components/common/tab-menus/TabMenus';
import Pagination from './../../components/common/pagination/Pagination';
import SearchBox from './../../components/common/search-box/SearchBox';
import styles from './MarketManage.module.scss';


// status 탭
const STATUS_TABS = [
  { value: '', label: '전체 상태' },
  { value: 'ACTIVE', label: '활성' },
  { value: 'PRIVATE', label: '비공개' },
  { value: 'BLINDED', label: '블라인드' },
  { value: 'REPORTED', label: '신고됨' },
  { value: 'DELETED', label: '삭제' },
];

// 활성화 여부 라디오 버튼
const DELETE_YN_OPTIONS = [
  { value: '0', label: '활성화' },
  { value: '1', label: '비활성화' },
];

// SearchBox.jsx 컴포넌트
const SEARCH_OPTIONS = [
  { code: '', name: '전체 검색' },
  { code: 'title', name: '제목' },
  { code: 'author', name: '작성자 아이디' },
];



const UserManage = () => {
  return (
    <div>
      <h2>UserManage</h2> {/* 회원 관리 */}
      <h2>안녕하세요</h2>
      <h2>리액트 공부중입니다</h2>
    </div>
  );
};


export default function UserManage() {

  const [users, setUsers] = useState([]);
  const [pager, setPager] = useState(null);
  const [loading, setLoading] = useState(false);


  const [searchParams, setSearchParams] = useState({
    page: 1,
    perPage: 10,
    status: '',
    deleteYn: '',
    search: '',
    keyword: '',
  });


  const fetchMembers = useCallback(async () => {

    setLoading(true);



    const query = new URLSearchParams();


    Object.keys(searchParams).forEach((key) => {

      if (searchParams[key]) query.append(key, searchParams[key]);


      try{

        const response = await fetch(`/api/admin/products?${query.toString()}`);


        if (!response.ok) throw new Error("데이터 로딩 실패");


        const result = await response.json();


        if (result.data) {

          setProducts(result.data.content);

          setPager(result.data.pager);
        }


      } catch (error) {
        console.error('Fetch Error', error);
        

      } finally {
        setLoading(false);
      }

    }, [searchParams]);

    });


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


 const handleTabChange = (statusValue) => {

    setSearchParams((prev) => ({

      ...prev,
     
      status: statusValue,
      page: 1,
    }));
  };


 const handleDeleteYnChange = (e) => {
   
    setSearchParams((prev) => ({
      ...prev,
      
      deleteYn: e.target.value,
     
      page: 1,
    }));
  };


  const handleSearchSubmit = (searchData) => {
   
    setSearchParams((prev) => ({
      ...prev,
      
      ...searchData,
     
      page: 1,
    }));
};


const handlePageChange = (newPage) => {

    setSearchParams((prev) => ({ ...prev, page: newPage }));
  };



return (

    <div className={styles.container}>
      
      {/* 화면 제목 */}
      <h2>관리자 상품 관리</h2>

      {/*상태 선택 탭 렌더링*/}
      <TabMenus
        {/*정의한 탭 목록 전달*/}
        tabs={STATUS_TABS}
        {/*현재 선택된 상태를 전달*/}
        activeStatus={searchParams.status}
        {/*탭 변경 시 호출할 함수를 전달*/}
        onTabChange={handleTabChange}
      />

      <div className={styles.filterBar}>
        <div />

        <div className={styles.searchWrapper}>
          <SearchBox
            name="search"
            options={SEARCH_OPTIONS}
            initSelectValue=""
            initKeyword=""
            onSearch={handleSearchSubmit}
          />
        </div>

        <div className={styles.radioGroup}>
          {DELETE_YN_OPTIONS.map((opt) => (
            <label key={opt.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="deleteYn"
                value={opt.value}
                checked={searchParams.deleteYn === opt.value}
                onChange={handleDeleteYnChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <DataTable columns={PRODUCT_COLUMNS} data={products} loading={loading} />
      <Pagination pager={pager} onChangePage={handlePageChange} />
    </div>
  );
}






//  =================================================================
//   [DataTable 공통 컴포넌트 사용 가이드]

//   부모 페이지(예: MarketManage.jsx)에서 넘겨줘야 하는 값(Props):

//   1. columns (필수, 배열)
//      - 표의 헤더 제목과 데이터를 어떻게 띄울지 정하는 규칙입니다.
//      - header: 표 맨 위에 표시할 컬럼 이름 (예: "상품 코드")
//      - accessor: 백엔 데이터에서 가져올 키(Key) 이름 (예: "code")
//      - render: (선택) 데이터에 '원'을 붙이거나 날짜 포맷을 바꿀 때 쓰는 함수

//   2. data (필수, 배열)
//      - 백엔드 API에서 받아온 실제 목록 데이터입니다.

//   3. className (선택, 문자열)
//      - 표의 스타일(SCSS)을 추가로 넘길 때 사용합니다.
//   =================================================================
