package com.ss_dam.admin.dashboard.model.response;

//상단 요약 카드
//전체·신규 회원 수, 신규 피드·거래 수, 증감률

public class DashboardSummary {
  private long totalMemberCount; //전체 회원 수 
  private long newMemberCount;   //조회 기간에 가입한 회원 수
  private long newFeedCount;     //조회 기간에 등록된 피드 수
  private long newTradeCount;    //조회 기간에 발생한 거래 수 (등록 건수 인지, 완료 건수 인지 정해야 함)

  private Double totalMemberchangeRate; //전체 회원 수 증감률
  

}
