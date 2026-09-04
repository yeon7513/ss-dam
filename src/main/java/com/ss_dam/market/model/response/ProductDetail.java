package com.ss_dam.market.model.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties({"thumbnail"})
public class ProductDetail extends UserProductView {
  private String content; // 본문

  private List<String> imagePaths; // 등록한 이미지의 경로 (화면 렌더링용)

  // GETTER, SETTER
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
