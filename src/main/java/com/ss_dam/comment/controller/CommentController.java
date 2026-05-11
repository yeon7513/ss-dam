package com.ss_dam.comment.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ss_dam.comment.Comment;
import com.ss_dam.comment.service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {

  @Autowired
  CommentService commentService;

  // 피드별 댓글
  @GetMapping("/{feedCode}")
  List<Comment> searchCommentsByFeedCode(@PathVariable Long feedCode) {
    return commentService.searchCommentsByFeedCode(feedCode);
  }


}
