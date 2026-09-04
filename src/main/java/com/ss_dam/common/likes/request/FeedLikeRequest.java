package com.ss_dam.common.likes.request;

public class FeedLikeRequest {

    private Long feedCode; // 피드 번호

    private Long memCode; // 회원 번호

    public Long getFeedCode() {
        return feedCode;
    }

    public void setFeedCode(Long feedCode) {
        this.feedCode = feedCode;
    }

    public Long getMemCode() {
        return memCode;
    }

    public void setMemCode(Long memCode) {
        this.memCode = memCode;
    }
}