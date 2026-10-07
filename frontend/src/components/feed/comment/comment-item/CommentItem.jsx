import ProfileCard from "../../../auth/profile-card/ProfileCard.jsx";
import { IoHeartSharp } from "react-icons/io5";
import { formatCreatedAt } from "../../../../utils/formatDate.js";
import styles from "./CommentItem.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { useAuth } from "../../../../context/AuthContext.jsx";

const CommentItem = ({ comment }) => {
  console.log("comment: ", comment);

  const { user } = useAuth();
  console.log("user: ", user);

  return (
    <div className={styles.comment}>
      <div className={styles.profile}>
        <ProfileCard
          className={styles.profile}
          memberProfile={comment.memberProfile}
          isMinimal={true}
          badge={user.id === comment.memberProfile.id ? "내 댓글" : null}
        />
        <button type="button" className={styles.more}>
          <HiDotsVertical />
        </button>
      </div>
      <div>
        <p>{comment.content}</p>
        <div className={styles.meta}>
          <span className={styles.date}>{formatCreatedAt(comment.createdAt)}</span>
          <div className={styles.like}>
            <button type="button">
              <IoHeartSharp />
            </button>
            {comment.countCommentLike}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
