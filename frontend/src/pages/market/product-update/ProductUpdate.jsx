import React from 'react';
import ProductUpdateForm from "./ProductUpdateForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadData } from "../../../hooks/useLoadData.js";
import Button from "../../../components/common/button/Button.jsx";

function ProductUpdate() {
  const navigate = useNavigate();
  const { code } = useParams();

  // 수정할 게시글 정보 조회
  const { data: initProductPost, loading, error } = useLoadData(`/api/market/products/${code}/edit`);

  // 활성화 중인 카테고리 조회
  const { data: categories } = useLoadData("/api/market/categories");

  // 로딩 중..
  if (!loading && !initProductPost) {
    return <div>해당 거래글의 정보를 불러오고 있습니다.</div>
  }

  // 오류 시
  if (error) {
    return (
      <div>
        {error}
        <Button onClick={() => navigate("/market")}>
          다시쓰담 목록
        </Button>
      </div>
    )
  }

  return (
    <main>
      <ProductUpdateForm
        key={initProductPost?.code}
        initPost={initProductPost}
        categories={categories}
      />
    </main>
  );
}

export default ProductUpdate;
