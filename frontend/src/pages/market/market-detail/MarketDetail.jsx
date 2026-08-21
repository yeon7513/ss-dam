import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadData } from "../../../hooks/useLoadData.js";

const MarketDetail = () => {
  const navigate = useNavigate();
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
    <div>
      <h2>MarketDetail</h2>
    </div>
  );
};

export default MarketDetail;
