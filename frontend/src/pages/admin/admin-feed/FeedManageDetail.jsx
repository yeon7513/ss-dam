import { useNavigate, useParams } from "react-router-dom";
import {
  IoChatbubbleEllipses,
  IoHeartSharp,
  IoArrowBack,
} from "react-icons/io5";
import Button from "../../../components/common/button/Button";
import Hashtag from "../../../components/feed/hashtag/Hashtag";
import ProfileCard from "../../../components/auth/profile-card/ProfileCard.jsx";
import { formatCreatedAt } from "../../../utils/formatDate";
import styles from "./FeedManageDetail.module.scss";
import Slide from "../../../components/common/slide/Slide.jsx";
import cn from "classnames";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import Comments from "../../../components/feed/comment/Comments.jsx";

const FeedManageDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useLoadData(`/api/feeds/${code}`);
  const detail = data || {};

  const { handleSubmit: handleSubmitDeleteFeed } = useSubmitData(
    `/api/feeds/${code}`,
    "DELETE",
  );

  const handleDeleteFeed = async () => {
    const memCode = detail.memberProfile?.code;

    if (confirm("삭제된 피드는 복구되지 않습니다. 정말 삭제하시겠습니까?")) {
      try {
        const { success } = await handleSubmitDeleteFeed(memCode, "DELETE");

        if (success) {
          alert("피드 비활성화에 성공했습니다");
          navigate("/admin/feed_manage");
        }
      } catch (err) {
        alert("서버와 통신에 실패했습니다");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>데이터를 불러오는 중입니다</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        데이터를 불러오는 데 실패했습니다. {error}
      </div>
    );
  }

  return (
    <div className={cn(styles.feedDetail)}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <IoArrowBack /> 목록으로
        </button>

        <div className={styles.titleBox}>
          <span className={styles.challengeName}>{detail.challengeName}</span>
          <h2 className={styles.title}>{detail.title}</h2>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.images}>
          <Slide images={detail.imagePaths} isLoop={true} />
        </div>

        <div className={cn(styles.content, styles.detail)}>
          <ProfileCard memberProfile={detail.memberProfile} />

          <p>{detail.content}</p>

          <div className={styles.hashtags}>
            {detail.hashtags?.map((tag, idx) => (
              <Hashtag key={idx} hashName={tag} />
            ))}
          </div>

          <ul className={styles.controlButtonGroup}>
            <li>
              <Button btnStyle="text" type="button" onClick={handleDeleteFeed}>
                삭제
              </Button>
            </li>
          </ul>

          <div className={styles.meta}>
            <span>{formatCreatedAt(detail.createdAt)}</span>
            <div>
              <span>
                <IoChatbubbleEllipses /> {detail.countFeedComment}
              </span>
              <span>
                <IoHeartSharp /> {detail.countFeedLike}
              </span>
            </div>
          </div>

          <Comments targetCode={code} />
        </div>
      </div>
    </div>
  );
};

export default FeedManageDetail;
