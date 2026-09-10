package com.ss_dam.common.likes.service;

public interface LikeService {

    int countFeedLike(Long feedCode);

    int countCommentLike(Long cmtCode);

    void registerFeedLike(Long feedCode, Long memCode);

    void deleteFeedLike(Long feedCode, Long memCode);
}