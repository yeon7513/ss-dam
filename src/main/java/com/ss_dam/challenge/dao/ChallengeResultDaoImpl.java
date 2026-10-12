package com.ss_dam.challenge.dao;

import java.time.LocalDateTime;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ChallengeResultDaoImpl implements ChallengeResultDao {

    private static final String NS = "challengeResult.";

    private final SqlSession sql;

    public ChallengeResultDaoImpl(SqlSession sql) {
        this.sql = sql;
    }

    @Override
    @Transactional(propagation = Propagation.MANDATORY)
    public LocalDateTime lockEndedChallenge(Map<String, Object> params) {
        return sql.selectOne(
                NS + "lockEndedChallenge",
                params);
    }

    //lockEndedChallenge()의 MANDATORY는 Service에서 시작한 트랜잭션 안에서만 행 잠금을 실행하도록 강제

    // saveResult()에 @Transactional이 있으므로 그 흐름으로 호출

    @Override
    public boolean existsCompletedResult(Long challengeCode) {
        return sql.selectOne(
                NS + "existsCompletedResult",
                Map.of("code", challengeCode));
    }

    @Override
    public int insertResultHeader(Map<String, Object> params) {
        return sql.insert(
                NS + "insertResultHeader",
                params);
    }

    @Override
    public int insertMemberResults(Map<String, Object> params) {
        return sql.insert(
                NS + "insertMemberResults",
                params);
    }

    @Override
    public int insertSummary(Map<String, Object> params) {
        return sql.insert(
                NS + "insertSummary",
                params);
    }

    @Override
    public int insertHourlyResults(Map<String, Object> params) {
        return sql.insert(
                NS + "insertHourlyResults",
                params);
    }

    @Override
    public int insertRegionResults(Map<String, Object> params) {
        return sql.insert(
                NS + "insertRegionResults",
                params);
    }

    @Override
    public int markCompleted(Map<String, Object> params) {
        return sql.update(
                NS + "markCompleted",
                params);
    }
}