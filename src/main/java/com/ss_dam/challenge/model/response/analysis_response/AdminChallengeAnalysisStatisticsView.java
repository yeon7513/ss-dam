package com.ss_dam.challenge.model.response.analysis_response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

// 종료 챌린지 데이터 분석 - 통계 카드와 차트

public class AdminChallengeAnalysisStatisticsView {

    // 통계 카드
    private Long proofCount;
    private Long participantCount;
    private BigDecimal averageLikeCount;
    private BigDecimal averageAchievementRate;
    private BigDecimal successRate;

    // 챌린지 전체 기간의 인증글을 시간대별로 집계
    private List<HourlyProof> hourlyProofs = new ArrayList<>();

    // 지역별 중복 제거 참여 회원 수
    private List<RegionParticipant> regionParticipants = new ArrayList<>();

    public Long getProofCount() {
        return proofCount;
    }

    public void setProofCount(Long proofCount) {
        this.proofCount = proofCount;
    }

    public Long getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(Long participantCount) {
        this.participantCount = participantCount;
    }

    public BigDecimal getAverageLikeCount() {
        return averageLikeCount;
    }

    public void setAverageLikeCount(BigDecimal averageLikeCount) {
        this.averageLikeCount = averageLikeCount;
    }

    public BigDecimal getAverageAchievementRate() {
        return averageAchievementRate;
    }

    public void setAverageAchievementRate(BigDecimal averageAchievementRate) {
        this.averageAchievementRate = averageAchievementRate;
    }

    public BigDecimal getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(BigDecimal successRate) {
        this.successRate = successRate;
    }

    public List<HourlyProof> getHourlyProofs() {
        return hourlyProofs;
    }

    public void setHourlyProofs(List<HourlyProof> hourlyProofs) {
        this.hourlyProofs = hourlyProofs;
    }

    public List<RegionParticipant> getRegionParticipants() {
        return regionParticipants;
    }

    public void setRegionParticipants(
            List<RegionParticipant> regionParticipants) {
        this.regionParticipants = regionParticipants;
    }

    public static class HourlyProof {

        // 한국 시간 기준 0~23
        private Integer hour;
        private Long proofCount;

        public Integer getHour() {
            return hour;
        }

        public void setHour(Integer hour) {
            this.hour = hour;
        }

        public Long getProofCount() {
            return proofCount;
        }

        public void setProofCount(Long proofCount) {
            this.proofCount = proofCount;
        }
    }

    public static class RegionParticipant {

        private String regionName;
        private Long participantCount;

        public String getRegionName() {
            return regionName;
        }

        public void setRegionName(String regionName) {
            this.regionName = regionName;
        }

        public Long getParticipantCount() {
            return participantCount;
        }

        public void setParticipantCount(Long participantCount) {
            this.participantCount = participantCount;
        }
    }
}