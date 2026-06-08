import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { searchFeedByCode } from "../../../api/feed";
import Button from "../../../components/common/button/Button";
import Thumbnail from "../../../components/common/card/thumbnail/Thumbnail";
import Comment from "../../../components/feed/comment/Comment";
import Hashtag from "../../../components/feed/hashtag/Hashtag";
import TextInput from "../../../components/forms/text-input/TextInput";
import ProfileCard from "../../../components/profile-card/ProfileCard";
import { formatCreatedAt } from "../../../utils/formatDate";
import styles from "./FeedDetail.module.scss";

const FeedDetail = () => {
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const { code } = useParams();

  // 임시로 로그인 관련 세션 설정 -> 나중에 변경할 것!
  const isLoggedIn = sessionStorage.getItem("userName") !== null;

  // 피드 상세 조회 데이터 불러오기
  useEffect(() => {
    const handleLoadFeedDetail = async () => {
      const feedDetail = await searchFeedByCode(code);

      if (feedDetail) {
        setDetail(feedDetail);
      }
    };

    handleLoadFeedDetail();
  }, [code]);

  if (detail === null) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }

  return (
    <div className={styles.feedDetail}>
      <div className={styles.title}>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div>
          <span>{detail.chalTitle}</span>
          <h2>{detail.title}</h2>
        </div>
      </div>

      <div className={styles.container}>
        {/* 이미지 슬라이드 */}
        <div className={styles.thumbnails}>
          <Thumbnail images={detail.images || null} />
        </div>
        <div className={styles.contents}>
          {/* 작성자 프로필 */}
          <ProfileCard memberProfile={detail.memberProfile} />

          {/* 본문 내용 */}
          <p>{detail.content}</p>

          {/* 해시태그 */}
          <div>
            {detail.hashtags.map((tag, idx) => (
              <Hashtag key={idx}>
                {/* 링크로 놓고 해당 해시태그만 모아보기? */}
                <span>#{tag.tagName}</span>
              </Hashtag>
            ))}
          </div>

          {/* 피드 정보 (날짜, 좋아요 수, 댓글 수 등) */}
          <div>
            <span>{formatCreatedAt(detail.createdAt)}</span>
            <div>
              <span>
                <IoChatbubbleEllipses /> {detail.countComment}
              </span>
              <span>
                <IoHeartSharp /> {detail.countFeedLike}
              </span>
            </div>
          </div>

          {/* 댓글 */}
          <div>
            <div className={styles.commentField}>
              <TextInput
                disabled={!isLoggedIn}
                placeholder={
                  isLoggedIn
                    ? "댓글을 작성해주세요."
                    : "로그인 후 댓글을 작성할 수 있습니다."
                }
              />
              <Button disabled={!isLoggedIn}>등록</Button>
            </div>
            <div className={styles.comments}>
              <Comment comments={detail.comments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
