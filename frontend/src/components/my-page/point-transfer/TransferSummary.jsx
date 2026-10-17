import React from "react";
import styles from "./TransferSummary.module.scss";

function TransferSummary({ amount, pointBalance }) {
  const safeAmount = Number(amount) || 0;
  const safeBalance = Number(pointBalance) || 0;
  const remainingBalance = safeBalance - safeAmount;

  return (
    <div className={styles.transferSummary}>
      {/* 현재 보유 그루 */}
      <div className={styles.row}>
        <span>현재 보유 그루</span>
        <span className={styles.value}>
          {safeBalance.toLocaleString()} 그루
        </span>
      </div>

      {/* 송금 차감 그루 */}
      <div className={styles.row}>
        <span>송금 차감 그루</span>
        <span className={`${styles.value} ${styles.deduct}`}>
          - {safeAmount.toLocaleString()} 그루
        </span>
      </div>

      {/* 구분선 */}
      <div className={styles.divider} />

      {/* 송금 후 잔액 */}
      <div className={styles.totalRow}>
        <span>송금 후 잔액</span>
        <span className={styles.totalValue}>
          {remainingBalance.toLocaleString()} 그루
        </span>
      </div>
    </div>
  );
}

export default TransferSummary;
