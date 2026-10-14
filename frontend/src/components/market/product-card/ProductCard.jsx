import { IoChatbubbles, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Card from "../../common/card/Card";
import ProfileCard from "../../auth/profile-card/ProfileCard";
import styles from "./ProductCard.module.scss";
import ImageBox from "../../common/image-box/ImageBox.jsx";
import { formatCreatedAt } from "../../../utils/formatDate.js";
import { FaEye } from "react-icons/fa6";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClickDetail = (code) => {
    navigate(`/market/${code}`);
  };

  return (
    <Card
      className={styles.productItem}
      onClick={() => handleClickDetail(product.code)}
    >
      {/* 프로필 카드 */}
      <ProfileCard memberProfile={product.memberProfile} />

      {/* 썸네일 */}
      <div className={styles.thumbnail}>
        <ImageBox src={product.thumbnail} alt="대표 이미지" />
      </div>

      {/* 본문 */}
      <div className={styles.contents}>
        {/* 제목 */}
        <div className={styles.title}>
          <span>
            {product.mainCategoryName} - {product.subCategoryName}
          </span>
          <h3>
            <span>{product.dealStatus}</span>
            {product.title}
          </h3>
        </div>

        {/* 콘텐츠 (내용) */}
        <div className={styles.detail}>
          <div className={styles.price}>
            {product.price.toLocaleString()} <span>그루</span>
          </div>
        </div>

        {/* Pick, 채팅 수, 조회수 & 작성일(시간) */}
        <div className={styles.info}>
          {/* 상호작용 수 */}
          <div className={styles.count}>
            {/* 좋아요 수 */}
            <div className={styles.icon}>
              <span className={styles.like}>
                <IoHeartSharp />
              </span>
              {product.countPick}
            </div>
            {/* 채팅 수 */}
            <div className={styles.icon}>
              <span className={styles.chat}>
                <IoChatbubbles />
              </span>
              {product.countChatRoom}
            </div>
            {/* 조회수 */}
            <div className={styles.icon}>
              <span className={styles.hitcount}>
                <FaEye />
              </span>
              {product.hitcount}
            </div>
          </div>

          {/* 작성일 */}
          <div>
            <span>{formatCreatedAt(product.createdAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
