package com.ss_dam.challenge.model.response;

import java.math.BigDecimal;

// 관리자 챌린지 참여 순위 응답

/** AdminChallengeRankingView **
 * 적용 기준
- 인증글 점수: 조회수 + 좋아요 수 × 10
- 하루 대표 글: 한국 시간 기준 작성일별 최고 점수 글 1개
- 회원 점수: 하루 대표 글들의 점수 합계
- 동점: 개인 달성률 내림차순 → 같으면 공동 순위
- 표시 순서: 공동 순위 안에서는 회원 번호 오름차순
개인 달성률은 앞선 예시와 같이 계산합니다.
인증한 날짜 수 ÷ 전체 챌린지 진행 날짜 수 × 100
하루 한 번 인증하는 챌린지라는 전제입니다. 
조회수·좋아요는 조회 시점의 누적값을 사용합니다.
 */

public class AdminChallengeRankingView {

    private Long rank;

    private Long memberCode;
    private String memberId;
    private String profileImage;

    // 조건에 맞는 전체 인증글 수
    private Long proofCount;

    // 서로 다른 인증 날짜 수
    private Long proofDays;

    // 하루 대표 글들의 조회수 합계
    private Long scoredViewCount;

    // 하루 대표 글들의 좋아요 수 합계
    private Long scoredLikeCount;

    // scoredViewCount + scoredLikeCount * 10
    private Long totalScore;

    private BigDecimal achievementRate;

    public Long getRank() {
        return rank;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }

    public Long getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(Long memberCode) {
        this.memberCode = memberCode;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Long getProofCount() {
        return proofCount;
    }

    public void setProofCount(Long proofCount) {
        this.proofCount = proofCount;
    }

    public Long getProofDays() {
        return proofDays;
    }

    public void setProofDays(Long proofDays) {
        this.proofDays = proofDays;
    }

    public Long getScoredViewCount() {
        return scoredViewCount;
    }

    public void setScoredViewCount(Long scoredViewCount) {
        this.scoredViewCount = scoredViewCount;
    }

    public Long getScoredLikeCount() {
        return scoredLikeCount;
    }

    public void setScoredLikeCount(Long scoredLikeCount) {
        this.scoredLikeCount = scoredLikeCount;
    }

    public Long getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Long totalScore) {
        this.totalScore = totalScore;
    }

    public BigDecimal getAchievementRate() {
        return achievementRate;
    }

    public void setAchievementRate(BigDecimal achievementRate) {
        this.achievementRate = achievementRate;
    }
}