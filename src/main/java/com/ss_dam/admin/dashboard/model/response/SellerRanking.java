package com.ss_dam.admin.dashboard.model.response;

import com.ss_dam.auth.member.MemberProfile;

// 거래 완료 금액 기준 우수 판매자 순위 정보를 담는 DTO
//판매자 프로필, 거래 실적, 판매 순위

public class SellerRanking { 

    private int rank; // 조회 기간의 판매 순위
    private MemberProfile memberProfile; // 판매자의 회원 번호, 아이디, 프로필 이미지 등
    private long completedTradeCount; // 조회 기간에 완료한 거래 건수
    private long totalSalesAmount; // 조회 기간에 완료한 거래 금액의 합계 (원)
    private Double salesChangeRate; // 이전 기간 대비 거래 금액 증감률 (20.0 = 20% 증가, 이전 금액이 0이면 null)
    
    //GETTER & SETTER
    
    public int getRank() {
      return rank;
    }
    public void setRank(int rank) {
      this.rank = rank;
    }
    public MemberProfile getMemberProfile() {
      return memberProfile;
    }
    public void setMemberProfile(MemberProfile memberProfile) {
      this.memberProfile = memberProfile;
    }
    public long getCompletedTradeCount() {
      return completedTradeCount;
    }
    public void setCompletedTradeCount(long completedTradeCount) {
      this.completedTradeCount = completedTradeCount;
    }
    public long getTotalSalesAmount() {
      return totalSalesAmount;
    }
    public void setTotalSalesAmount(long totalSalesAmount) {
      this.totalSalesAmount = totalSalesAmount;
    }
    public Double getSalesChangeRate() {
      return salesChangeRate;
    }
    public void setSalesChangeRate(Double salesChangeRate) {
      this.salesChangeRate = salesChangeRate;
    }

  
  }