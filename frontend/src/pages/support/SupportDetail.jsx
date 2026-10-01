import React from "react";
import { useParams } from "react-router-dom";

const SupportDetail = () => {
  const { code } = useParams();

  return (
    <div>
      <h2>SupportDetail</h2> {/* 공지사항, FAQ 상세 */}
    </div>
  );
};

export default SupportDetail;
