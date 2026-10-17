import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import Card from "../../common/card/Card";
import ProfileCard from "../../auth/profile-card/ProfileCard";
import Hashtag from "../hashtag/Hashtag";
import styles from "./FeedCard.module.scss";
import ImageBox from "../../common/image-box/ImageBox.jsx";
import { formatCreatedAt } from "../../../utils/formatDate.js";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

function FeedCard({ feed, onClickDetail }) {
  const { user } = useAuth();
  const isOwner = user?.code != null && feed.memberProfile?.code != null &&
    String(user.code) === String(feed.memberProfile.code);

  return (
    <Card className={styles.feed} onClick={() => onClickDetail?.(feed.code)}>
      {/* 프로필 카드 */}
      <ProfileCard memberProfile={feed.memberProfile} showMemberActions />

      {/* 썸네일 */}
      <div className={styles.thumbnail}>
        <ImageBox src={feed.thumbnail} alt="대표 이미지" />
      </div>

      {/* 본문 */}
      <div className={styles.contents}>
        {/* 제목 */}
        <div className={styles.title}>
          <span>{feed.challengeName}</span>
          <h3>{feed.title}</h3>
        </div>

        {/* 콘텐츠 (내용) */}
        <div className={styles.detail}>
          <p>{feed.content}</p>
          <div className={styles.hashtags}>
            {feed.hashtags?.map((tag, idx) => (
              <Hashtag key={idx} hashName={tag} className={styles.tagItem} />
            ))}
          </div>
        </div>

        {/* 조회수 & 좋아요 & 댓글 / 작성일(시간) */}
        <div className={styles.info}>
          {/* 상호작용 수 */}
          <div className={styles.count}>
            {/* 좋아요 수 */}
            <div className={styles.icon}>
              <span className={styles.like}>
                <IoHeartSharp />
              </span>
              {feed.countFeedLike}
            </div>
            {/* 댓글 수 */}
            <div className={styles.icon}>
              <span className={styles.comment}>
                <IoChatbubbleEllipses />
              </span>
              {feed.countFeedComment}
            </div>
            {/* 조회수 */}
            <div className={styles.icon}>
              <span className={styles.hitcount}>
                <FaEye />
              </span>
              {feed.hitcount}
            </div>
          </div>

          {/* 작성일 */}
          <div className={styles.dateRow}>
            <span>{formatCreatedAt(feed.createdAt)}</span>
            {!isOwner && (
              <Link
                className={styles.reportLink}
                to={`/feed/${feed.code}/report`}
                onClick={(event) => event.stopPropagation()}
              >
                게시글 신고하기
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default FeedCard;
