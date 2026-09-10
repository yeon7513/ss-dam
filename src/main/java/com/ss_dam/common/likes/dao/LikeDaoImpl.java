package com.ss_dam.common.likes.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.common.likes.FeedLike;

@Repository
public class LikeDaoImpl implements LikeDao {

    @Autowired
    SqlSession sql;

    @Override
    public int countFeedLike(Long feedCode) {

        return sql.selectOne("likes.countFeedLike", feedCode);
    }

    @Override
    public int countCommentLike(Long cmtCode) {

        return sql.selectOne("likes.countCommentLike", cmtCode);
    }

    @Override
    public FeedLike searchFeedLike(FeedLike feedLike) {

        return sql.selectOne("likes.searchFeedLike", feedLike);
    }

    @Override
    public int registerFeedLike(FeedLike feedLike) {

        return sql.insert("likes.registerFeedLike", feedLike);
    }

    @Override
    public int updateFeedLike(FeedLike feedLike) {

        return sql.update("likes.updateFeedLike", feedLike);
    }

    @Override
    public int deleteFeedLike(FeedLike feedLike) {

        return sql.update("likes.deleteFeedLike", feedLike);
    }
}