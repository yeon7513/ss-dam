import React from "react";
import { useParams } from "react-router-dom";

const FeedDetail = () => {
  const { code } = useParams();
  console.log({ code });
  return (
    <div>
      <h2>FeedDetail</h2>
    </div>
  );
};

export default FeedDetail;
