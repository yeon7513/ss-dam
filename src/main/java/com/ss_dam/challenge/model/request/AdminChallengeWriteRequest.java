package com.ss_dam.challenge.model.request;

import java.time.LocalDateTime;

// 챌린지 등록·수정에서 함께 사용하는 입력값
// 필드가 달라질 경우 Createreqest, UpdateRequest DTO 생성하고 상속 받기

public class AdminChallengeWriteRequest {

    private String title;
    private String content;
    private String goal;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private String postStatus;
    private Integer pointEarned;

    // null: 제한 없음, 양수: 최대 참여 인원
    private Integer maxParticipants;


    // Getter & Setter 
    

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

    public String getPostStatus() {
      return postStatus;
    }

    public void setPostStatus(String postStatus) {
      this.postStatus = postStatus;
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



}