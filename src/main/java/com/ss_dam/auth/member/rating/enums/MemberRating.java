package com.ss_dam.auth.member.rating.enums;

public enum MemberRating {

  SEED(0, "씨앗", 0),
  SPROUT(1, "새싹", 300),
  STEM(2, "줄기", 3000),
  BRANCH(3, "가지", 15000),
  TREE(4, "나무", 50000);

  private final int rating;
  private final String label;
  private final long minScore;

  MemberRating(int rating, String label, long minScore) {
    this.rating = rating;
    this.label = label;
    this.minScore = minScore;
  }

  public int getRating() {
    return rating;
  }

  public String getLabel() {
    return label;
  }

  public long getMinScore() {
    return minScore;
  }

  // 누적 점수에 해당하는 등급 계산
  public static MemberRating fromScore(long score) {
    if (score < 0) {
      throw new IllegalArgumentException("등급 점수는 음수일 수 없습니다.");
    }

    MemberRating result = SEED;

    for (MemberRating memberRating : values()) {
      if (score >= memberRating.getMinScore()) {
        result = memberRating;
      }
    }

    return result;
  }


  // 다음 등급을 찾는 메서드
  public MemberRating getNextRating() {
  for (MemberRating next : values()) {
    if (next.getRating() == this.rating + 1) {
      return next;
    }
  }

  // 나무 등급은 다음 등급이 없음
  return null;
}
}