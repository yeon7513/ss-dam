package com.ss_dam.challenge.model.response;

import java.math.BigDecimal;

public class AdminChallengeDetailView {

  // 챌린지 상세 조회 응답
  // 화면에 반환할 상세 정보. 관리자 정보·이미지·달성률 등 포함
  // 단건 조회이므로 별도의 요청 DTO나 PageResult는 필요 X

  private Long code;
  private String title;
  private String content;
  private String startDate;
  private String endDate;
  private String progressStatus;
  private String postStatus;
  private String createdAt;
  private String updatedAt;

  private Long adminCode;
  private String adminId;
  private String adminRole;

  private Long participantCount;

  private String thumbnail; // 챌린지 대표 이미지 경로
  private BigDecimal achievementRate; // 달성률(%)

  private String goal;
  private Integer pointEarned;


private Integer maxParticipants;   // 참여 정원: null이면 제한 없음
private boolean deleteYn; // 삭제 여부: true이면 삭제된 챌린지

  // Getter & Setter

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

  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public Long getAdminCode() {
    return adminCode;
  }

  public void setAdminCode(Long adminCode) {
    this.adminCode = adminCode;
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

  public String getThumbnail() {
    return thumbnail;
  }

  public void setThumbnail(String thumbnail) {
    this.thumbnail = thumbnail;
  }

  public BigDecimal getAchievementRate() {
    return achievementRate;
  }

  public void setAchievementRate(BigDecimal achievementRate) {
    this.achievementRate = achievementRate;
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

  public Integer getMaxParticipants() {
      return maxParticipants;
  }

  public void setMaxParticipants(Integer maxParticipants) {
      this.maxParticipants = maxParticipants;
  }

  public boolean isDeleteYn() {
      return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
      this.deleteYn = deleteYn;
  }
    
}
