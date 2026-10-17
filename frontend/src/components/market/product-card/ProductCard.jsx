import React from "react";
import { FaEye } from "react-icons/fa6";
import { IoChatbubbles, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import ProfileCard from "../../auth/profile-card/ProfileCard.jsx";
import Card from "../../common/card/Card.jsx";
import ImageBox from "../../common/image-box/ImageBox.jsx";

import { formatCreatedAt } from "../../../utils/formatDate.js";

import styles from "./ProductCard.module.scss";

/**
 * 상품 카드 컴포넌트
 */
function ProductCard({ product }) {
  /* 상세 페이지 이동 처리 */
  const navigate = useNavigate();

  const handleClickDetail = (code) => {
    // 상세 페이지로 이동함.
    navigate(`/market/${code}`);
  };

  return (
    /* 상품 카드 영역 */
    <Card
      className={styles.productItem}
      onClick={() => handleClickDetail(product.code)}
    >
      {/* 프로필 카드 영역 */}
      <div className={styles.profileWrap}>
        <ProfileCard memberProfile={product.memberProfile} showMore={false} />
      </div>

      {/* 썸네일 영역 */}
      <div className={styles.thumbnail}>
        <ImageBox src={product.thumbnail} alt="대표 이미지" />
      </div>

      {/* 상품 콘텐츠 영역 */}
      <div className={styles.contents}>
        {/* 제목 영역 */}
        <div className={styles.title}>
          <span>
            {product.mainCategoryName} - {product.subCategoryName}
          </span>
          <h3>
            <span>{product.dealStatus}</span>
            {product.title}
          </h3>
        </div>

        {/* 가격 정보 영역 */}
        <div className={styles.detail}>
          <div className={styles.price}>
            {product.price?.toLocaleString()} <span>그루</span>
          </div>
        </div>

        {/* 상품 메타 정보 영역 */}
        <div className={styles.info}>
          {/* 상호작용 정보 영역 */}
          <div className={styles.count}>
            {/* 좋아요 수 영역 */}
            <div className={styles.icon}>
              <span className={styles.like}>
                <IoHeartSharp />
              </span>
              {product.countPick}
            </div>

            {/* 채팅 수 영역 */}
            <div className={styles.icon}>
              <span className={styles.chat}>
                <IoChatbubbles />
              </span>
              {product.countChatRoom}
            </div>

            {/* 조회수 영역 */}
            <div className={styles.icon}>
              <span className={styles.hitcount}>
                <FaEye />
              </span>
              {product.hitcount}
            </div>
          </div>

          {/* 작성일시 영역 */}
          <div className={styles.date}>
            <span>{formatCreatedAt(product.createdAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
