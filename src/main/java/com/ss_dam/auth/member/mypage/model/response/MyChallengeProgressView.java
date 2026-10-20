package com.ss_dam.auth.member.mypage.model.response;

public class MyChallengeProgressView {

  private Long chalCode;
  private String title;

  private long proofCount;       // 내가 작성한 인증 피드 수
  private long proofDays;        // 중복 날짜를 제외한 인증 일수
  private long goalDays;         // 목표 인증 일수
  private double achievementRate; // 내 달성률: 0~100

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

  public long getProofCount() {
    return proofCount;
  }

  public void setProofCount(long proofCount) {
    this.proofCount = proofCount;
  }

  public long getProofDays() {
    return proofDays;
  }

  public void setProofDays(long proofDays) {
    this.proofDays = proofDays;
  }

  public long getGoalDays() {
    return goalDays;
  }

  public void setGoalDays(long goalDays) {
    this.goalDays = goalDays;
  }

  public double getAchievementRate() {
    return achievementRate;
  }

  public void setAchievementRate(double achievementRate) {
    this.achievementRate = achievementRate;
  }
}