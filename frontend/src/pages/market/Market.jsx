import { useLoadData } from "../../hooks/useLoadData.js";
import styles from "../market/Market.module.scss";
import ProductCard from "../../components/market/product-card/ProductCard.jsx";
import MarketSideNav from "../../components/market/side-nav/MarketSideNav.jsx";
import SearchBox from "../../components/common/search-box/SearchBox.jsx";
import { useState } from "react";
import TabMenus from "../../components/common/tab-menus/TabMenus.jsx";

const SORT_MENU = [
  { label: "최신등록순", value: "createdAt" },
  { label: "랭킹순", value: "ranking" },
  { label: "낮은가격순", value: "lowPrice" },
  { label: "높은가격순", value: "highPrice" },
];

const Market = () => {
  const [sort, setSort] = useState(SORT_MENU[0].value);

  // 목록 데이터
  const { data: products, loading, error, message } = useLoadData(`/api/market/products`);

  // 로딩 및 에러 처리
  if (loading) {
    return <div>다시쓰담 정보를 불러오고 있습니다.</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다. {error}, {message}</div>;
  }

  const handleClickSort = (sort) => {
    setSort(sort);
  }

  return (
    <main className={styles.wrap}>
      <div>
        <MarketSideNav />
      </div>
      {/* 목록 렌더링 */}
      <div className={styles.container}>
        <div className={styles.filterBar}>
          <TabMenus className={styles.sortTab} tabs={SORT_MENU} activeStatus={sort} onTabChange={handleClickSort} />
          <SearchBox className={styles.searchBox} />
        </div>
        <div className={styles.list}>
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.code} product={product} />)
          ) : (
            <p>검색된 거래글이 없습니다.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Market;
