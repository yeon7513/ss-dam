import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import Card from "../../common/card/Card";
import ProfileCard from "../../profile-card/ProfileCard";
import Hashtag from "../hashtag/Hashtag";
import styles from "./FeedCard.module.scss";
import ImageBox from "../../common/image-box/ImageBox.jsx";
import { HOST } from "../../../lib/url.js";

function FeedCard({ feed, onClickDetail }) {
  return (
    <Card className={styles.feed} onClick={() => onClickDetail(feed.code)}>
      {/* 프로필 카드 */}
      <ProfileCard memberProfile={feed.memberProfile} />

      {/* 썸네일 */}
      <div className={styles.thumbnail}>
        <ImageBox src={HOST + feed.thumbnail} alt="대표 이미지" />
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
          <div className={styles.hashtags}>
            {feed.hashtags.map((tag, idx) => (
              <Hashtag key={idx}>
                <span>#{tag}</span>
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
              {feed.countFeedComment}
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
