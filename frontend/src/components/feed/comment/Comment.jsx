import { IoHeartSharp } from "react-icons/io5";
import { formatCreatedAt } from "../../../utils/formatDate";
import ProfileCard from "../../profile-card/ProfileCard";

const Comment = ({ comments }) => {
  if (comments === undefined) {
    return <div>댓글 정보를 불러오는 중입니다.</div>;
  }

  if (comments.length === 0) {
    return <div>작성된 댓글이 없습니다.</div>;
  }

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.code}>
          <div>
            <ProfileCard memberProfile={comment.memberProfiles[0]} />
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
      ))}
    </>
  );
};

export default Comment;
