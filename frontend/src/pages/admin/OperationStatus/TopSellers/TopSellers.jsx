import React from "react";
import Card from "../../../../components/common/card/Card.jsx";
import styles from "./TopSellers.module.scss";

const TopSellers = ({ topSellersData }) => {
  return (
    <Card className={styles.bottomCard}>
      <div className={styles.cardHeader}>
        <h3>우수 판매자</h3>
      </div>
      <div className={styles.sellerFlex}>
        <div className={styles.donutPlaceholder}>
          <span>[ 판매자 차트 영역 ]</span>
        </div>
        <ul className={styles.sellerList}>
          {topSellersData.map((seller, index) => (
            <li key={index}>
              <span className={styles.sellerName}>
                <i className={styles.dot}></i> {seller.name}
              </span>
              <div className={styles.sellerVal}>
                <strong>{seller.value}</strong>
                <span
                  className={
                    seller.rate.startsWith("-") ? styles.minus : styles.plus
                  }
                >
                  {seller.rate}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default TopSellers;
