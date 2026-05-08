package com.ss_dam.comment.dao;

import java.util.List;
import com.ss_dam.comment.Comment;

public interface CommentDao {

  int countComment(Long feedCode);

  List<Comment> searchCommentsByFeedCode(Long feedCode);

}
