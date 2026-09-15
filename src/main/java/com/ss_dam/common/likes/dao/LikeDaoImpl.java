package com.ss_dam.common.likes.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LikeDaoImpl implements LikeDao {

    @Autowired
    SqlSession sql;

	@Override
	public void upsertFeedLike(long feedCode, long memCode) {
		Map<String, Object> params = new HashMap<>();
		
		params.put("feedCode", feedCode);
		params.put("memCode", memCode);
		
		sql.insert("feedLike.upsertFeedLike", params);
		
	}

	@Override
	public boolean selectIsFeedLiked(long feedCode, long memCode) {
		Map<String, Object> params = new HashMap<>();
		
		params.put("feedCode", feedCode);
		params.put("memCode", memCode);
		
		Boolean isLiked = sql.selectOne("feedLike.selectedIsLiked", params);
		
		return Boolean.TRUE.equals(isLiked);
	}

	@Override
	public void upsertCommentLike(long cmtCode, long memCode) {
		Map<String, Object> params = new HashMap<>();
		
		params.put("cmtCode", cmtCode);
		params.put("memCode", memCode);
		
		sql.insert("commentLike.upsertCommentLike", params);
		
	}

	@Override
	public boolean selectIsCommentLike(long cmtCode, long memCode) {
		Map<String, Object> params = new HashMap<>();
		
		params.put("cmtCode", cmtCode);
		params.put("memCode", memCode);
		
		Boolean isLiked = sql.selectOne("commentLike.selectedIsLiked", params);
		
		return Boolean.TRUE.equals(isLiked);		
	}

    
}