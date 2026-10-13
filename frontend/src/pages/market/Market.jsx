import { useState } from "react";
import ProductCard from "../../components/market/product-card/ProductCard.jsx";
import MarketSideNav from "../../components/market/side-nav/MarketSideNav.jsx";
import SearchBox from "../../components/common/search-box/SearchBox.jsx";
import TabMenus from "../../components/common/tab-menus/TabMenus.jsx";
import Pagination from "../../components/common/pagination/Pagination.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLoadData } from "../../hooks/useLoadData.js";
import { useSearchQuery } from "../../hooks/useSearchQuery.js";
import styles from "../market/Market.module.scss";

const SORT_MENU = [
  { label: "최신등록순", value: "createdAt" },
  { label: "랭킹순", value: "ranking" },
  { label: "낮은가격순", value: "lowPrice" },
  { label: "높은가격순", value: "highPrice" },
];

const DEAL_STATUS = [
  { name: "판매중", value: "on_sale" },
  { name: "판매완료", value: "sold" },
];

const Market = () => {
  /* 사용자 정보 조회 */
  const { isLoggedIn, user } = useAuth();

  /* 검색 쿼리 상태 관리 */
  const { searchFilter, queryString, handleChangePages, handleSearch } =
    useSearchQuery({
      page: 1,
      perPage: 16,
      categoryCode: null,
      dealStatus: "on_sale",
      keyword: "",
      sortTarget: "createdAt",
    });

  /* 정렬 상태 관리 */
  const [sort, setSort] = useState(SORT_MENU[0].value);

  /* 상품 목록 및 카테고리 데이터 조회 */
  const { data } = useLoadData(`/api/market/products${queryString}`);
  const products = data?.content || [];
  const { data: categories } = useLoadData("/api/market/categories");

  /* 정렬 변경 처리 */
  const handleClickSort = (sort) => {
    setSort(sort);
    handleSearch({ sortTarget: sort });
  };

  return (
    /* 마켓 메인 영역 */
    <main className={styles.wrap}>
      {/* 마켓 사이드바 영역 */}
      <div className={styles.sideNavWrap}>
        <MarketSideNav
          categories={categories}
          isLoggedIn={isLoggedIn}
          memberProfile={user}
          onSearch={handleSearch}
        />
      </div>

      {/* 상품 목록 컨테이너 영역 */}
      <div className={styles.container}>
        {/* 필터 바 영역 */}
        <div className={styles.filterBar}>
          <TabMenus
            tabs={SORT_MENU}
            activeStatus={sort}
            className={styles.sortTab}
            onTabChange={handleClickSort}
          />
          <SearchBox
            initKeyword={searchFilter.keyword}
            initSelectValue={searchFilter.dealStatus}
            isRadio
            options={DEAL_STATUS}
            className={styles.searchBox}
            name="dealStatus"
            onSearch={handleSearch}
          />
        </div>

        {/* 상품 목록 영역 */}
        <div className={styles.list}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))
          ) : (
            <p className={styles.emptyState}>검색된 거래글이 없습니다.</p>
          )}
        </div>

        {/* 페이지네이션 영역 */}
        <Pagination pager={data?.pager} onChangePage={handleChangePages} />
      </div>
    </main>
  );
};

export default Market;
