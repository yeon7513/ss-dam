package com.ss_dam.challenge.model.response.analysis_response;

import java.time.LocalDateTime;

// 종료 챌린지 데이터 분석 - 상세 상단 정보

public class AdminChallengeAnalysisDetailView {

    private Long code;
    private String title;
    private String content;
    private String thumbnail;
    private String categoryName;
    private String goal;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;

    private String adminId;
    private String adminRole;
    private String progressStatus;

    // 1인당 설정된 보상
    private Integer pointEarned;

    // null이면 참여 정원 제한 없음
    private Integer maxParticipants;

    // 실제 지급 내역의 합계
    private Long totalPaidPoints;
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

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
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

    public String getProgressStatus() {
        return progressStatus;
    }

    public void setProgressStatus(String progressStatus) {
        this.progressStatus = progressStatus;
    }

    public Integer getPointEarned() {
        return pointEarned;
    }

    public void setPointEarned(Integer pointEarned) {
        this.pointEarned = pointEarned;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public Long getTotalPaidPoints() {
        return totalPaidPoints;
    }

    public void setTotalPaidPoints(Long totalPaidPoints) {
        this.totalPaidPoints = totalPaidPoints;
    }

    public Boolean getRewardPaid() {
        return rewardPaid;
    }

    public void setRewardPaid(Boolean rewardPaid) {
        this.rewardPaid = rewardPaid;
    }
}