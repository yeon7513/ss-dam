import { useLoadData } from "../../hooks/useLoadData.js";
import styles from "../market/Market.module.scss";
import ProductCard from "../../components/market/product-card/ProductCard.jsx";
import MarketSideNav from "../../components/market/side-nav/MarketSideNav.jsx";
import SearchBox from "../../components/common/search-box/SearchBox.jsx";

const Market = () => {

  const {
    data, loading, error, message,
  } = useLoadData(`/api/market/products`);

  const products = data || [];

  // 로딩 및 에러 처리
  if (loading) {
    return <div>다시쓰담 정보를 불러오고 있습니다.</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다. {error}, {message}</div>;
  }

  console.log(products);

  return (
    <main className={styles.wrap}>
      <div>
        <MarketSideNav />
      </div>
      {/* 목록 렌더링 */}
      <div className={styles.container}>
        <SearchBox />
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
