package com.ss_dam.feed.model.response;

import java.util.List;

// 수정용 에디터 페이지에서 불러오기 위해 사용할 DTO
public class FeedEditView {
  private Long code; // PK
  private Long chalCode; // 챌린지 PK
  private String title; // 제목
  private String content; // 내용

  private List<String> hashtags; // 등록된 해시태그명
  private List<String> imagePaths; // 등록된 이미지 경로

  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getChalCode() {
    return chalCode;
  }

  public void setChalCode(Long chalCode) {
    this.chalCode = chalCode;
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

  public List<String> getHashtags() {
    return hashtags;
  }

  public void setHashtags(List<String> hashtags) {
    this.hashtags = hashtags;
  }

  public List<String> getImagePaths() {
    return imagePaths;
  }

  public void setImagePaths(List<String> imagePaths) {
    this.imagePaths = imagePaths;
  }
}
