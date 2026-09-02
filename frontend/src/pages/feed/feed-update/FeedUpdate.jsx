import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useLoadData } from "../../../hooks/useLoadData.js";
import FeedUpdateForm from "./FeedUpdateForm.jsx";
import Button from "../../../components/common/button/Button.jsx";

// 수정용 페이지 컴포넌트 -> 렌더링 페이지, 데이터 조회만 수행함.
function FeedUpdate() {
  const navigate = useNavigate();
  const { code } = useParams();

  // 수정할 피드 데이터 불러오기
  const { data: initFeed, loading, error } = useLoadData(`/api/feeds/${code}/edit`);

  // 등록이 가능한 챌린지 카테고리 조회 (현재 진행 중인 카테고리만)
  const { data: categories } = useLoadData("/api/challenge/categories");

  if (!loading && !initFeed) {
    return <div>해당 피드의 정보를 불러오고 있습니다.</div>;
  }

  if (error) {
    return (
      <div>
        {error}
        <Button onClick={() => navigate("/feed")}>피드 목록</Button>
      </div>
    );
  }

  return (
    <main>
      <FeedUpdateForm key={initFeed?.code} initFeed={initFeed} categories={categories} />
    </main>
  );
}

export default FeedUpdate;
