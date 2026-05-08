package com.ss_dam.global.likes.dao;

public interface LikeDao {

  int countFeedLike(Long feedCode);

  int countCommentLike(Long cmtCode);

}
