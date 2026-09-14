package com.ss_dam.common.pager;

// 클라이언트가 서버로 페이지에 대한 요청을 넘길 때
// 쓰이는 파라미터 묶음 DTO
// 즉, page=1&perPage=10&... 이런식으로
// 들어오는 조회 조건(쿼리스트링)을 담는 그릇의 역할을 한다.


// 단, 각 도메인마다 사용하는 검색 필터가 다르기 때문에
// 이 DTO는 공통으로 사용하고, 실제 사용할 검색 필터에서는
// 이 클래스를 상속받아 사용한다.
public class PageQuery {
  private int page = 1;
  private int perPage = 10;
  private int perGroup = 5;

  // 키워드 검색 시 
  private String keyword;

  // 어디서 부터 건너뛸 지
  public int getOffset() {
    return (page - 1) * perPage;
  }


  // GETTER, SETTER
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

  public int getPerGroup() {
    return perGroup;
  }

  public void setPerGroup(int perGroup) {
    this.perGroup = perGroup;
  }

  public String getKeyword() {
    return keyword;
  }

  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }
}
