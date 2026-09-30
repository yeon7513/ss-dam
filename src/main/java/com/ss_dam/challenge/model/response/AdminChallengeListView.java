package com.ss_dam.challenge.model.response;

import java.math.BigDecimal;

public class AdminChallengeListView {

  private Long code;
  private String title;
  private String content;
  private String startDate;
  private String endDate;
  private String progressStatus;
  private String postStatus;
  private String createdAt;
  private Long participantCount;

  private String thumbnail;
  private String adminId;
  private String adminRole;
  private BigDecimal achievementRate;

  private Integer maxParticipants;

  //Getter & Setter

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
  public String getStartDate() {
    return startDate;
  }
  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }
  public String getEndDate() {
    return endDate;
  }
  public void setEndDate(String endDate) {
    this.endDate = endDate;
  }
  public String getProgressStatus() {
    return progressStatus;
  }
  public void setProgressStatus(String progressStatus) {
    this.progressStatus = progressStatus;
  }
  public String getPostStatus() {
    return postStatus;
  }
  public void setPostStatus(String postStatus) {
    this.postStatus = postStatus;
  }
  public String getCreatedAt() {
    return createdAt;
  }
  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }
  public Long getParticipantCount() {
    return participantCount;
  }
  public void setParticipantCount(Long participantCount) {
    this.participantCount = participantCount;
  }

  public String getThumbnail() {
      return thumbnail;
  }

  public void setThumbnail(String thumbnail) {
      this.thumbnail = thumbnail;
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

  public BigDecimal getAchievementRate() {
      return achievementRate;
  }

  public void setAchievementRate(BigDecimal achievementRate) {
      this.achievementRate = achievementRate;
  }

  public Integer getMaxParticipants() {
      return maxParticipants;
  }

  public void setMaxParticipants(Integer maxParticipants) {
      this.maxParticipants = maxParticipants;
  }
  
}
