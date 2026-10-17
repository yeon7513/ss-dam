import { HiOutlineUser } from "react-icons/hi";
import styles from "./SellerInfo.module.scss";

// 서버 MemberRating의 등급 번호(0~4)와 동일한 순서입니다.
const RATINGS = ["씨앗", "새싹", "줄기", "가지", "나무"];

function RatingIcon({ rating }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {rating === 0 ? (
        <><ellipse cx="12" cy="12" rx="5" ry="7" transform="rotate(35 12 12)" /><path d="M9 16c0-4 2-6 5-8" /></>
      ) : rating === 4 ? (
        <><path d="M12 21v-8m0 4-4-3m4 1 4-3" /><path d="M7 17a4 4 0 0 1-3-7 4 4 0 0 1 4-5 4 4 0 0 1 8 0 4 4 0 0 1 4 5 4 4 0 0 1-3 7Z" /></>
      ) : (
        <>
          <path d="M12 21V11M8 21h8" />
          <path d="M12 13C6 13 4 10 4 6c5 0 8 2 8 7Zm0-3c0-5 3-7 8-7 0 5-3 7-8 7Z" />
          {rating >= 2 && <path d="M12 18c-4 0-6-2-6-5 4 0 6 2 6 5Z" />}
          {rating === 3 && <path d="M12 17c5 0 8-2 8-6-5 0-8 2-8 6Z" />}
        </>
      )}
    </svg>
  );
}

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
