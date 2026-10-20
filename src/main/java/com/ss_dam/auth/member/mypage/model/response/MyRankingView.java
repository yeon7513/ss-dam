package com.ss_dam.auth.member.mypage.model.response;

public class MyRankingView {

  private Long code;
  private String name;
  private String profileImage;

  private long ranking;
  private long ratingScore;
  private long completedChallengeCount;

  private String ratingName;
  private boolean mine;

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getProfileImage() {
    return profileImage;
  }

  public void setProfileImage(String profileImage) {
    this.profileImage = profileImage;
  }

  public long getRanking() {
    return ranking;
  }

  public void setRanking(long ranking) {
    this.ranking = ranking;
  }

  public long getRatingScore() {
    return ratingScore;
  }

  public void setRatingScore(long ratingScore) {
    this.ratingScore = ratingScore;
  }

  public long getCompletedChallengeCount() {
    return completedChallengeCount;
  }

  public void setCompletedChallengeCount(long completedChallengeCount) {
    this.completedChallengeCount = completedChallengeCount;
  }

  public String getRatingName() {
    return ratingName;
  }

  public void setRatingName(String ratingName) {
    this.ratingName = ratingName;
  }

  public boolean isMine() {
    return mine;
  }

  public void setMine(boolean mine) {
    this.mine = mine;
  }
}