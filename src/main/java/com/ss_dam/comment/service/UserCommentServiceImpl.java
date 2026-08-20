package com.ss_dam.comment.service;

import com.ss_dam.comment.Comment;
import com.ss_dam.comment.dao.UserCommentDao;
import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.response.UserCommentView;
import com.ss_dam.common.pager.Pager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserCommentServiceImpl implements UserCommentService {

  @Autowired
  UserCommentDao userCommentDao;

  // 피드에서 호출하는 댓글리스트
  @Override
  public List<UserCommentView> findCommentsByFeedCode(Long feedCode, Pager pager, Long memberCode) {

    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("feedCode", feedCode);
    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return userCommentDao.findCommentsByFeedCode(params);
  }

  @Override
  public CommentCreate registerCommemnt(Comment comment) {
    return null;
  }
}
