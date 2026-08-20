package com.ss_dam.common.category.model;

// 이 DTO는 일반 사용자용 & 읽기 전용
// 즉, 글쓰기 부분에서 <select> 태그에 사용할 데이터들
// 피드 등록, 마켓 물품 등록 등에서 사용함.


import com.fasterxml.jackson.annotation.JsonInclude;

// 단, 마켓 물품 등록시 대분류&소분류로 나눠져 있음.
// 이 경우에는 대분류 코드가 필요하고, 피드는 단일 뎁스기 때문에 필요하지 않음.
// DTO 클래스 상단에 @JsonInclude(JsonInclude.Include.NON_NULL)을 선언하면
// 해당 객체는 null인 필드를 제외하고 JSON을 생성한다고 함.
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Category {
  private Long code; // 카테고리 고유 번호
  private String name; // 카테고리명

  // 대분류용 필드 (현재는 마켓에서만 사용)
  private Long mainCategoryCode; // 메인 카테고리 코드
  private String mainCategoryName; // 메인 카테고리명

  // getter, setter
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getMainCategoryCode() {
    return mainCategoryCode;
  }

  public void setMainCategoryCode(Long mainCategoryCode) {
    this.mainCategoryCode = mainCategoryCode;
  }

  public String getMainCategoryName() {
    return mainCategoryName;
  }

  public void setMainCategoryName(String mainCategoryName) {
    this.mainCategoryName = mainCategoryName;
  }
}
