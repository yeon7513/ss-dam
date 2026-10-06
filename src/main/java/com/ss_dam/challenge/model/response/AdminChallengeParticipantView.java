package com.ss_dam.challenge.model.response;

import java.time.LocalDateTime;

// 관리자 챌린지 참여자 목록 응답
// 참여자 목록은 기존 챌린지 카드의 참여자 수와 맞춰 취소하지 않은 JOINED, COMPLETED 회원을 한 명당 한 줄씩 반환하도록 작성

public class AdminChallengeParticipantView {

    private Long memberCode;
    private String memberId;
    private String status;
    private LocalDateTime joinedAt;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
}