import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import Button from "../../../components/common/button/Button";
import Comment from "../../../components/feed/comment/Comment";
import Hashtag from "../../../components/feed/hashtag/Hashtag";
import TextInput from "../../../components/forms/text-input/TextInput";
import ProfileCard from "../../../components/profile-card/ProfileCard";
import { formatCreatedAt } from "../../../utils/formatDate";
import styles from "./FeedDetail.module.scss";
import Slide from "../../../components/common/slide/Slide.jsx";
import cn from "classnames";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useNavigate } from "react-router-dom";
import { useSubmitData } from "../../../hooks/useSubmitData.js";

const FeedDetail = ({ code, onClose }) => {
  const navigate = useNavigate();

  // 임시로 로그인 관련 세션 설정 -> 나중에 변경할 것!
  const isLoggedIn = sessionStorage.getItem("userName") !== null;

  const { data, loading, error } = useLoadData(`/api/feeds/${code}`);

  const detail = data || {};

  // 댓글 부분 옮길 것...
  // const { handleSubmit } = useSubmitData("/api/comments", "POST");
  //
  // const handleRegisterComment = async (e) => {
  //   e.preventDefault();
  //
  //   const form = e.target.closest("form");
  //
  //   const newComment = {
  //     feedCode: code,
  //     content: form.comment.value,
  //   }
  //
  //   try {
  //     const { success } = await handleSubmit(newComment);
  //
  //     if (success) {
  //       alert("댓글 등록 완료");
  //     }
  //
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // 피드 삭제 요청 훅
  const { handleSubmit: handleSubmitDeleteFeed } = useSubmitData(`/api/feeds/${code}`, "DELETE");

  // 피드 삭제 핸들러
  const handleDeleteFeed = async () => {
    const memCode = detail.memberProfile.code;

    if (confirm("삭제된 피드는 복구되지 않습니다. 정말 삭제하시겠습니까?")) {
      try {
        const { success } = await handleSubmitDeleteFeed(memCode, "DELETE");

        if (success) {
          alert("피드 삭제에 성공했습니다.");
          // 모달 닫기
          onClose();
          // 새로고침
          window.location.reload();
        }

      } catch (err) {
        alert("서버와 통신에 실패했습니다.");
        console.error(err);
      }
    }
  }

  if (loading) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 데 실패했습니다. {error}</div>;
  }

  return (
    <div className={cn(styles.feedDetail)}>
      <div className={styles.title}>
        <div>
          <button type="button" onClick={onClose}>X</button>
          <span>{detail.chalTitle}</span>
          <h2>{detail.title}</h2>
        </div>
      </div>

      <div className={styles.container}>
        {/* 이미지 슬라이드 */}
        <div className={styles.images}>
          <Slide images={detail.imagePaths} isLoop={true} />
        </div>

        {/* 피드 상세 */}
        <div className={cn(styles.content, styles.detail)}>
          {/* 작성자 프로필 */}
          <ProfileCard memberProfile={detail.memberProfile} />

          {/* 본문 내용 */}
          <p>{detail.content}</p>

          {/* 해시태그 */}
          <div className={styles.hashtags}>
            {detail.hashtags.map((tag, idx) => (
              <Hashtag key={idx}>
                {/* 링크로 놓고 해당 해시태그만 모아보기? */}
                <span>#{tag}</span>
              </Hashtag>
            ))}
          </div>

          {/* 수정 & 삭제 버튼 - 로그인한 사용자 전용 */}
          <div>
            <ul>
              <li>
                <Button type="button" onClick={() => navigate(`edit/${code}`)}>수정</Button>
              </li>
              <li>
                <Button type="button" onClick={handleDeleteFeed}>삭제</Button>
              </li>
            </ul>
          </div>

          {/* 피드 정보 (날짜, 좋아요 수, 댓글 수 등) */}
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

          {/* 댓글 */}
          <div className={cn(styles.content, styles.comment)}>
            {/* 댓글 등록 */}
            <form className={styles.postComment}>
              <TextInput
                className={styles.field}
                id="comment"
                name="comment"
                // disabled={!isLoggedIn}
                // placeholder={
                //   isLoggedIn
                //     ? "댓글을 작성해주세요."
                //     : "로그인 후 댓글을 작성할 수 있습니다."
                // }
              />
              <Button className={styles.registerButton} type="submit">등록</Button>
            </form>

            {/* 등록된 댓글 리스트 */}
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
