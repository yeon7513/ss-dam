package com.ss_dam.common.likes.response;

public class FeedLikeResponse {

    private Long feedCode; //피드번호
    private boolean liked; //현재 로그인한 회원의 좋아요 여부
    private int likeCount; //해당 피드의 좋아요 개수
    
    public Long getFeedCode() {
      return feedCode;
    }
    
    public void setFeedcode(Long feedCode) {
      this.feedCode = feedCode;
    }
    
    public boolean isLiked() {
      return liked;
    }
    public void setLiked(boolean liked){
      this.liked = liked;
    }
    public int getLikeCount() {
      return likeCount;
    }
    public void setLikeCount(int likeCount) {
      this.likeCount = likeCount;
    }
}
