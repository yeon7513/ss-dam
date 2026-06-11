import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Card from "../../common/card/Card";
import Thumbnail from "../../common/card/thumbnail/Thumbnail";
import ProfileCard from "../../profile-card/ProfileCard";
import Hashtag from "../hashtag/Hashtag";
import styles from "./FeedCard.module.scss";

function FeedCard({ feed }) {
  const navigate = useNavigate();

  const handleClickDetail = (code) => {
    navigate(`/feed/${code}`);
  };

  return (
    <Card className={styles.feed} onClick={() => handleClickDetail(feed.code)}>
      {/* 프로필 카드 */}
      <ProfileCard memberProfile={feed.memberProfile} />

      {/* 이미지 슬라이드 */}
      <div className={styles.thumbnails}>
        <Thumbnail images={feed.images || null} />
      </div>

      {/* 본문 */}
      <div className={styles.contents}>
        {/* 제목 */}
        <div className={styles.title}>
          <span>{feed.chalTitle}</span>
          <h3>{feed.title}</h3>
        </div>

        {/* 콘텐츠 (내용) */}
        <div className={styles.detail}>
          <p>{feed.content}</p>
          <div className={styles.hashtags}>
            {feed.hashtags.map((tag, idx) => (
              <Hashtag key={idx}>
                <span>#{tag.tagName}</span>
              </Hashtag>
            ))}
          </div>
        </div>

        {/* 좋아요 & 댓글 & 작성일(시간) */}
        <div className={styles.info}>
          <div className={styles.count}>
            <div className={styles.icon}>
              <span className={styles.like}>
                <IoHeartSharp />
              </span>
              {feed.countFeedLike}
            </div>
            <div className={styles.icon}>
              <span className={styles.comment}>
                <IoChatbubbleEllipses />
              </span>
              {feed.countComment}
            </div>
          </div>
          <div>
            <span>{feed.createdAt}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default FeedCard;
