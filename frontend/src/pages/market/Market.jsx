import { useLoadData } from "../../hooks/useLoadData.js";
import styles from "../market/Market.module.scss";
import ProductCard from "../../components/market/product-card/ProductCard.jsx";
import MarketSideNav from "../../components/market/side-nav/MarketSideNav.jsx";
import SearchBox from "../../components/common/search-box/SearchBox.jsx";
import { useState } from "react";
import TabMenus from "../../components/common/tab-menus/TabMenus.jsx";
import Pagination from "../../components/common/pagination/Pagination.jsx";
import { useSearchQuery } from "../../hooks/useSearchQuery.js";

const SORT_MENU = [
  { label: "최신등록순", value: "createdAt" },
  { label: "랭킹순", value: "ranking" },
  { label: "낮은가격순", value: "lowPrice" },
  { label: "높은가격순", value: "highPrice" },
];

const DEAL_STATUS = [
  { name: "판매중", value: "on_sale" },
  { name: "판매완료", value: "sold" },
]

const Market = () => {
  const { searchFilter, queryString, handleChangePages, handleSearch } = useSearchQuery({
    page: 1,
    perPage: 16,
    categoryCode: null,
    dealStatus: "on_sale",
    keyword: '',
    sortTarget: 'createdAt',
  })

  const [sort, setSort] = useState(SORT_MENU[0].value);

  // 목록 데이터
  const { data, loading, error, message } = useLoadData(`/api/market/products${queryString}`);

  const products = data?.content || [];

  // 검색용 카테고리 조회
  const { data: categories } = useLoadData("/api/market/categories");


  const handleClickSort = (sort) => {
    setSort(sort);
    handleSearch({
      sortTarget: sort,
    })
  }

  return (
    <main className={styles.wrap}>
      <div>
        <MarketSideNav categories={categories} onSearch={handleSearch} />
      </div>
      {/* 목록 렌더링 */}
      <div className={styles.container}>
        <div className={styles.filterBar}>
          {/* 정렬 탭 메뉴 */}
          <TabMenus className={styles.sortTab} tabs={SORT_MENU} activeStatus={sort} onTabChange={handleClickSort} />
          {/* 검색 필드 */}
          <SearchBox
            className={styles.searchBox}
            isRadio={true}
            name="dealStatus"
            initSelectValue={searchFilter.dealStatus}
            initKeyword={searchFilter.keyword}
            options={DEAL_STATUS}
            onSearch={handleSearch} />
        </div>
        <div className={styles.list}>
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.code} product={product} />)
          ) : (
            <p>검색된 거래글이 없습니다.</p>
          )}
        </div>
        <Pagination pager={data?.pager} onChangePage={handleChangePages} />
      </div>
    </main>
  );
};

export default Market;
