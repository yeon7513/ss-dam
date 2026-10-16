import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import styles from "./PointTransfer.module.scss";
import PointRemittance from "../../../../components/my-page/point-transfer/PointRemittance.jsx";
import PointWithdrawal from "../../../../components/my-page/point-transfer/PointWithdrawal.jsx";

function PointTransfer() {
  const [activeTab, setActiveTab] = useState("remittance");
  const { state: receiveInfo } = useLocation();

  return (
    <div className={styles.pointTransfer}>
      <div className={styles.tab}>
        <button
          type="button"
          onClick={() => setActiveTab("remittance")}
        >
          송금하기
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("withdrawal")}
        >
          출금하기
        </button>
      </div>

      <div className={styles.contents}>
        {activeTab === "remittance" ? (
          <PointRemittance receiveInfo={receiveInfo} />
        ) : (
          <PointWithdrawal />
        )}
      </div>
    </div>
  );
}

export default PointTransfer;
