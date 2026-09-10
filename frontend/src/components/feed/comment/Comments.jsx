import React, { useState } from 'react';
import styles from "./Comments.module.scss";
import TextInput from "../../forms/text-input/TextInput";
import Button from "../../common/button/Button";
import Comment from "./comment-item/CommentItem.jsx";
import cn from "classnames";
import { useLoadData } from "../../../hooks/useLoadData.js";
import Pagination from "../../common/pagination/Pagination.jsx";
import { buildQueryString } from "../../../utils/buildQueryString.js";

function Comments({ targetCode }) {
  const [currentPage, setCurrentPage] = useState(1);

  console.log(targetCode);

  // 쿼리스트링 생성
  const queryParams = buildQueryString({
    page: currentPage,
    perPage: 5,
  })

  const { data, loding, error } = useLoadData(`/api/comments/${targetCode}${queryParams}`);

  const comments = data?.content || [];

  console.log("data: ", data);
  console.log("comments: ", comments);

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

  if (loding) {
    return <div>댓글 정보를 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div>댓글 정보를 불러오는 데 실패했습니다. {error}</div>;
  }

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
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.code} comment={comment} />
          ))
        ) : (
          <div>
            등록된 댓글이 없습니다.
          </div>
        )}
      </div>
      <Pagination pager={data?.pager} onChangePage={setCurrentPage} />
    </div>
  );
}

export default Comments;
