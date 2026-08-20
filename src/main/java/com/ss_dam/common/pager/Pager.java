package com.ss_dam.common.pager;

import java.util.ArrayList;
import java.util.List;

public class Pager {
  private float total;
  private int page = 1; // 기본 세팅
  private int perPage = 10; // 기본 세팅
  private int perGroup = 5; // 기본 세팅

  // 검색용 키워드
  private String search;
  private String keyword;

  // 쿼리스트링 설정
  public String getQuery() {
    String query = "";
    // 필터가 있을 경우
    if (search != null && !search.isEmpty() && keyword != null && !keyword.isEmpty()) {
      query = "&search=" + search + "&keyword=" + keyword;
    }
    // 필터가 없을 경우
    if ((search == null || search.isEmpty()) && keyword != null && !keyword.isEmpty()) {
      query = "&keyword=" + keyword;
    }
    return query;
  }

  // 이전 & 다음 이동
  public int getPrev() {
    int prev = ((page - 1) / perGroup - 1) * perGroup + 1;

    return page <= perGroup ? 1 : prev;
  }

  public int getNext() {
    int next = ((page - 1) / perGroup + 1) * perGroup + 1;
    int last = getLast();

    return next < last ? next : last;
  }

  public List<Integer> getList() {
    ArrayList<Integer> list = new ArrayList<Integer>();

    // 내가 속한 그룹의 첫번째 페이지는 어떻게 구할까?
    // -1이면 이전, +1이면 다음
    // 0은? 현재 그룹
    // page - 1을 하는건 나누어 떨어지지 않게 하기위해 옆으로 밀어둔다.
    // perGroup은 보여질 그룹의 각 요소 개수
    // perGroup을 곱해주면 원래의 수를 복구한다.
    // 여기다 처음에 밀어놨던 값을 되살리기 위해 +1을 해줌.
    // 즉, 해당 그룹의 첫번째 값으로 이동됨
    int startPage = ((page - 1) / perGroup) * perGroup + 1;
    int last = getLast();

    // 반복문으로 그룹에 속한 숫자들을 list에 담는다.
    // startPage + perGroup ==> 그룹의 첫번째 페이지 + 그룹에 속한 개수
    // i < (startPage + perGroup) 니까 마지막 값은 포함 X
    for (int i = startPage; i < (startPage + perGroup) && i <= last; i++) {
      list.add(i);
    }

    // 검색된 결과가 없을 경우
    if (list.isEmpty()) {
      list.add(1);
    }

    return list;
  }

  // 마지막 페이지 이동
  public int getLast() {
    return (int) Math.ceil(total / perPage);
  }

  // 어디서 부터 건너뛸 지
  public int getOffset() {
    return (page - 1) * perPage;
  }

  // getter & setter
  public float getTotal() {
    return total;
  }

  public void setTotal(float total) {
    this.total = total;
  }

  public int getPage() {
    return page;
  }

  public void setPage(int page) {
    if (page > 0) {
      this.page = page;
    }
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

  public String getSearch() {
    return search;
  }

  public void setSearch(String search) {
    this.search = search;
  }

}
