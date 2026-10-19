import ProfileCard from "../../../auth/profile-card/ProfileCard.jsx";
import { formatCreatedAt } from "../../../../utils/formatDate.js";
import styles from "./CommentItem.module.scss";
import MemberActions from "../../../auth/member-actions/MemberActions.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
import LikeButton from "../../../common/button/like/LikeButton.jsx";
import Button from "../../../common/button/Button.jsx";
import { useState } from "react";

const CommentItem = ({ comment, readOnly = false, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const isOwner = user?.code != null && comment.memberProfile?.code != null
    && String(user.code) === String(comment.memberProfile.code);

  const mutate = async (method) => {
    if (!isOwner || readOnly || busy) return;
    const content = draft.trim();
    if (method === "PATCH" && !content) {
      setError("댓글 내용을 입력해주세요.");
      return;
    }
    if (method === "DELETE" && !window.confirm("댓글을 삭제하시겠습니까?")) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/comments/${comment.code}`, {
        method,
        credentials: "include",
        ...(method === "PATCH" ? {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        } : {}),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) {
        throw new Error(result?.message || "댓글 처리에 실패했습니다. 다시 시도해주세요.");
      }
      if (method === "PATCH") {
        onUpdate?.({ ...comment, content });
        setEditing(false);
      } else {
        onDelete?.(comment.code);
      }
    } catch (err) {
      setError(err.message || "서버와 통신하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.profile}>
        <ProfileCard
          className={styles.profile}
          memberProfile={comment.memberProfile}
          isMinimal={true}
          badge={
            <div className={styles.badge}>
              <span className={styles.date}>
                {formatCreatedAt(comment.createdAt)}
              </span>
              {isOwner && (
                <span className={styles.mine}>내 댓글</span>
              )}
            </div>
          }
        />
        {!readOnly && <MemberActions memberProfile={comment.memberProfile} />}
      </div>
      <div className={styles.contents}>
        {editing && !readOnly ? (
          <form className={styles.editForm} onSubmit={(event) => { event.preventDefault(); mutate("PATCH"); }}>
            <textarea aria-label="댓글 수정 내용" value={draft} disabled={busy}
              onChange={(event) => setDraft(event.target.value)} autoFocus />
            <div>
              <Button type="submit" btnStyle="word" disabled={busy}>저장</Button>
              <Button btnStyle="word" disabled={busy} onClick={() => { setEditing(false); setError(""); }}>취소</Button>
            </div>
          </form>
        ) : <p>{comment.content}</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        <div className={styles.meta}>
          {!readOnly && isOwner && !editing && (
            <div>
              <Button btnStyle="word" disabled={busy} onClick={() => { setDraft(comment.content); setError(""); setEditing(true); }}>수정</Button>
              <Button btnStyle="word" disabled={busy} onClick={() => mutate("DELETE")}>삭제</Button>
            </div>
          )}
          <div
            style={{
              pointerEvents: readOnly ? "none" : "auto",
              cursor: readOnly ? "default" : "pointer",
            }}
          >
            <LikeButton
              targetType="comments"
              targetCode={comment.code}
              initialIsLiked={comment.likedYn}
              initialLikeCount={comment.countCommentLike}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
