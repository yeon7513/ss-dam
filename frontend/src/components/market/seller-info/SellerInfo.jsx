import { HiOutlineUser } from "react-icons/hi";
import RatingIcon from "../../common/icons/RatingIcon.jsx";
import styles from "./SellerInfo.module.scss";

// 서버 MemberRating의 등급 번호(0~4)와 동일한 순서입니다.
const RATINGS = ["씨앗", "새싹", "줄기", "가지", "나무"];

export default function SellerInfo({ memberProfile }) {
  if (!memberProfile) return null;
  const rating = memberProfile.rating;
  const ratingName = RATINGS[rating];

  return (
    <div className={styles.box} role="group" aria-label="판매자 정보">
      <span className={styles.avatar}>
        {memberProfile.path ? (
          <img src={memberProfile.path} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        ) : null}
        <HiOutlineUser aria-hidden="true" />
      </span>
      <span className={styles.name}>{memberProfile.id || "판매자"}</span>
      {ratingName && (
        <span className={styles.rating} role="img" aria-label={`${ratingName} 등급`} title={`${ratingName} 등급`}>
          <RatingIcon rating={Number(rating)} />
        </span>
      )}
    </div>
  );
}
