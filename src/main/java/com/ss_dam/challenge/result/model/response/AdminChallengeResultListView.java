package com.ss_dam.challenge.result.model.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// 종료 챌린지 데이터 분석 - 목록 카드

public class AdminChallengeResultListView {

    private Long code;
    private String title;
    private String content;
    private String thumbnail;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;

    private String adminId;
    private String adminRole;

    private Long participantCount;
    private BigDecimal averageAchievementRate;
    private Boolean rewardPaid;

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getAdminRole() {
        return adminRole;
    }

    public void setAdminRole(String adminRole) {
        this.adminRole = adminRole;
    }

    public Long getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(Long participantCount) {
        this.participantCount = participantCount;
    }

    public BigDecimal getAverageAchievementRate() {
        return averageAchievementRate;
    }

    public void setAverageAchievementRate(BigDecimal averageAchievementRate) {
        this.averageAchievementRate = averageAchievementRate;
    }

    public Boolean getRewardPaid() {
        return rewardPaid;
    }

    public void setRewardPaid(Boolean rewardPaid) {
        this.rewardPaid = rewardPaid;
    }
}