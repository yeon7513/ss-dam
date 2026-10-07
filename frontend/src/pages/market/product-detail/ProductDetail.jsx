import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLoadData } from "../../../hooks/useLoadData.js";
import MarketSideNav from "../../../components/market/side-nav/MarketSideNav.jsx";
import Slide from "../../../components/common/slide/Slide.jsx";
import { IoHeartSharp } from "react-icons/io5";
import styles from "./ProductDetail.module.scss";
import Button from "../../../components/common/button/Button.jsx";
import { useSubmitData } from "../../../hooks/useSubmitData.js";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { code } = useParams();

  const { data, loading, error } = useLoadData(`/api/market/products/${code}`);
  const detail = data || {};

  // 사이드바 카테고리 목록 데이터
  const { data: categoriesData } = useLoadData("/api/market/categories");
  const categories = categoriesData || [];

  const handleSearch = ({ categoryCode }) => {
    if (categoryCode) {
      navigate(`/market?category=${categoryCode}`);
    } else {
      navigate("/market");
    }
  };

  const handleClickDeletePost = () => {
    console.log("거래글 삭제");
  };

  // 거래 신청
  const { handleSubmit, error: connectionError } = useSubmitData(
    "/api/chat/rooms",
    "POST",
  );
  const handleTradeRequest = async () => {
    const requestData = {
      type: "DEAL",
      targetCode: detail.code,
      responderCode: detail.memberProfile?.code,
    };

    const { data: roomId, success } = await handleSubmit(requestData);

    if (success) {
      navigate(`/chat?roomId=${roomId}`);
    } else {
      alert(connectionError);
    }
  };

  if (loading) {
    return <div>거래글 정보를 불러오고 있습니다.</div>;
  }

  if (error) {
    if (
      error?.status === undefined ||
      error?.status === 404 ||
      !error?.success
    ) {
      navigate("/error/404");
    } else {
      navigate(`/error/${error?.status}`);
    }
  }

  return (
    <main className={styles.wrap}>
      {/* 사이드 메뉴 */}
      <div className={styles.sideNavWrap}>
        <MarketSideNav categories={categories} onSearch={handleSearch} />
      </div>

      <div className={styles.container}>
        {/* 브레드크럼 */}
        <div className={styles.breadcrumb}>
          <button type="button" onClick={() => navigate(-1)}>
            목록으로
          </button>
          브레드크럼크럼
        </div>

        <div className={styles.contents}>
          {/* 이미지 슬라이드 */}
          <div className={styles.productImages}>
            <Slide images={detail.imagePaths} />
          </div>

          {/* 상세 내용 시작 */}
          <div className={styles.productDetails}>
            <h2>{detail.title}</h2>

            <div>
              <span>{detail.createdAt}</span>
              <h3>{detail.price.toLocaleString()} 그루</h3>
            </div>

            <p>{detail.content}</p>

            <ul>
              <li>
                Pick <IoHeartSharp />
                {detail.countPick}
              </li>
              <li>
                조회수
                {detail.hitcount}
              </li>
            </ul>
            {/* 수정 & 삭제 버튼 */}
            <div className={styles.actionButtons}>
              <Button btnStyle="submit_o">
                <Link to={`/market/edit/${code}`}>수정</Link>{" "}
              </Button>
              <Button btnStyle="danger_o" onClick={handleClickDeletePost}>
                삭제
              </Button>
            </div>
          </div>
        </div>

        {/* 채팅 요청 */}
        <div>
          <Button btnStyle="submit" onClick={() => handleTradeRequest()}>
            채팅으로 거래 신청
          </Button>
        </div>
        <div>
          <Button btnStyle="danger" onClick={() => handleTradeRequest()}>
            삭제해야 하는 버튼
          </Button>
        </div>
        <div>
          <Button btnStyle="fill" onClick={() => handleTradeRequest()}>
            채워야 하는 버튼
          </Button>
        </div>
        <div>
          <Button btnStyle="outline" onClick={() => handleTradeRequest()}>
            테두리는 버튼
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
