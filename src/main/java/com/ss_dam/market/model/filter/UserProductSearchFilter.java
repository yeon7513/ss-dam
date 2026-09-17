package com.ss_dam.market.model.filter;

import com.ss_dam.common.pager.PageQuery;

// 일반 사용자용 거래글 검색 필터 DTO
public class UserProductSearchFilter extends PageQuery {
  private Long categoryCode; // 카테고리 번호
  private String sortTarget; // 정렬 기준 (최신, 랭킹, 낮은가격, 높은가격)
  private String dealStatus; // 판매 상태 (판매중, 판매완료, 판매 중지는 제외)

  // GETTER, SETTER
  public Long getCategoryCode() {
    return categoryCode;
  }

  public void setCategoryCode(Long categoryCode) {
    this.categoryCode = categoryCode;
  }

  public String getSortTarget() {
    return sortTarget;
  }

  public void setSortTarget(String sortTarget) {
    this.sortTarget = sortTarget;
  }

  public String getDealStatus() {
    return dealStatus;
  }

  public void setDealStatus(String dealStatus) {
    this.dealStatus = dealStatus;
  }
}
