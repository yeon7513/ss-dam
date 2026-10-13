import ProfileCard from "../../../auth/profile-card/ProfileCard.jsx";
import { formatCreatedAt } from "../../../../utils/formatDate.js";
import styles from "./CommentItem.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { useAuth } from "../../../../context/AuthContext.jsx";
import LikeButton from "../../../common/button/like/LikeButton.jsx";
import Button from "../../../common/button/Button.jsx";

const CommentItem = ({ comment }) => {
  const { user } = useAuth();

  return (
    <div className={styles.comment}>
      <div className={styles.profile}>
        <ProfileCard
          className={styles.profile}
          memberProfile={comment.memberProfile}
          isMinimal={true}
          badge={
            <div className={styles.badge}>
              <span className={styles.date}>{formatCreatedAt(comment.createdAt)}</span>
              {user && user.id === comment.memberProfile.id && (
                <span className={styles.mine}>내 댓글</span>
              )}
            </div>
          }
        />
        <button type="button" className={styles.more}>
          <HiDotsVertical />
        </button>
      </div>
      <div className={styles.contents}>
        <p>{comment.content}</p>
        <div className={styles.meta}>
          {user && user.id === comment.memberProfile.id && (
            <div>
              <Button btnStyle="text">수정</Button>
              <Button btnStyle="text">삭제</Button>
            </div>
          )}
          <LikeButton
            targetType="comments"
            targetCode={comment.code}
            initialIsLiked={comment.likedYn}
            initialLikeCount={comment.countCommentLike}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
