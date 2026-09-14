import { useLoadData } from "../../hooks/useLoadData.js";
import styles from "../market/Market.module.scss";
import ProductCard from "../../components/market/product-card/ProductCard.jsx";
import MarketSideNav from "../../components/market/side-nav/MarketSideNav.jsx";
import SearchBox from "../../components/common/search-box/SearchBox.jsx";
import { useState } from "react";
import TabMenus from "../../components/common/tab-menus/TabMenus.jsx";
import Pagination from "../../components/common/pagination/Pagination.jsx";
import { buildQueryString } from "../../utils/buildQueryString.js";
import { useSearchParams } from "react-router-dom";

const SORT_MENU = [
  { label: "최신등록순", value: "createdAt" },
  { label: "랭킹순", value: "ranking" },
  { label: "낮은가격순", value: "lowPrice" },
  { label: "높은가격순", value: "highPrice" },
];

const SEARCH_CODE_MAP = [
  { name: "판매중", code: 1 },
  { name: "판매완료", code: 2 },
]

const Market = () => {
  const [sort, setSort] = useState(SORT_MENU[0].value);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchCode = searchParams.get('searchCode') || 1;
  const keyword = searchParams.get('keyword') || '';

  const queryString = buildQueryString({
    page: currentPage,
    perPage: 16,
    searchCode: searchCode,
    keyword: keyword,
  })

  // 목록 데이터
  const { data, loading, error, message } = useLoadData(`/api/market/products${queryString}`);

  const products = data?.content || [];

  console.log(data);

  // 검색용 카테고리 조회
  const { data: categories } = useLoadData("/api/market/categories");

  const handleChangePage = (newPage) => {
    const nextQuery = buildQueryString({
      page: newPage,
      perPage: 16,
      searchCode,
      keyword,
    });

    setSearchParams(nextQuery);
  }

  const handleSearch = (newSearchCode, newKeyword) => {
    const nextQuery = buildQueryString({
      page: 1,
      perPage: 16,
      searchCode: newSearchCode,
      keyword: newKeyword,
    });

    setSearchParams(nextQuery);
  }

  const handleClickSort = (sort) => {
    setSort(sort);
  }

  console.log(loading);

  return (
    <main className={styles.wrap}>
      <div>
        <MarketSideNav />
      </div>
      {/* 목록 렌더링 */}
      <div className={styles.container}>
        <div className={styles.filterBar}>
          <TabMenus className={styles.sortTab} tabs={SORT_MENU} activeStatus={sort} onTabChange={handleClickSort} />
          <SearchBox
            className={styles.searchBox}
            isRadio={true}
            initSearchCode={searchCode}
            initKeyword={keyword}
            options={SEARCH_CODE_MAP}
            onSubmit={handleSearch} />
        </div>
        <div className={styles.list}>
          {loading ? (
            <div>거래글 정보를 불러오고 있습니다.</div>
          ) : (
            products.length > 0 ? (
              products.map((product) => <ProductCard key={product.code} product={product} />)
            ) : (
              <p>검색된 거래글이 없습니다.</p>
            )
          )}
        </div>
        <Pagination pager={data?.pager} onChangePage={handleChangePage} />
      </div>
    </main>
  );
};

export default Market;
