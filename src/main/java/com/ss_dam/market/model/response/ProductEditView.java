package com.ss_dam.market.model.response;

import java.util.List;

public class ProductEditView {
  private Long code;
  private String title;
  private String content;
  private int price;

  // 상위 & 하위 카테고리명
  // 26.09.03
  // -> 지금 생각해보니 카테고리 관련해서 이미 엔드포인트를 만들어
  // 따로 렌더링을 하고있는데, 이 부분이 필요할까? 의문이 듦.
  private Long mainCategoryName;
  private Long subCategoryName;

  // 이미지 리스트
  private List<String> imagePaths;

  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Long getMainCategoryName() {
    return mainCategoryName;
  }

  public void setMainCategoryName(Long mainCategoryName) {
    this.mainCategoryName = mainCategoryName;
  }

  public Long getSubCategoryName() {
    return subCategoryName;
  }

  public void setSubCategoryName(Long subCategoryName) {
    this.subCategoryName = subCategoryName;
  }

  public List<String> getImagePaths() {
    return imagePaths;
  }

  public void setImagePaths(List<String> imagePaths) {
    this.imagePaths = imagePaths;
  }

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }
}
