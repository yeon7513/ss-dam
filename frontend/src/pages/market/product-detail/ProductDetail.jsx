import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";

import MarketSideNav from "../../../components/market/side-nav/MarketSideNav.jsx";
import MarketBreadcrumb from "../market-breadcrumb/MarketBreadcrumb.jsx";
import Slide from "../../../components/common/slide/Slide.jsx";
import Button from "../../../components/common/button/Button.jsx";

import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import { formatCreatedAt } from "../../../utils/formatDate.js";

import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { code } = useParams();

  /* 상품 상세 정보 조회 */
  const { data, loading, error } = useLoadData(`/api/market/products/${code}`);
  const detail = data || {};

  /* 카테고리 목록 조회 */
  const { data: categoriesData } = useLoadData("/api/market/categories");
  const categories = categoriesData || [];

  /* 검색 처리 */
  const handleSearch = ({ categoryCode }) => {
    if (categoryCode) {
      // 카테고리 코드가 존재할 경우 해당 카테고리 페이지로 이동함.
      navigate(`/market?category=${categoryCode}`);
    } else {
      // 카테고리 코드가 없을 경우 전체 목록으로 이동함.
      navigate("/market");
    }
  };

  /* 거래글 삭제 처리 */
  const handleClickDeletePost = () => {
    // 거래글 삭제 기능을 실행함.
    console.log("거래글 삭제");
  };

  /* 거래 신청 처리 */
  const { handleSubmit, error: connectionError } = useSubmitData(
    "/api/chat/rooms",
    "POST",
  );

  const handleTradeRequest = async () => {
    // 거래 신청 요청 데이터를 생성함.
    const requestData = {
      type: "DEAL",
      targetCode: detail.code,
      responderCode: detail.memberProfile?.code,
    };

    // 채팅방 생성을 요청함.
    const { data: roomId, success } = await handleSubmit(requestData);

    if (success) {
      // 생성 성공 시 해당 채팅방으로 이동함.
      navigate(`/chat?roomId=${roomId}`);
    } else {
      // 생성 실패 시 에러 메시지를 출력함.
      alert(connectionError);
    }
  };

  /* 로딩 상태 처리 */
  if (loading) {
    return <div>거래글 정보를 불러오고 있습니다.</div>;
  }

  /* 에러 상태 처리 */
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
      {/* 사이드바 영역 */}
      <div className={styles.sideNavWrap}>
        <MarketSideNav categories={categories} onSearch={handleSearch} />
      </div>

      {/* 메인 컨테이너 영역 */}
      <div className={styles.container}>
        {/* 브레드크럼 영역 */}
        <MarketBreadcrumb detail={detail} categories={categories} />

        {/* 상품 콘텐츠 영역 */}
        <div className={styles.contents}>
          {/* 상품 이미지 영역 */}
          <div className={styles.productImages}>
            <Slide images={detail.imagePaths} />
          </div>

          {/* 상품 상세 정보 영역 */}
          <div className={styles.productDetails}>
            {/* 상단 헤더 영역 */}
            <div className={styles.headerRow}>
              {/* 제목 정보 영역 */}
              <div className={styles.titleSection}>
                {/* 상품 제목 영역 */}
                <div className={styles.title}>
                  <h2>{detail.title}</h2>
                </div>

                {/* 작성일시 영역 */}
                <div className={styles.dateInfo}>
                  <span>{formatCreatedAt(detail.createdAt)}</span>
                </div>
              </div>

              {/* 거래 신청 버튼 영역 */}
              <div className={styles.chatButton}>
                <Button btnStyle="submit" onClick={handleTradeRequest}>
                  채팅으로 거래 신청
                </Button>
              </div>
            </div>

            {/* 본문 내용 영역 */}
            <p>{detail.content}</p>

            {/* 하단 메타 정보 영역 */}
            <div className={styles.metaRow}>
              {/* 반응 정보 영역 */}
              <ul>
                <li>
                  Pick <IoHeartSharp />
                  {detail.countPick}
                </li>
                <li>채팅 {detail.countChatRoom}</li>
                <li>조회수 {detail.hitcount}</li>
              </ul>

              {/* 가격 정보 영역 */}
              <div className={styles.priceInfo}>
                <h3>
                  {detail.price?.toLocaleString()} <span>그루</span>
                </h3>
              </div>
            </div>

            {/* 게시글 관리 버튼 영역 */}
            <div className={styles.actionButtons}>
              <Button
                btnStyle="word"
                action="submit"
                size="sm"
                onClick={() => navigate(`/market/edit/${code}`)}
              >
                수정
              </Button>

              <Button
                btnStyle="word"
                action="danger"
                size="sm"
                onClick={handleClickDeletePost}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
