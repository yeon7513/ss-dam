package com.ss_dam.global.pager;

public class Pager {
  private float totalCount; // 전체 개수
  private int page = 1; // 현재 보고있는 페이지
  private int perPage = 10; // 한번에 보여질 개수
  
  private int search; // 검색 기준
  private String keyword; // 검색 키워드
  
  // 마지막 위치 이동 메소드
  public int getToalPager() {
    return (int) Math.ceil(totalCount / perPage);
  }

  public float getTotalCount() {
    return totalCount;
  }

  public void setTotalCount(float totalCount) {
    this.totalCount = totalCount;
  }

  public int getPage() {
    return page;
  }

  public void setPage(int page) {
    this.page = page;
  }

  public int getPerPage() {
    return perPage;
  }

  public void setPerPage(int perPage) {
    this.perPage = perPage;
  }

  public int getSearch() {
    return search;
  }

  public void setSearch(int search) {
    this.search = search;
  }

  public String getKeyword() {
    return keyword;
  }

  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }
  
}
