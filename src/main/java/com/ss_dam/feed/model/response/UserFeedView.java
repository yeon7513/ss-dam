package com.ss_dam.feed.model.response;

import com.ss_dam.auth.member.MemberProfile;

import java.util.List;

// 피드 목록 조회용 DTO (일반 사용자 전용)
public class UserFeedView {
  // 기본 정보
  private Long code; // 피드 고유 번호
  private String challengeName;
  private String title; // 제목
  private int hitcount; // 조회수
  private String createdAt; // 작성일
  private String updatedAt; // 수정일 (옵셔널)

  // 피드 작성자 프로필
  private MemberProfile memberProfile;

  // 상호작용 지표
  private int countFeedLike; // 좋아요 수
  private int countFeedComment; // 댓글 수
  private boolean likedYn; // 좋아요 클릭 여부 (로그인한 사용자 전용)

  // 피드 대표 이미지
  private String thumbnail;

  // 해시태그 목록
  private List<String> hashtags;


  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getChallengeName() {
    return challengeName;
  }

  public void setChallengeName(String challengeName) {
    this.challengeName = challengeName;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public int getHitcount() {
    return hitcount;
  }

  public void setHitcount(int hitcount) {
    this.hitcount = hitcount;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public MemberProfile getMemberProfile() {
    return memberProfile;
  }

  public void setMemberProfile(MemberProfile memberProfile) {
    this.memberProfile = memberProfile;
  }

  public int getCountFeedLike() {
    return countFeedLike;
  }

  public void setCountFeedLike(int countFeedLike) {
    this.countFeedLike = countFeedLike;
  }

  public int getCountFeedComment() {
    return countFeedComment;
  }

  public void setCountFeedComment(int countFeedComment) {
    this.countFeedComment = countFeedComment;
  }

  public boolean isLikedYn() {
    return likedYn;
  }

  public void setLikedYn(boolean likedYn) {
    this.likedYn = likedYn;
  }

  public String getThumbnail() {
    return thumbnail;
  }

  public void setThumbnail(String thumbnail) {
    this.thumbnail = thumbnail;
  }

  public List<String> getHashtags() {
    return hashtags;
  }

  public void setHashtags(List<String> hashtags) {
    this.hashtags = hashtags;
  }
}
