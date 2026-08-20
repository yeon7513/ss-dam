package com.ss_dam.market.model.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ProductCreate {
  private Long code; // 등록 후 새로 받을 PK
  private Long cateCode; // 카테고리 고유 번호
  private Long memCode; // 작성자 고유 번호
  private String title; // 제목
  private String content; // 내용
  private int price; // 가격

  // 등록한 이미지
  private List<MultipartFile> images;

  // GETTER, SETTER
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

  public Long getMemCode() {
    return memCode;
  }

  public void setMemCode(Long memCode) {
    this.memCode = memCode;
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

  public List<MultipartFile> getImages() {
    return images;
  }

  public void setImages(List<MultipartFile> images) {
    this.images = images;
  }
}
