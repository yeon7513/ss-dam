package com.ss_dam.common.likes.dao;

import com.ss_dam.common.likes.FeedLike;

public interface LikeDao {

    // 피드 좋아요 개수 조회
    int countFeedLike(Long feedCode);

    // 댓글 좋아요 개수 조회
    int countCommentLike(Long cmtCode);

    // 특정 회원의 피드 좋아요 기록 조회
    FeedLike searchFeedLike(FeedLike feedLike);

    // 피드 좋아요 등록
    int registerFeedLike(FeedLike feedLike);

    // 취소된 피드 좋아요 다시 활성화
    int updateFeedLike(FeedLike feedLike);

    // 피드 좋아요 취소
    int deleteFeedLike(FeedLike feedLike);
}