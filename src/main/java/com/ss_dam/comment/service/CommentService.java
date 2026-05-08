package com.ss_dam.comment.service;

import java.util.List;
import com.ss_dam.comment.Comment;

public interface CommentService {

  int countComment(Long feedCode);

  List<Comment> searchCommentsByFeedCode(Long feedCode);

}
