import React, { useEffect, useState } from 'react';
import styles from "./Comments.module.scss";
import Comment from "./comment-item/CommentItem.jsx";
import cn from "classnames";
import { useLoadData } from "../../../hooks/useLoadData.js";
import Pagination from "../../common/pagination/Pagination.jsx";
import { buildQueryString } from "../../../utils/buildQueryString.js";
import RegisterComment from "./register-comment/RegisterComment.jsx";

function Comments({ targetCode }) {
  const [currentPage, setCurrentPage] = useState(1);
  // 쿼리스트링 생성
  const queryParams = buildQueryString({
    page: currentPage,
    perPage: 5,
  })

  const { data, loding, error } = useLoadData(`/api/comments/${targetCode}${queryParams}`);
  const [comments, setComments] = useState(data?.content || []);

  // const comments = data?.content || [];

  // 새로운 댓글 등록 시 목록
  const handleAddNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  }

  useEffect(() => {
    if (!data?.content) {
      return;
    }

    setComments(data?.content);
  }, [data?.content])

  if (loding) {
    return <div>댓글 정보를 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div>댓글 정보를 불러오는 데 실패했습니다. {error}</div>;
  }

  return (
    <div className={cn(styles.content, styles.comment)}>
      {/* 댓글 등록 */}
      <RegisterComment code={targetCode} onAddNewComment={handleAddNewComment} />

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
