package com.ss_dam.common.likes.dao;

public interface LikeDao {  

	void upsertFeedLike(long feedCode, long memCode);

	boolean selectIsFeedLiked(long feedCode, long memCode);

	void upsertCommentLike(long cmtCode, long memCode);

	boolean selectIsCommentLike(long cmtCode, long memCode);
}