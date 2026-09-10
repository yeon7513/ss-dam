import ProfileCard from "../../../profile-card/ProfileCard.jsx";
import { IoHeartSharp } from "react-icons/io5";
import { formatCreatedAt } from "../../../../utils/formatDate.js";


const Comment = ({ comment }) => {
  if (!comment) {
    return <div>댓글 정보를 불러오는 중입니다.</div>;
  }


  return (
    <div key={comment.code}>
      <div>
        <ProfileCard memberProfile={comment.memberProfile} />
      </div>
      <div>
        <p>{comment.content}</p>
        <div>
          <span>{formatCreatedAt(comment.createdAt)}</span>
          <span>
            <IoHeartSharp /> {comment.countLike}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
