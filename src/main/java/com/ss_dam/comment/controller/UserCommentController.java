package com.ss_dam.comment.controller;

import com.ss_dam.comment.Comment;
import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.service.UserCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
public class UserCommentController {

  @Autowired
  UserCommentService userCommentService;

  // 댓글 등록
  @PostMapping
  CommentCreate registerCommemnt(Comment comment) {
    return userCommentService.registerCommemnt(comment);
  }

}
