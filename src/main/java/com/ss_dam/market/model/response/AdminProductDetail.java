package com.ss_dam.market.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"thumbnail", "pickedYn"})
public class AdminProductDetail extends AdminProductView {

  private String content;
  private List<String> imagePaths;

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public List<String> getImagePaths() {
    return imagePaths;
  }

  public void setImagePaths(List<String> imagePaths) {
    this.imagePaths = imagePaths;
  }
}

//관리자 상세 응답에 다음 정보가 모두 포함됩니다.
//- UserProductView의 상품 기본 정보
//- AdminProductView의 노출 상태, 삭제 여부, 신고 수, 관리자 활동
//- AdminProductDetail의 본문과 전체 이미지 (여기서 추가한 것들)

