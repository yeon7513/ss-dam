import React, { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import Comment from "./comment-item/CommentItem.jsx";
import cn from "classnames";
import { useLoadData } from "../../../hooks/useLoadData.js";
import Pagination from "../../common/pagination/Pagination.jsx";
import { buildQueryString } from "../../../utils/buildQueryString.js";
import RegisterComment from "./register-comment/RegisterComment.jsx";

function Comments({ targetCode, readOnly = false }) {
  const [currentPage, setCurrentPage] = useState(1);
  // 쿼리스트링 생성
  const queryParams = buildQueryString({
    page: currentPage,
    perPage: 5,
  });

  const { data, loading, error, refetch } = useLoadData(
    `/api/comments/${targetCode}${queryParams}`,
  );
  const [comments, setComments] = useState(data?.content || []);

  // const comments = data?.content || [];

  // 새로운 댓글 등록 시 목록
  const handleAddNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  useEffect(() => {
    if (!data?.content) {
      return;
    }

    setComments(data?.content);
  }, [data?.content]);

  const handleUpdateComment = (updated) => {
    setComments((previous) => previous.map((comment) => comment.code === updated.code ? updated : comment));
  };

  const handleDeleteComment = (code) => {
    setComments((previous) => previous.filter((comment) => comment.code !== code));
    if (comments.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      refetch();
    }
  };

  if (loading) {
    return <div>댓글 정보를 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div role="alert">댓글 정보를 불러오는 데 실패했습니다. {error.message}</div>;
  }

  return (
    <div className={cn(styles.content, styles.comment)}>
      {/* 댓글 등록 */}
      {!readOnly && (
        <RegisterComment
          code={targetCode}
          onAddNewComment={handleAddNewComment}
        />
      )}

      {/* 등록된 댓글 리스트 */}
      <div className={styles.comments}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.code} comment={comment} readOnly={readOnly}
              onUpdate={handleUpdateComment} onDelete={handleDeleteComment} />
          ))
        ) : (
          <div>등록된 댓글이 없습니다.</div>
        )}
      </div>
      <Pagination pager={data?.pager} onChangePage={setCurrentPage} />
    </div>
  );
}

export default Comments;
