package com.ss_dam.common.pager;

import java.util.List;

// 클라이언트가 요청한 페이지의 정보를 조회 후,
// 클라이언트에 응답하기 위한 클래스
public class PageResult<T> {
  private final Pager pager;
  private final List<T> content;

  // 생성자
  public PageResult(List<T> content, Pager pager) {
    this.content = content;
    this.pager = pager;
  }

  // 외부에서 직접 new 키워드 없이 객체를 생성하기 위해
  // static으로 만들어 어디서든 호출할 수 있게 선언
  public static <T> PageResult<T> of(List<T> content, Pager pager) {
    return new PageResult<>(content, pager);
  }

  public static <T> PageResult<T> of(List<T> content, PageQuery pageQuery, float total) {
    return new PageResult<>(content, new Pager(pageQuery, total));
  }
  

  // GETTER
  public List<T> getContent() {
    return content;
  }

  public Pager getPager() {
    return pager;
  }
}
