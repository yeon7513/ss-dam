package com.ss_dam.common.likes.dao;

public interface LikeDao {

  int countFeedLike(Long feedCode);

  int countCommentLike(Long cmtCode);

}
