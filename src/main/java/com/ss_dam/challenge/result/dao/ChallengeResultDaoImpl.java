package com.ss_dam.challenge.result.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.result.model.internal.ChallengeResultRow;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView.HourlyProof;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView.RegionParticipant;

@Repository
public class ChallengeResultDaoImpl implements ChallengeResultDao {

    private final SqlSession sql;

    public ChallengeResultDaoImpl(SqlSession sql) {
        this.sql = sql;
    }

    // 종료 챌린지 행 잠금 및 종료 시각 조회
    @Override
    @Transactional(propagation = Propagation.MANDATORY)
    public LocalDateTime lockEndedChallenge(Map<String, Object> params) {
        return sql.selectOne(
                "challengeResult.lockEndedChallenge",
                params);
    }

    // 저장 완료된 결과 존재 여부
    @Override
    public boolean existsCompletedResult(Long challengeCode) {
        return sql.selectOne(
                "challengeResult.existsCompletedResult",
                Map.of("code", challengeCode));
    }

    // 상태와 관계없이 결과 존재 여부
    @Override
    public boolean existsResult(Long challengeCode) {
        return sql.selectOne(
                "challengeResult.existsResult",
                Map.of("code", challengeCode));
    }

    // 전체 회원의 최종 성과 및 순위 계산
    @Override
    public List<AdminChallengeRankingView> calculateMemberResults(
            Map<String, Object> params) {

        return sql.selectList(
                "challengeResult.calculateMemberResults",
                params);
    }

    // 최종 요약 통계 계산
    @Override
    public AdminChallengeResultStatisticsView calculateStatistics(
            Map<String, Object> params) {

        return sql.selectOne(
                "challengeResult.calculateStatistics",
                params);
    }

    // 시간대별 인증글 수 집계
    @Override
    public List<HourlyProof> calculateHourlyProofs(
            Map<String, Object> params) {

        return sql.selectList(
                "challengeResult.calculateHourlyProofs",
                params);
    }

    // 지역별 참여 인원 집계
    @Override
    public List<RegionParticipant> calculateRegionParticipants(
            Map<String, Object> params) {

        return sql.selectList(
                "challengeResult.calculateRegionParticipants",
                params);
    }

    // 요약 통계 및 JSON 저장
    @Override
    public int insertCompletedResult(ChallengeResultRow row) {
        return sql.insert(
                "challengeResult.insertCompletedResult",
                row);
    }

    // 저장된 결과가 없는 종료 챌린지 번호 조회
    @Override
    public List<Long> findPendingResultCodes(
            Map<String, Object> params) {

        return sql.selectList(
                "challengeResult.findPendingResultCodes",
                params);
    }
}