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

// DataTable도 혹시 몰라서 컴포넌트로 빼 놓음
const PRODUCT_COLUMNS = [
  { header: '상품 코드', accessor: 'code' },
  { header: '제품', accessor: 'title' },
  {
    header: '가격',
    render: (item) => `${item.price?.toLocaleString()}원`,
  },
  {
    header: '작성자 ID',
    render: (item) => `${item.m_id || item.createdBy || '-'}`,
  },
  { header: '상태', accessor: 'status' },
  {
    header: '활성화여부',
    render: (item) =>
      `${item.deleteYn === true || item.deleteYn === 'Y' || item.deleteYn === 1 ? '비활성화' : '활성화'}`,
  },
  {
    header: '등록일',
    render: (item) =>
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-',
  },
];

export default function MarketManage() {
  const [products, setProducts] = useState([]);
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

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const query = new URLSearchParams();
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key]) query.append(key, searchParams[key]);
    });

    try {
      const response = await fetch(`/api/admin/products?${query.toString()}`);

      if (!response.ok) throw new Error('데이터 로딩 실패');

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
      <h2>관리자 상품 관리</h2>

      <TabMenus
        tabs={STATUS_TABS}
        activeStatus={searchParams.status}
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
