import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PointTransfer.module.scss";
import PointRemittance from "./remittance/PointRemittance.jsx";
import PointWithdrawal from "./withdrawal/PointWithdrawal.jsx";

function PointTransfer() {
  const [activeTab, setActiveTab] = useState("remittance");
  const { state } = useLocation();
  const targetProductCode = state?.targetProductCode;

  return (
    <div className={styles.pointTransfer}>
      <div className={styles.cardWrapper}>
        <div className={styles.tabNav}>
          <button
            type="button"
            className={activeTab === "remittance" ? styles.activeTab : ""}
            onClick={() => setActiveTab("remittance")}
          >
            송금하기
          </button>
          {/* <button
            type="button"
            className={activeTab === "withdrawal" ? styles.activeTab : ""}
            onClick={() => setActiveTab("withdrawal")}
          >
            출금하기
          </button> */}
        </div>

        <div className={styles.contents}>
          {activeTab === "remittance" ? (
            <PointRemittance targetProductCode={targetProductCode} />
          ) : (
            <PointWithdrawal />
          )}
        </div>
      </div>
    </div>
  );
}

export default PointTransfer;
