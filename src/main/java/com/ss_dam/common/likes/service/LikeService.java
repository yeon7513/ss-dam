package com.ss_dam.common.likes.service;

public interface LikeService {    

	boolean toggleFeedLike(long feedCode, long memCode);
	
	boolean toggleCommentLike(long cmtCode, long memCode);
}