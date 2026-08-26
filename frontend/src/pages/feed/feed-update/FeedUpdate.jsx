import React from 'react';
import { useParams } from "react-router-dom";

// 수정용 컴포넌트
function FeedUpdate() {
  const { code } = useParams();

  console.log("code: ", code);

  return (
    <div>피드 수정용 컴포넌트</div>
  );
}

export default FeedUpdate;
