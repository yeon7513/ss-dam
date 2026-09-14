package com.ss_dam.common.likes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.common.likes.dao.LikeDao;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    LikeDao likeDao;
    
	@Override
	public boolean toggleFeedLike(long feedCode, long memCode) {
		
		likeDao.upsertFeedLike(feedCode, memCode);

		return likeDao.selectIsFeedLiked(feedCode, memCode);
	}

	@Override
	public boolean toggleCommentLike(long cmtCode, long memCode) {

		likeDao.upsertCommentLike(cmtCode, memCode);
		
		return likeDao.selectIsCommentLike(cmtCode, memCode);
	}
}