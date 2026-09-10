import ProfileCard from "../../../profile-card/ProfileCard.jsx";
import { IoHeartSharp } from "react-icons/io5";
import { formatCreatedAt } from "../../../../utils/formatDate.js";
import styles from "./CommentItem.module.scss";

const CommentItem = ({ comment }) => {

  return (
    <div className={styles.comment}>
      <ProfileCard memberProfile={comment.memberProfile} className={styles.profile} />
      <div>
        <p>{comment.content}</p>
        <div className={styles.meta}>
          <span className={styles.date}>{formatCreatedAt(comment.createdAt)}</span>
          <div className={styles.like}>
            <button>
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
