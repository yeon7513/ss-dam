package com.ss_dam.comment.dao;

import com.ss_dam.comment.model.response.UserCommentView;

import java.util.List;
import java.util.Map;

public interface UserCommentDao {

  List<UserCommentView> findCommentsByFeedCode(Map<String, Object> params);
}
