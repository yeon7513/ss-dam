package com.ss_dam.comment.dao;

import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.response.UserCommentView;

import java.util.List;
import java.util.Map;

public interface UserCommentDao {

  //피드별 댓글 조회
  List<UserCommentView> findCommentsByFeedCode(Map<String, Object> params);

  //댓글 등록 (임시)
  int registerComment(CommentCreate comment);

}
