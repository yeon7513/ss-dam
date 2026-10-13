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
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import Comments from "../../../components/feed/comment/Comments.jsx";
import { useState } from "react";

const FeedManageDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");

  const { data, loading, error } = useLoadData(`/api/feeds/${code}`);
  const detail = data || {};

  const { handleSubmit: handleSubmitDeleteFeed } = useSubmitData(
    `/api/feeds/${code}`,
    "DELETE",
  );

  const { handleSubmit: handleSubmitRestoreFeed } = useSubmitData(
    `/api/admin/feeds/${code}/restore`,
    "PATCH",
  );

  const isDeleted =
    ["Y", "1", 1, true].includes(detail?.deleteYn) ||
    detail?.status === "DELETED";

  const authorId =
    detail.memberProfile?.id || detail.memberProfile?.nickname || "-";

  const handleDelete = async () => {
    if (!reason.trim()) {
      alert("처리 사유를 입력해주세요");
      return;
    }
    if (confirm("피드를 비활성화(삭제)하시겠습니까?")) {
      try {
        const { success } = await handleSubmitDeleteFeed({ reason }, "DELETE");

        if (success) {
          alert("피드가 비활성화되었습니다");
          navigate("/admin/feed_manage");
        }
      } catch (err) {
        alert("서버 통신 실패");
        console.error(err);
      }
    }
  };

  const handleRestore = async () => {
    if (!reason.trim()) {
      alert("처리 사유를 입력해주세요");
      return;
    }
    if (confirm("이 피드를 다시 활성화(복구)하시겠습니까?")) {
      try {
        const { success } = await handleSubmitRestoreFeed({ reason });

        if (success) {
          alert("피드가 성공적으로 복구되었습니다");
          navigate("/admin/feed_manage");
        }
      } catch (err) {
        alert("서버 통신 실패");
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
    <div className={styles["admin-detail-wrapper"]}>
      <div className={styles["detail-header"]}>
        <h2>
          피드 상세 관리{" "}
          <span className={styles["code-tag"]}>CODE #{code}</span>
        </h2>
        <button className={styles["btn-back"]} onClick={() => navigate(-1)}>
          목록으로 돌아가기
        </button>
      </div>

      <div className={styles["summary-bar"]}>
        <div className={styles["summary-item"]}>
          <span className={styles.label}>작성자 ID</span>
          <span className={styles.value}>{authorId}</span>
        </div>
        <div className={styles["summary-item"]}>
          <span className={styles.label}>챌린지</span>
          <span className={styles.value}>{detail.challengeName || "-"}</span>
        </div>
        <div className={styles["summary-item"]}>
          <span className={styles.label}>활성화 여부</span>
          <span
            className={`${styles["active-badge"]} ${
              !isDeleted ? styles.active : styles.inactive
            }`}
          >
            {!isDeleted ? "활성화" : "비활성화(삭제)"}
          </span>
        </div>
        <div className={styles["summary-item"]}>
          <span className={styles.label}>등록일</span>
          <span className={styles.value}>
            {detail.createdAt ? formatCreatedAt(detail.createdAt) : "-"}
          </span>
        </div>
      </div>

      <div className={styles["detail-grid"]}>
        <div className={styles["left-content"]}>
          <div className={styles["feed-card"]}>
            <div className={styles["feed-header-title"]}>
              {detail.challengeName && (
                <span className={styles["challenge-tag"]}>
                  {detail.challengeName}
                </span>
              )}
              <h3 className={styles["feed-title"]}>
                {detail.title || "피드 상세 내용"}
              </h3>
            </div>

            <div className={styles["feed-main-layout"]}>
              <div className={styles["feed-images"]}>
                <Slide images={detail.imagePaths} isLoop={true} />
              </div>

              <div className={styles["feed-info"]}>
                <ProfileCard memberProfile={detail.memberProfile} />

                <div className={styles["content-box"]}>
                  {detail.content || "등록된 본문 내용이 없습니다."}
                </div>

                <div className={styles.hashtags}>
                  {detail.hashtags?.map((tag, idx) => (
                    <Hashtag key={idx} hashName={tag} />
                  ))}
                </div>

                <div className={styles.meta}>
                  <span>
                    <IoChatbubbleEllipses /> {detail.countFeedComment || 0}
                  </span>
                  <span>
                    <IoHeartSharp /> {detail.countFeedLike || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles["card-title"]}>댓글 관리</h3>
            <Comments targetCode={code} />
          </div>
        </div>

        <div className={styles["right-content"]}>
          <div className={`${styles.card} ${styles["action-card"]}`}>
            <h3 className={styles["card-title"]}>관리자 상태 조치</h3>
            <p className={styles["action-desc"]}>
              삭제 또는 복구 사유를 입력한 뒤 변경 버튼을 누르세요.
            </p>
            <textarea
              className={styles["reason-textarea"]}
              placeholder="처리 사유를 입력하세요..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className={styles["button-group"]}>
              <button
                className={`${styles["btn-action"]} ${styles["btn-delete"]}`}
                onClick={handleDelete}
                disabled={isDeleted}
              >
                비활성화 (삭제)
              </button>
              <button
                className={`${styles["btn-action"]} ${styles["btn-restore"]}`}
                onClick={handleRestore}
                disabled={!isDeleted}
              >
                활성화 (복구)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedManageDetail;
