package com.ss_dam.market.model.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ProductUpdate {
  private Long code; // 수정할 게시글의 PK
  private Long cateCode; // 카테고리 고유 번호
  private Long memCode; // 게시글을 수정한 사용자의 PK
  private String title; // 제목
  private String content; // 내용
  private int price; // 가격
  private String updatedBy; // 수정한 사용자 아이디 (게시글 작성자 또는 관리자)
  private String updatedAt; // 수정일
  private boolean deleteYn; // 삭제 여부


  // 이 부분은 공통 DTO로 만들고 상속받으면 될 듯?
  // -> 피드, 마켓 등 이미지가 들어가는 곳이면 모두 쓰일 것 같음.
  // 수정 시 새로 등록할 이미지 리스트 & 순서 배열
  private List<MultipartFile> images;
  private List<Integer> newImageOrders;

  // 기존 이미지 경로 문자열 & 순서 배열
  private List<String> imagePaths;

  public List<Integer> getNewImageOrders() {
    return newImageOrders;
  }

  public void setNewImageOrders(List<Integer> newImageOrders) {
    this.newImageOrders = newImageOrders;
  }

  public List<String> getImagePaths() {
    return imagePaths;
  }

  public void setImagePaths(List<String> imagePaths) {
    this.imagePaths = imagePaths;
  }

  public List<Integer> getOldImageOrders() {
    return oldImageOrders;
  }

  public void setOldImageOrders(List<Integer> oldImageOrders) {
    this.oldImageOrders = oldImageOrders;
  }

  private List<Integer> oldImageOrders;

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

  public Long getMemCode() {
    return memCode;
  }

  public void setMemCode(Long memCode) {
    this.memCode = memCode;
  }
}
