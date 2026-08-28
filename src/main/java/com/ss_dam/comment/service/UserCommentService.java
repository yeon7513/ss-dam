package com.ss_dam.comment.service;

import java.util.List;

import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.request.CommentUpdate;
import com.ss_dam.comment.model.response.UserCommentView;
import com.ss_dam.common.pager.Pager;

public interface UserCommentService {

  //피드별 댓글 조회
  List<UserCommentView> findCommentsByFeedCode(Long feedCode, Pager pager, Long memberCode);

  //댓글 등록 (임시)
  CommentCreate registerComment(CommentCreate comment);

  //댓글 수정
  void updateComment(Long commentCode, Long memCode, CommentUpdate request);

  /* 
  //댓글 등록 (세션 확인)
  CommentCreate registerComment(CommentCreate request, Long memberCode);
  */
} 
