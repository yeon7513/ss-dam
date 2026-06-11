package com.ss_dam.challenge;

public class Challenge {
  private int code; // 챌린지 번호
  private String empId; // 관리자 아이디
  private String title; // 제목
  private String content; // 내용
  private String startDate; // 시작일
  private String endDate; // 마감일
  private String status; // 운영상태
  private String createdAt; // 등록일
  private String updateAt; // 수정일
  private boolean deleteYn; // 삭제 여부
  private int participantCount; // 참여자 수

  public int getCode() {
    return code;
  }

  public void setCode(int code) {
    this.code = code;
  }

  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
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

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getUpdateAt() {
    return updateAt;
  }

  public void setUpdateAt(String updateAt) {
    this.updateAt = updateAt;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }

  public int getParticipantCount() {
    return participantCount;
  }

  public void setParticipantCount(int participantCount) {
    this.participantCount = participantCount;
  }

}