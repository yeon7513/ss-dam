package com.ss_dam.challenge.result.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.result.model.internal.ChallengeResultRow;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultDetailView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultListView;

@Repository
public class AdminChallengeResultDaoImpl
        implements AdminChallengeResultDao {

    private final SqlSession sql;

    public AdminChallengeResultDaoImpl(SqlSession sql) {
        this.sql = sql;
    }

    // 검색 조건에 맞는 종료 결과 개수
    @Override
    public long countChallenges(Map<String, Object> params) {
        return sql.selectOne(
                "adminChallengeResult.countChallenges",
                params);
    }

    // 종료 결과 목록: JSON 제외, 요약 정보만 조회
    @Override
    public List<AdminChallengeResultListView> loadChallenges(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeResult.loadChallenges",
                params);
    }

    // 조회 가능한 종료 챌린지인지 확인
    @Override
    public boolean existsEndedChallenge(Map<String, Object> params) {
        return sql.selectOne(
                "adminChallengeResult.existsEndedChallenge",
                params);
    }

    // 종료 결과 저장 완료 여부
    @Override
    public boolean isSnapshotReady(Long code) {
        return sql.selectOne(
                "adminChallengeResult.isSnapshotReady",
                Map.of("code", code));
    }

    // 상세 기본 정보 및 지급 정보 조회
    @Override
    public AdminChallengeResultDetailView loadChallenge(Long code) {
        return sql.selectOne(
                "adminChallengeResult.loadChallenge",
                Map.of("code", code));
    }

    // 캐시 적재용: 완료된 결과의 요약 통계와 JSON 3개 조회
    @Override
    public ChallengeResultRow loadCompletedResult(Long code) {
        return sql.selectOne(
                "adminChallengeResult.loadCompletedResult",
                Map.of("code", code));
    }
}