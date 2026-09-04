package com.ss_dam.common.likes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.common.likes.FeedLike;
import com.ss_dam.common.likes.dao.LikeDao;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    LikeDao likeDao;

    @Override
    public int countFeedLike(Long feedCode) {

        return likeDao.countFeedLike(feedCode);
    }

    @Override
    public int countCommentLike(Long cmtCode) {

        return likeDao.countCommentLike(cmtCode);
    }

    @Override
    public void registerFeedLike(Long feedCode, Long memCode) {

        FeedLike feedLike = new FeedLike();

        feedLike.setFeedCode(feedCode);
        feedLike.setMemCode(memCode);

        // 기존 좋아요 기록이 있는지 조회
        FeedLike existingLike = likeDao.searchFeedLike(feedLike);

        // 처음 좋아요를 누른 경우
        if (existingLike == null) {

            likeDao.registerFeedLike(feedLike);

        } else if (existingLike.isDeleteYn()) {

            // 예전에 취소했던 좋아요라면 다시 활성화
            likeDao.updateFeedLike(feedLike);
        }
    }

    @Override
    public void deleteFeedLike(Long feedCode, Long memCode) {

        FeedLike feedLike = new FeedLike();

        feedLike.setFeedCode(feedCode);
        feedLike.setMemCode(memCode);

        likeDao.deleteFeedLike(feedLike);
    }
}