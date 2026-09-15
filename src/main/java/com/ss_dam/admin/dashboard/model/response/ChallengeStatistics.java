package com.ss_dam.admin.dashboard.model.response;

//종료된 챌린지의 참여 건수와 달성률을 담는 통계 DTO
//전체 참여건수, 달성·미달성 수, 달성률

public class ChallengeStatistics { 

    private long totalParticipationCount; // 전체 참여 건수 (같은 회원이 여러 챌린지에 참여하면 각각 집계)
    private long completedParticipationCount; // 목표를 달성한 참여 건수
    private long incompleteParticipationCount; // 목표를 달성하지 못한 참여 건수
    private Double completionRate; // 달성률 (달성 건수 / 전체 참여 건수 × 100, 전체 참여 건수가 0이면 null)
    
    //GETTER & SETTER

    public long getTotalParticipationCount() {
      return totalParticipationCount;
    }
    public void setTotalParticipationCount(long totalParticipationCount) {
      this.totalParticipationCount = totalParticipationCount;
    }
    public long getCompletedParticipationCount() {
      return completedParticipationCount;
    }
    public void setCompletedParticipationCount(long completedParticipationCount) {
      this.completedParticipationCount = completedParticipationCount;
    }
    public long getIncompleteParticipationCount() {
      return incompleteParticipationCount;
    }
    public void setIncompleteParticipationCount(long incompleteParticipationCount) {
      this.incompleteParticipationCount = incompleteParticipationCount;
    }
    public Double getCompletionRate() {
      return completionRate;
    }
    public void setCompletionRate(Double completionRate) {
      this.completionRate = completionRate;
    }

    

  }