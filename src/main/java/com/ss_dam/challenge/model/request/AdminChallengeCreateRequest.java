package com.ss_dam.challenge.model.request;

import java.time.LocalDateTime;

//관리자 번호·등록자 ID·진행 상태는 요청 DTO에 넣지 않고 서버에서 설정

public class AdminChallengeCreateRequest {

  private String title;
  private String content;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private String postStatus;
  private Integer pointEarned;
  private String goal;

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
  public String getGoal() {
      return goal;
  }

  public void setGoal(String goal) {
      this.goal = goal;
  }

}
