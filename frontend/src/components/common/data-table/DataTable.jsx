import React from "react";
import styles from "./DataTable.module.scss";
import cn from "classnames";

/*
  =================================================================
  [DataTable 공통 컴포넌트 사용 가이드]

  부모 페이지(예: MarketManage.jsx)에서 넘겨줘야 하는 값(Props):

  1. columns (필수, 배열) 
     - 표의 헤더 제목과 데이터를 어떻게 띄울지 정하는 규칙입니다.
     - header: 표 맨 위에 표시할 컬럼 이름 (예: "상품 코드")
     - accessor: 백엔 데이터에서 가져올 키(Key) 이름 (예: "code")
     - render: (선택) 데이터에 '원'을 붙이거나 날짜 포맷을 바꿀 때 쓰는 함수

  2. data (필수, 배열)
     - 백엔드 API에서 받아온 실제 목록 데이터입니다.

  3. className (선택, 문자열)
     - 표의 스타일(SCSS)을 추가로 넘길 때 사용합니다.
  =================================================================
*/

export default function DataTable({ columns, data, className }) {
  if (!data || data.length == 0) {
    return <div className={styles.stateMassage}>조회된 데이터가 없습니다</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={cn(styles.table, className)}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={row.code || rowIdx}>
              {columns.map((col, colIdx) => (
                <td key={colIdx}>
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
