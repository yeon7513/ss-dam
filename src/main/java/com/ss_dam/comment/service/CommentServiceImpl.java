package com.ss_dam.comment.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.auth.member.service.MemberService;
import com.ss_dam.comment.Comment;
import com.ss_dam.comment.dao.CommentDao;

@Service
public class CommentServiceImpl implements CommentService {

  @Autowired
  MemberService memberService;

  @Autowired
  CommentDao commentDao;

  @Override
  public int countComment(Long feedCode) {
    return commentDao.countComment(feedCode);
  }

  @Override
  public List<Comment> searchCommentsByFeedCode(Long feedCode) {
    return commentDao.searchCommentsByFeedCode(feedCode);
  }

}
