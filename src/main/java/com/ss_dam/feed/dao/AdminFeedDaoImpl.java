package com.ss_dam.feed.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.feed.model.filter.AdminFeedSearchFilter;
import com.ss_dam.feed.model.response.AdminFeedView;
import com.ss_dam.feed.model.response.AdminMemberFeedsView;
import com.ss_dam.feed.model.response.UserFeedView;

@Repository
public class AdminFeedDaoImpl implements AdminFeedDao {
	
	private final SqlSession sql;

	public AdminFeedDaoImpl (SqlSession sql) {
		this.sql = sql;
	}
    
	//관리자 회원 상세 - 회원 작성 피드 전체 통계
	@Override
	public AdminMemberFeedsView loadMemberFeedSummary(
					Map<String, Object> params) {

			return sql.selectOne(
							"adminFeedView.loadMemberFeedSummary", params);
	}

	//관리자 회원 상세 - 회원 작성 피드 페이지 목록
	@Override
	public List<UserFeedView> loadMemberFeeds(
					Map<String, Object> params) {

			return sql.selectList(
							"adminFeedView.loadMemberFeeds", params);
	}

	@Override
	public List<AdminFeedView> loadFeeds(AdminFeedSearchFilter filter) {
		
		return sql.selectList("adminFeedView.loadFeeds", filter);
	}

	@Override
	public int countFeeds(AdminFeedSearchFilter filter) {
		
		return sql.selectOne("adminFeedView.countFeeds", filter);
	}

}