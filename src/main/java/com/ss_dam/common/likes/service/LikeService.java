package com.ss_dam.common.likes.service;

public interface LikeService {

  int countFeedLike(Long feedCode);

  int countCommentLike(Long cmtCode);

}
