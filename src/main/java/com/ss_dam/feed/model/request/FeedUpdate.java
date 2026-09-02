package com.ss_dam.feed.model.request;

import com.ss_dam.common.enums.PostStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class FeedUpdate {
  private Long code;
  private Long chalCode;
  private Long memCode;
  private String title;
  private String content;
  private PostStatus status;
  private String updatedBy;
  private String updatedAt;
  private boolean deleteYn;

  // 수정 시 새로 등록할 이미지 리스트
  private List<MultipartFile> images;

  // 기존 이미지 경로 유지
  private List<String> imagePaths;

  private List<String> hashtags;

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

  public PostStatus getStatus() {
    return status;
  }

  public void setStatus(PostStatus status) {
    this.status = status;
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

  public List<String> getHashtags() {
    return hashtags;
  }

  public void setHashtags(List<String> hashtags) {
    this.hashtags = hashtags;
  }

  public Long getMemCode() {
    return memCode;
  }

  public void setMemCode(Long memCode) {
    this.memCode = memCode;
  }

  public List<String> getImagePaths() {
    return imagePaths;
  }

  public void setImagePaths(List<String> imagePaths) {
    this.imagePaths = imagePaths;
  }
}
