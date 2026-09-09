package com.ss_dam.admin.dashboard.model.response;

// 챌린지별 인기 순위 정보를 담는 DTO

public class ChallengeRanking { 

    private int rank; // 참여자 수 기준 인기 순위
    private int challengeCode; // 챌린지 고유 번호
    private String title; // 챌린지 제목
    private long participantCount; // 해당 챌린지에 참여한 회원 수
    
    //GETTER & SETTER
    
    public int getRank() {
      return rank;
    }
    public void setRank(int rank) {
      this.rank = rank;
    }
    public int getChallengeCode() {
      return challengeCode;
    }
    public void setChallengeCode(int challengeCode) {
      this.challengeCode = challengeCode;
    }
    public String getTitle() {
      return title;
    }
    public void setTitle(String title) {
      this.title = title;
    }
    public long getParticipantCount() {
      return participantCount;
    }
    public void setParticipantCount(long participantCount) {
      this.participantCount = participantCount;
    }


}