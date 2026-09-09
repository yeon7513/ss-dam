package com.ss_dam.admin.dashboard.model.response;

//상단 요약 카드
//전체·신규 회원 수, 신규 피드·거래 수, 증감률
// 증감률은 2.5가 2.5%를 의미하도록 함, 이전 기간 값이 0이라 계산할 수 없는 경우에는 null을 사용 -> service에서

public class DashboardSummary {
  private long totalMemberCount; //전체 회원 수 
  private long newMemberCount;   //조회 기간에 가입한 회원 수
  private long newFeedCount;     //조회 기간에 등록된 피드 수
  private long newTradeCount;    //조회 기간에 발생한 거래 수 (등록 건수 인지, 완료 건수 인지 정해야 함)

  private Double totalMemberchangeRate; //전체 회원 수 증감률
  private Double newMemberChangeRate;   //신규 가입자 수 증감률
  private Double newFeedChangeRate;     //신규 피드 수 증감률
  private Double newTradeChangeRate; // 이전 기간 대비 신규 거래 수

  //증감률(%) = (이번 기간 값 - 이전 기간 값) / 이전 기간 값 × 100
  //20.0 -> 20% 증가, 음수면 감소, 0이면 null

  //GETTER & SETTER

  public long getTotalMemberCount() {
    return totalMemberCount;
  }
  public void setTotalMemberCount(long totalMemberCount) {
    this.totalMemberCount = totalMemberCount;
  }
  public long getNewMemberCount() {
    return newMemberCount;
  }
  public void setNewMemberCount(long newMemberCount) {
    this.newMemberCount = newMemberCount;
  }
  public long getNewFeedCount() {
    return newFeedCount;
  }
  public void setNewFeedCount(long newFeedCount) {
    this.newFeedCount = newFeedCount;
  }
  public long getNewTradeCount() {
    return newTradeCount;
  }
  public void setNewTradeCount(long newTradeCount) {
    this.newTradeCount = newTradeCount;
  }
  public Double getTotalMemberchangeRate() {
    return totalMemberchangeRate;
  }
  public void setTotalMemberchangeRate(Double totalMemberchangeRate) {
    this.totalMemberchangeRate = totalMemberchangeRate;
  }
  public Double getNewMemberChangeRate() {
    return newMemberChangeRate;
  }
  public void setNewMemberChangeRate(Double newMemberChangeRate) {
    this.newMemberChangeRate = newMemberChangeRate;
  }
  public Double getNewFeedChangeRate() {
    return newFeedChangeRate;
  }
  public void setNewFeedChangeRate(Double newFeedChangeRate) {
    this.newFeedChangeRate = newFeedChangeRate;
  }
  public Double getNewTradeChangeRate() {
    return newTradeChangeRate;
  }
  public void setNewTradeChageRate(Double newTradeChangeRate) {
    this.newTradeChangeRate = newTradeChangeRate;
  }

  


}
