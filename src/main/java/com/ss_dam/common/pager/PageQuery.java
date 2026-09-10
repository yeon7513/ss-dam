package com.ss_dam.common.pager;

// 클라이언트가 서버로 페이지에 대한 요청을 넘길 때
// 쓰이는 파라미터 묶음 DTO
// 즉, page=1&perPage=10&searchCode=4&... 이런식으로
// 들어오는 조회 조건(쿼리스트링)을 담는 그릇의 역할을 한다.
public class PageQuery {
  private int page = 1;
  private int perPage = 10;
  private int perGroup = 5;

  // 검색용 타겟 코드와 키워드
  private int searchCode;
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

  public int getSearchCode() {
    return searchCode;
  }

  public void setSearchCode(int searchCode) {
    this.searchCode = searchCode;
  }

  public String getKeyword() {
    return keyword;
  }

  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }
}
