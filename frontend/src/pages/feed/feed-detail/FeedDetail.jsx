import { FaEye } from "react-icons/fa6";
import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import ProfileCard from "../../../components/auth/profile-card/ProfileCard";
import Button from "../../../components/common/button/Button";
import CloseButton from "../../../components/common/button/close/CloseButton.jsx";
import Slide from "../../../components/common/slide/Slide.jsx";
import Comments from "../../../components/feed/comment/Comments.jsx";
import Hashtag from "../../../components/feed/hashtag/Hashtag";

import { useAuth } from "../../../context/AuthContext.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import { formatCreatedAt } from "../../../utils/formatDate";

import styles from "./FeedDetail.module.scss";

const FeedDetail = ({ code, onClose }) => {
  /* 라우터 및 인증 정보 조회 */
  const navigate = useNavigate();
  const { user } = useAuth();

  /* 피드 데이터 조회 */
  const { data, loading, error } = useLoadData(`/api/feeds/${code}`);

  /* 피드 상세 데이터 및 작성자 정보 확인 */
  const detail = data || {};
  const isOwner =
    user?.code != null &&
    detail.memberProfile?.code != null &&
    String(user.code) === String(detail.memberProfile.code);

  /* 피드 삭제 요청 훅 */
  const { handleSubmit: handleSubmitDeleteFeed } = useSubmitData(
    `/api/feeds/${code}`,
    "DELETE",
  );

  /* 피드 삭제 핸들러 */
  const handleDeleteFeed = async () => {
    if (!isOwner) return;

    const memCode = detail.memberProfile?.code;

    if (confirm("삭제된 피드는 복구되지 않습니다. 정말 삭제하시겠습니까?")) {
      try {
        const { success } = await handleSubmitDeleteFeed(memCode, "DELETE");

        if (success) {
          alert("피드 삭제에 성공했습니다.");
          onClose();
          window.location.reload();
        }
      } catch (err) {
        alert("서버와 통신에 실패했습니다.");
        console.error(err);
      }
    }
  };

  /* 로딩 상태 렌더링 */
  if (loading) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }

  /* 에러 상태 렌더링 */
  if (error) {
    return <div>데이터를 불러오는 데 실패했습니다. {error}</div>;
  }

  return (
    <div className={styles.feedDetail}>
      {/* 헤더 영역 */}
      <div className={styles.header}>
        {/* 제목 상자 */}
        <div className={styles.titleBox}>
          <span className={styles.challengeName}>{detail.challengeName}</span>
          <h2 className={styles.title}>{detail.title}</h2>
        </div>
        <CloseButton className={styles.closeModalButton} onClick={onClose} />
      </div>

      {/* 하단 컨테이너 */}
      <div className={styles.container}>
        {/* 이미지 슬라이드 영역 */}
        <div className={styles.images}>
          <Slide images={detail.imagePaths} isLoop />
        </div>

        {/* 피드 상세 내용 영역 */}
        <div className={`${styles.content} ${styles.detail}`}>
          {/* 작성자 프로필 */}
          <ProfileCard memberProfile={detail.memberProfile} showMemberActions />

          {/* 본문 내용 */}
          <p>{detail.content}</p>

          {/* 해시태그 목록 */}
          <div className={styles.hashtags}>
            {detail.hashtags?.map((tag, idx) => (
              <Hashtag key={idx} hashName={tag} />
            ))}
          </div>

          {/* 제어 버튼 그룹 */}
          {isOwner && (
          <ul className={styles.controlButtonGroup}>
            <li>
              <Button
                btnStyle="word"
                action="submit"
                onClick={() => navigate(`/feed/edit/${code}`)}
              >
                수정
              </Button>
            </li>
            <li>
              <Button
                btnStyle="word"
                action="danger"
                onClick={handleDeleteFeed}
              >
                삭제
              </Button>
            </li>
          </ul>
          )}

          {/* 피드 메타 정보 */}
          <div className={styles.meta}>
            {/* 작성 날짜 및 신고 영역 */}
            <div className={styles.dateRow}>
              <span>{formatCreatedAt(detail.createdAt)}</span>
              {!isOwner && (
                <Button
                  btnStyle="word"
                  action="danger"
                  onClick={() => navigate(`/feed/${code}/report`)}
                  className={styles.reportButton}
                >
                  게시글 신고하기
                </Button>
              )}
            </div>

            {/* 피드 통계 정보 */}
            <div className={styles.statsGroup}>
              <span className={styles.statItem}>
                <FaEye />
                {detail.hitcount}
              </span>
              <span className={styles.statItem}>
                <IoChatbubbleEllipses />
                {detail.countFeedComment}
              </span>
              <span className={styles.statItem}>
                <IoHeartSharp />
                {detail.countFeedLike}
              </span>
            </div>
          </div>

          {/* 댓글 영역 */}
          <Comments targetCode={code} />
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
