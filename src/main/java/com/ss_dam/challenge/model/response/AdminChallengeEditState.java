package com.ss_dam.challenge.model.response;

import java.time.LocalDateTime;

// 수정 전 DB 상태 검사. 날짜를 LocalDateTime으로 받아 비교

public class AdminChallengeEditState {

    private Long code;
    private String goal;
    private Integer pointEarned;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String progressStatus;

    private Integer maxParticipants;


    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public Integer getPointEarned() {
        return pointEarned;
    }

    public void setPointEarned(Integer pointEarned) {
        this.pointEarned = pointEarned;
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

    public String getProgressStatus() {
        return progressStatus;
    }

    public void setProgressStatus(String progressStatus) {
        this.progressStatus = progressStatus;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }
}