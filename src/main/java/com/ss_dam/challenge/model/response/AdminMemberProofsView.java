package com.ss_dam.challenge.model.response;

import com.ss_dam.common.pager.PageResult;
import com.ss_dam.feed.model.response.UserFeedView;

public class AdminMemberProofsView {

    private Long totalProofCount;       // 전체 인증글
    private Long proofChallengeCount;   // 인증한 챌린지 수
    private Long recentProofCount;      // 최근 30일 인증글

    // 기존 피드 카드 DTO와 페이지 DTO 재사용
    private PageResult<UserFeedView> proofs;

    public Long getTotalProofCount() {
        return totalProofCount;
    }

    public void setTotalProofCount(Long totalProofCount) {
        this.totalProofCount = totalProofCount;
    }

    public Long getProofChallengeCount() {
        return proofChallengeCount;
    }

    public void setProofChallengeCount(Long proofChallengeCount) {
        this.proofChallengeCount = proofChallengeCount;
    }

    public Long getRecentProofCount() {
        return recentProofCount;
    }

    public void setRecentProofCount(Long recentProofCount) {
        this.recentProofCount = recentProofCount;
    }

    public PageResult<UserFeedView> getProofs() {
        return proofs;
    }

    public void setProofs(PageResult<UserFeedView> proofs) {
        this.proofs = proofs;
    }
}