package com.ss_dam.market.model.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ProductUpdate {
  private Long code; // 수정할 게시글의 PK
  private Long cateCode; // 카테고리 고유 번호
  private String title; // 제목
  private String content; // 내용
  private int price; // 가격
  private String updatedBy; // 수정한 사용자 아이디 (게시글 작성자 또는 관리자)
  private String updatedAt; // 수정일
  private boolean deleteYn; // 삭제 여부

  // 이미지
  private List<MultipartFile> images;

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getCateCode() {
    return cateCode;
  }

  public void setCateCode(Long cateCode) {
    this.cateCode = cateCode;
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

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }

  public String getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(String updatedBy) {
    this.updatedBy = updatedBy;
  }

  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }

  public List<MultipartFile> getImages() {
    return images;
  }

  public void setImages(List<MultipartFile> images) {
    this.images = images;
  }
}
