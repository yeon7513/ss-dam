import { IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Card from "../../common/card/Card";
import Thumbnail from "../../common/card/thumbnail/Thumbnail";
import ProfileCard from "../../profile-card/ProfileCard";
import styles from "./ProductCard.module.scss";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClickDetail = (code) => {
    navigate(`/market/${code}`);
  };

  return (
    <Card
      className={styles.product}
      onClick={() => handleClickDetail(product.code)}
    >
      {/* 프로필 카드 */}
      <ProfileCard memberProfile={product.memberProfile} />

      {/* 이미지 슬라이드 */}
      <div className={styles.thumbnails}>
        <Thumbnail images={product.images || null} />
      </div>

      {/* 본문 */}
      <div className={styles.contents}>
        {/* 제목 */}
        <div className={styles.title}>
          <span>{product.categoryName}</span>
          <h3>{product.title}</h3>
        </div>

        {/* 콘텐츠 (내용) */}
        <div className={styles.detail}>
          <p>{product.content}</p>
          <div className={styles.price}>{product.price.toLocaleString()}원</div>
        </div>

        {/* Pick & 작성일(시간) */}
        <div className={styles.info}>
          <div className={styles.icon}>
            <span>
              <IoHeartSharp />
            </span>
            {product.countPick}
          </div>
          <div>
            <span>{product.createdAt}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
