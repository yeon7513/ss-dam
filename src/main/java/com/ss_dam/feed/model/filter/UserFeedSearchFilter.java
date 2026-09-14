package com.ss_dam.feed.model.filter;

import com.ss_dam.common.pager.PageQuery;

// 일반 사용자 전용 검색 필터 DTO
public class UserFeedSearchFilter extends PageQuery {
  // 탭 메뉴
  private String sortTarget; // 정렬 기준 (최신순, 인기순)

  // 키워드 검색 시 적용할 챌린지 코드
  private Long chalCode;

  // 해시태그별
  private String tagName;

  // 로그인한 회원일 경우 (사이드메뉴)
  private Boolean myFeedsOnly; // 내가 작성한 피드만
  private Boolean myLikesOnly; // 내가 '좋아요'한 피드만

  public String getSortTarget() {
    return sortTarget;
  }

  public void setSortTarget(String sortTarget) {
    this.sortTarget = sortTarget;
  }

  public Long getChalCode() {
    return chalCode;
  }

  public void setChalCode(Long chalCode) {
    this.chalCode = chalCode;
  }

  public String getTagName() {
    return tagName;
  }

  public void setTagName(String tagName) {
    this.tagName = tagName;
  }

  public Boolean getMyFeedsOnly() {
    return myFeedsOnly;
  }

  public void setMyFeedsOnly(Boolean myFeedsOnly) {
    this.myFeedsOnly = myFeedsOnly;
  }

  public Boolean getMyLikesOnly() {
    return myLikesOnly;
  }

  public void setMyLikesOnly(Boolean myLikesOnly) {
    this.myLikesOnly = myLikesOnly;
  }

}
