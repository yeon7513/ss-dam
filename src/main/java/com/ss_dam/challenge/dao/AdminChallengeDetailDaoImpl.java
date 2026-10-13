package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeHourlyCount;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;

@Repository
public class AdminChallengeDetailDaoImpl implements AdminChallengeDetailDao {

	private final SqlSession sql;

	public AdminChallengeDetailDaoImpl (SqlSession sql) {
		this.sql = sql;
	}

	@Override
    public AdminChallengeDetailView loadChallenge(Long code) {
        return sql.selectOne(
                "adminChallengeDetail.loadChallenge",
                Map.of("code", code));
    }

	@Override
    public boolean existsChallengeIncludingDeleted(Long code) {
        return sql.selectOne(
                "adminChallengeDetail.existsChallengeIncludingDeleted",
                Map.of("code", code));
    }

	@Override
    public long countParticipants(Map<String, Object> params) {
        return sql.selectOne(
                "adminChallengeDetail.countParticipants",
                params);
    }

	@Override
    public List<AdminChallengeParticipantView> loadParticipants(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeDetail.loadParticipants",
                params);
    }

    @Override
    public List<AdminChallengeRankingView> loadChallengeRanking(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeDetail.loadChallengeRanking",
                params);
    }

    @Override
    public long countNewChallengeProofs(Map<String, Object> params) {
        return sql.selectOne(
                "adminChallengeDetail.countNewChallengeProofs",
                params);
    }

    @Override
    public long countNewChallengeParticipants(
            Map<String, Object> params) {

        return sql.selectOne(
                "adminChallengeDetail.countNewChallengeParticipants",
                params);
    }

    @Override
    public List<AdminChallengeHourlyCount> loadChallengeHourlyParticipants(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeDetail.loadChallengeHourlyParticipants",
                params);
    }
}