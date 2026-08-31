import React from "react";
import { useParams } from "react-router-dom";
import { useLoadData } from "../../../hooks/useLoadData.js";
import MarketSideNav from "../../../components/market/side-nav/MarketSideNav.jsx";
import Slide from "../../../components/common/slide/Slide.jsx";
import { IoHeartSharp } from "react-icons/io5";
import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  const { code } = useParams();

  const { data, loading, error } = useLoadData(`/api/market/products/${code}`)

  const detail = data || {};

  if (loading) {
    return <div>거래글 정보를 불러오고 있습니다.</div>
  }

  if (error) {
    return <div>에러가 발생했습니다. {error}</div>
  }

  console.log(detail);

  return (
    <main className={styles.wrap}>
      {/* 사이드 메뉴 */}
      <MarketSideNav />

      <div className={styles.container}>
        {/* 브레드크럼 */}
        <div>
          브레드크럼
        </div>

        <div className={styles.contents}>
          {/* 이미지 슬라이드 */}
          <div className={styles.productImages}>
            <Slide images={detail.imagePaths} />
          </div>

          {/* 상세 내용 시작 */}
          <div className={styles.productDetails}>
            <h2>{detail.title}</h2>

            <div>
              <span>{detail.createdAt}</span>
              <h3>{detail.price.toLocaleString()}그루</h3>
            </div>

            <p>{detail.content}</p>

            <ul>
              <li>
                Pick <IoHeartSharp />
                {detail.countPick}
              </li>
              <li>
                조회수
                {detail.hitcount}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ProductDetail;
