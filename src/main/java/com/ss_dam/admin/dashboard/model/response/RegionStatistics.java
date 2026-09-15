package com.ss_dam.admin.dashboard.model.response;

// 지역별 챌린지 참여 건수와 비율을 담는 통계 DTO

public class RegionStatistics { 

    private String regionName; // 지역명 (예: "서울")
    private long participationCount; // 해당 지역의 챌린지 참여 건수
    private Double participationRate; // 지역 참여 비율 (해당 지역 참여 건수 / 전체 참여 건수 × 100, 전체가 0이면 null)
    
    //GETTER & SETTER
    
    public String getRegionName() {
      return regionName;
    }
    public void setRegionName(String regionName) {
      this.regionName = regionName;
    }
    public long getParticipationCount() {
      return participationCount;
    }
    public void setParticipationCount(long participationCount) {
      this.participationCount = participationCount;
    }
    public Double getParticipationRate() {
      return participationRate;
    }
    public void setParticipationRate(Double participationRate) {
      this.participationRate = participationRate;
    }



  }
