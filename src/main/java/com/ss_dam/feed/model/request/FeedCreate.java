package com.ss_dam.feed.model.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

// 피드 등록용 DTO
public class FeedCreate {
  private Long chalCode; // 챌린지 고유 번호
  private Long memCode; // 작성자 고유 번호
  private String title; // 피드 제목
  private String content; // 피드 상세 내용

  // 이미지 등록
  private List<MultipartFile> images;

  // GETTER, SETTER
  public Long getChalCode() {
    return chalCode;
  }

  public void setChalCode(Long chalCode) {
    this.chalCode = chalCode;
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

  public List<MultipartFile> getImages() {
    return images;
  }

  public void setImages(List<MultipartFile> images) {
    this.images = images;
  }
}
