import React from 'react';
import { useLoadData } from "../../../hooks/useLoadData.js";
import styles from "./PointHistory.module.scss";
import classNames from "classnames";

function PointHistory() {
  const { data: pointHistory } = useLoadData("/api/point/history");

  console.log("history: ", pointHistory);

  return (
    <div className={styles.pointHistory}>
      <div className={styles.header}>
        <div>
          <h2>포인트 이용 내역</h2>
          <p>포인트 적립 및 사용 내역을 확인할 수 있습니다.</p>
        </div>

        <span className={styles.count}>
          총 {pointHistory?.length}건
        </span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>일시</th>
              <th>구분</th>
              <th>내용</th>
              <th>상품 번호</th>
              <th className={styles.amountColumn}>포인트</th>
            </tr>
          </thead>

          <tbody>
            {pointHistory?.length > 0 ? (
              pointHistory.map((item, index) => {
                const isSaved = item.type?.code === "SAVED";

                return (
                  <tr key={item.code}>
                    <td>{pointHistory.length - index}</td>

                    <td className={styles.dateColumn}>
                      {item.createdAt}
                    </td>

                    <td>
                      <span
                        className={classNames(
                          styles.pointBadge,
                          {
                            [styles.saved]: isSaved,
                            [styles.used]: !isSaved,
                          },
                        )}
                      >
                        {isSaved ? "적립" : "사용"}
                      </span>
                    </td>

                    <td className={styles.reasonColumn}>
                      {item.reason?.label ?? "-"}
                    </td>

                    <td>{item.prodCode ?? "-"}</td>

                    <td
                      className={classNames(
                        styles.amountColumn,
                        {
                          [styles.savedAmount]: isSaved,
                          [styles.usedAmount]: !isSaved,
                        },
                      )}
                    >
                      {isSaved ? "+" : "-"}
                      {Number(item.amount).toLocaleString()} 그루
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  포인트 이용 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PointHistory;
