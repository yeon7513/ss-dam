package com.ss_dam.comment.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.response.UserCommentView;

public interface UserCommentDao {

  //피드별 댓글 조회
  List<UserCommentView> findCommentsByFeedCode(Map<String, Object> params);

  //댓글 등록 (임시)
  int registerComment(CommentCreate comment);

  //댓글 수정
  int updateComment(Map<String, Object> params);

  //댓글 삭제
  int deleteComment(Map<String, Object> params);

}
