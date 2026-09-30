package com.ss_dam.challenge.model.response;

import java.time.LocalDateTime;

// 참여·인증 공통 검사 DTO
public class ChallengeWriteState {
  
    private String postStatus;
    private String progressStatus;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean deleteYn;
    private Integer maxParticipants;

    // GETTEr & SETTER

    public String getPostStatus() {
      return postStatus;
    }
    public void setPostStatus(String postStatus) {
      this.postStatus = postStatus;
    }
    public String getProgressStatus() {
      return progressStatus;
    }
    public void setProgressStatus(String progressStatus) {
      this.progressStatus = progressStatus;
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
    public boolean isDeleteYn() {
      return deleteYn;
    }
    public void setDeleteYn(boolean deleteYn) {
      this.deleteYn = deleteYn;
    }
    public Integer getMaxParticipants() {
      return maxParticipants;
    }
    public void setMaxParticipants(Integer maxParticipants) {
      this.maxParticipants = maxParticipants;
    }
  
}
