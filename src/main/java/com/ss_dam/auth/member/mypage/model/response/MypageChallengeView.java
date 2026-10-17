package com.ss_dam.auth.member.mypage.model.response;

// 마이페이지 - 참여한 챌린지 목록 한 줄
public class MypageChallengeView {

  private Long code;              // 참여 상세 번호 (CHALLENGE_ENTRY.CODE, 테이블 row key용)
  private Long chalCode;          // 챌린지 번호
  private String title;           // 챌린지 제목
  private String startDate;       // 시작일 (yyyy-MM-dd)
  private String endDate;         // 마감일 (yyyy-MM-dd)
  private String progressStatus;  // 챌린지 진행 상태 (WAITING, IN_PROGRESS, ENDED)
  private String entryStatus;     // 내 참여 상태 (JOINED, COMPLETED, CANCELED)
  private String joinedAt;        // 참여일
  private int proofCount;         // 인증(피드) 횟수
  private int pointEarned;        // 완료 시 획득 그루

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getChalCode() {
    return chalCode;
  }

  public void setChalCode(Long chalCode) {
    this.chalCode = chalCode;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
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

  public String getEntryStatus() {
    return entryStatus;
  }

  public void setEntryStatus(String entryStatus) {
    this.entryStatus = entryStatus;
  }

  public String getJoinedAt() {
    return joinedAt;
  }

  public void setJoinedAt(String joinedAt) {
    this.joinedAt = joinedAt;
  }

  public int getProofCount() {
    return proofCount;
  }

  public void setProofCount(int proofCount) {
    this.proofCount = proofCount;
  }

  public int getPointEarned() {
    return pointEarned;
  }

  public void setPointEarned(int pointEarned) {
    this.pointEarned = pointEarned;
  }
}