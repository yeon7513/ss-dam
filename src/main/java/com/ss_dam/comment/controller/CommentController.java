package com.ss_dam.comment.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ss_dam.comment.Comment;
import com.ss_dam.comment.service.CommentService;

@RestController
@RequestMapping("/api/user/comments")
public class CommentController {

  @Autowired
  CommentService commentService;
  
  // 댓글 전체 조회 (테스트용?)
  @GetMapping
  List<Comment> searchComments() {
    return commentService.searchComments();
  }

  // 댓글 등록
  @PostMapping
  Comment registerCommemnt(Comment comment) {
    return commentService.registerCommemnt(comment);
  }

  // 피드별 댓글
  @GetMapping("/{feedCode}")
  List<Comment> searchCommentsByFeedCode(@PathVariable Long feedCode) {
    return commentService.searchCommentsByFeedCode(feedCode);
  }


}
