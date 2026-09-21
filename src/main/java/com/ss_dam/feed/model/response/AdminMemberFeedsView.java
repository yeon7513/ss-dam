package com.ss_dam.feed.model.response;

import com.ss_dam.common.pager.PageResult;

public class AdminMemberFeedsView {

    // 해당 회원의 전체 대상 피드 기준 통계
    private Long totalFeedCount; // 총 등록 건수
    private Long totalLikeCount; // 총 좋아요 수
    private Long totalHitCount;  // 총 조회수

    // 현재 페이지의 피드 목록과 페이지 정보
    //UserFeedView를 필드에 담아서 재사용, 상속X
    private PageResult<UserFeedView> feeds;

    public Long getTotalFeedCount() {
        return totalFeedCount;
    }

    public void setTotalFeedCount(Long totalFeedCount) {
        this.totalFeedCount = totalFeedCount;
    }

    public Long getTotalLikeCount() {
        return totalLikeCount;
    }

    public void setTotalLikeCount(Long totalLikeCount) {
        this.totalLikeCount = totalLikeCount;
    }

    public Long getTotalHitCount() {
        return totalHitCount;
    }

    public void setTotalHitCount(Long totalHitCount) {
        this.totalHitCount = totalHitCount;
    }

    public PageResult<UserFeedView> getFeeds() {
        return feeds;
    }

    public void setFeeds(PageResult<UserFeedView> feeds) {
        this.feeds = feeds;
    }
}