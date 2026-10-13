package com.ss_dam.challenge.result.model.internal;

import java.time.LocalDateTime;

// DB에서 결과 한 행을 받아옴
// 프론트에 직접 반환하는 DTO가 아니라, JSON을 변환하기 전 DB데이터를 담는 내부 DTO

public class ChallengeResultRow {

    private Integer code;
    private Integer challengeCode;

    // 최종 요약 통계
    private Integer proofCount;
    private Integer participantCount;
    private Double averageLikeCount;
    private Double averageAchievementRate;
    private Double successRate;

    // DB의 JSON 컬럼을 문자열로 조회
    private String memberResultsJson;
    private String hourlyResultsJson;
    private String regionResultsJson;

    private LocalDateTime endedAt;
    private LocalDateTime savedAt;
    private String status;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getChallengeCode() {
        return challengeCode;
    }

    public void setChallengeCode(Integer challengeCode) {
        this.challengeCode = challengeCode;
    }

    public Integer getProofCount() {
        return proofCount;
    }

    public void setProofCount(Integer proofCount) {
        this.proofCount = proofCount;
    }

    public Integer getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(Integer participantCount) {
        this.participantCount = participantCount;
    }

    public Double getAverageLikeCount() {
        return averageLikeCount;
    }

    public void setAverageLikeCount(Double averageLikeCount) {
        this.averageLikeCount = averageLikeCount;
    }

    public Double getAverageAchievementRate() {
        return averageAchievementRate;
    }

    public void setAverageAchievementRate(
            Double averageAchievementRate) {

        this.averageAchievementRate = averageAchievementRate;
    }

    public Double getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(Double successRate) {
        this.successRate = successRate;
    }

    public String getMemberResultsJson() {
        return memberResultsJson;
    }

    public void setMemberResultsJson(String memberResultsJson) {
        this.memberResultsJson = memberResultsJson;
    }

    public String getHourlyResultsJson() {
        return hourlyResultsJson;
    }

    public void setHourlyResultsJson(String hourlyResultsJson) {
        this.hourlyResultsJson = hourlyResultsJson;
    }

    public String getRegionResultsJson() {
        return regionResultsJson;
    }

    public void setRegionResultsJson(String regionResultsJson) {
        this.regionResultsJson = regionResultsJson;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public LocalDateTime getSavedAt() {
        return savedAt;
    }

    public void setSavedAt(LocalDateTime savedAt) {
        this.savedAt = savedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}