import React from 'react';
import styles from "./Comments.module.scss";
import TextInput from "../../forms/text-input/TextInput";
import Button from "../../common/button/Button";
import Comment from "./comment-item/Comment.jsx";
import cn from "classnames";

function Comments({ targetCode }) {


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

  return (
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
  );
}

export default Comments;
