import React from 'react';
import { useLoadData } from "../../../hooks/useLoadData.js";

function PointHistory() {
  const { data: history } = useLoadData("/api/point/history");

  console.log("history: ", history);

  return (
    <div>PointHistory</div>
  );
}

export default PointHistory;
