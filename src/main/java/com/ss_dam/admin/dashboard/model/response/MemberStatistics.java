package com.ss_dam.admin.dashboard.model.response;

// 월별 신규 회원 수를 담는 통계 DTO

//한 객체가 한 달의 데이터
//그래프는 List<MemberStatistics>로 반환
//두 기간을 비교하려면, 두 기간의 데이터 각각 조회하거나 묶는 응답 추가

public class MemberStatistics { 

    private String yearMonth; // 집계 연월 (예: "2026-09")
    private long newMemberCount; // 해당 연월에 가입한 신규 회원 수

    //GETTER & SETTER

    public String getYearMonth() {
      return yearMonth;
    }
    public void setYearMonth(String yearMonth) {
      this.yearMonth = yearMonth;
    }
    public long getNewMemberCount() {
      return newMemberCount;
    }
    public void setNewMemberCount(long newMemberCount) {
      this.newMemberCount = newMemberCount;
    }
}