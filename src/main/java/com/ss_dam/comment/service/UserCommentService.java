package com.ss_dam.comment.service;

import com.ss_dam.comment.Comment;
import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.response.UserCommentView;
import com.ss_dam.common.pager.Pager;

import java.util.List;

public interface UserCommentService {

  List<UserCommentView> findCommentsByFeedCode(Long feedCode, Pager pager, Long memberCode);

  CommentCreate registerCommemnt(Comment comment);
}
