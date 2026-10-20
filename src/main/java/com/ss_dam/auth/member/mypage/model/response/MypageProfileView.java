package com.ss_dam.auth.member.mypage.model.response;

// 마이페이지 참여 현황 - 멤버 프로필 부분

public class MypageProfileView {

  private String name;                   // 이름
  private String userId;                 // 아이디
  private String profileImage;           // 프로필 이미지
  private String joinedAt;               // 가입일
  private int rating;                    // 회원 등급
  private int point;                     // 보유 그루
  private long totalEarnedPoint;         // 챌린지 보상 + 판매 수익 누적 적립액
  private Long challengeRanking;         // 챌린지 순위
  private long completedChallengeCount;  // 완료한 챌린지 수

  // 등급 표시
  private String ratingName;       // 현재 등급 이름
  private long ratingScore;        // 누적 등급 점수
  private String nextRatingName;   // 다음 등급 이름
  private long remainingScore;     // 다음 등급까지 남은 점수
  private int ratingProgress;      // 현재 등급 구간 진행률(0~100)
  private boolean maxRating;      // 최고 등급 여부

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getProfileImage() {
    return profileImage;
  }

  public void setProfileImage(String profileImage) {
    this.profileImage = profileImage;
  }

  public String getJoinedAt() {
    return joinedAt;
  }

  public void setJoinedAt(String joinedAt) {
    this.joinedAt = joinedAt;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public int getPoint() {
    return point;
  }

  public void setPoint(int point) {
    this.point = point;
  }

  public long getTotalEarnedPoint() {
    return totalEarnedPoint;
  }

  public void setTotalEarnedPoint(long totalEarnedPoint) {
    this.totalEarnedPoint = totalEarnedPoint;
  }

  public Long getChallengeRanking() {
    return challengeRanking;
  }

  public void setChallengeRanking(Long challengeRanking) {
    this.challengeRanking = challengeRanking;
  }

  public long getCompletedChallengeCount() {
    return completedChallengeCount;
  }

  public void setCompletedChallengeCount(long completedChallengeCount) {
    this.completedChallengeCount = completedChallengeCount;
  }
  // 등급 표시
  public String getRatingName() {
    return ratingName;
  }

  public void setRatingName(String ratingName) {
    this.ratingName = ratingName;
  }

  public long getRatingScore() {
    return ratingScore;
  }

  public void setRatingScore(long ratingScore) {
    this.ratingScore = ratingScore;
  }

  public String getNextRatingName() {
    return nextRatingName;
  }

  public void setNextRatingName(String nextRatingName) {
    this.nextRatingName = nextRatingName;
  }

  public long getRemainingScore() {
    return remainingScore;
  }

  public void setRemainingScore(long remainingScore) {
    this.remainingScore = remainingScore;
  }

  public int getRatingProgress() {
    return ratingProgress;
  }

  public void setRatingProgress(int ratingProgress) {
    this.ratingProgress = ratingProgress;
  }

  public boolean isMaxRating() {
    return maxRating;
  }

  public void setMaxRating(boolean maxRating) {
    this.maxRating = maxRating;
  }
}
