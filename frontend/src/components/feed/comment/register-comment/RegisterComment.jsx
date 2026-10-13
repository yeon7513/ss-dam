import React from 'react';
import TextInput from "../../../forms/text-input/TextInput.jsx";
import Button from "../../../common/button/Button.jsx";
import styles from "./RegisterComment.module.scss";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { useSubmitData } from "../../../../hooks/useSubmitData.js";

function RegisterComment({ code, onAddNewComment }) {
  const { isLoggedIn } = useAuth();

  const { handleSubmit } = useSubmitData("/api/comments", "POST");

  const handleRegisterComment = async (e) => {
    e.preventDefault();

    const form = e.target.closest("form");

    const newComment = {
      feedCode: code,
      content: form.comment.value,
    }

    try {
      const { success, data } = await handleSubmit(newComment);


      if (success) {
        // 새로운 댓글을 부모 컴포넌트에 전달
        onAddNewComment(data);
        form.comment.value = "";
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className={styles.wrap} onSubmit={handleRegisterComment}>
      <TextInput
        id="comment"
        name="comment"
        disabled={!isLoggedIn}
        placeholder={
          isLoggedIn
            ? "댓글을 작성해주세요."
            : "로그인 후 댓글을 작성할 수 있습니다."
        }
      />
      <Button className={styles.registerButton} type="submit">등록</Button>
    </form>
  );
}

export default RegisterComment;
