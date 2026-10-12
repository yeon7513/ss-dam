package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisDetailView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisListView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView.HourlyProof;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView.RegionParticipant;

@Repository
public class AdminChallengeAnalysisDaoImpl
        implements AdminChallengeAnalysisDao {

    private static final String NS = "adminChallengeAnalysis.";

    private final SqlSession sql;

    public AdminChallengeAnalysisDaoImpl(SqlSession sql) {
        this.sql = sql;
    }

    @Override
    public long countChallenges(Map<String, Object> params) {
        return sql.selectOne(
                NS + "countChallenges",
                params);
    }

    @Override
    public List<AdminChallengeAnalysisListView> loadChallenges(
            Map<String, Object> params) {

        return sql.selectList(
                NS + "loadChallenges",
                params);
    }

    @Override
    public boolean existsEndedChallenge(Map<String, Object> params) {
        return sql.selectOne(
                NS + "existsEndedChallenge",
                params);
    }

    @Override
    public boolean isSnapshotReady(Long code) {
        return sql.selectOne(
                NS + "isSnapshotReady",
                Map.of("code", code));
    }

    @Override
    public AdminChallengeAnalysisDetailView loadChallenge(Long code) {
        return sql.selectOne(
                NS + "loadChallenge",
                Map.of("code", code));
    }

    @Override
    public AdminChallengeAnalysisStatisticsView loadStatistics(Long code) {
        return sql.selectOne(
                NS + "loadStatistics",
                Map.of("code", code));
    }

    @Override
    public List<HourlyProof> loadHourlyProofs(Long code) {
        return sql.selectList(
                NS + "loadHourlyProofs",
                Map.of("code", code));
    }

    @Override
    public List<RegionParticipant> loadRegionParticipants(Long code) {
        return sql.selectList(
                NS + "loadRegionParticipants",
                Map.of("code", code));
    }

    @Override
    public long countRankingMembers(Long code) {
        return sql.selectOne(
                NS + "countRankingMembers",
                Map.of("code", code));
    }

    @Override
    public List<AdminChallengeRankingView> loadChallengeRanking(
            Map<String, Object> params) {

        return sql.selectList(
                NS + "loadChallengeRanking",
                params);
    }
}