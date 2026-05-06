package com.ss_dam.feed;

import java.util.List;
import com.ss_dam.global.image.Images;

public class Feed {
  private Long code;
  private Long chalCode;
  private String memberId;
  private String title;
  private String text;
  private int hitcount;
  private String status;
  private String createdAt;
  private String updatedAt;

  // 작성자 정보
  private String profileImg;
  private int ranking;

  // 챌린지 정보
  private String chalTitle;

  // 좋아요 & 댓글 개수
  private int countComment;
  private int countLike;

  private List<Images> images;
  private List<FeedHashtag> hashtags;

  public String getProfileImg() {
    return profileImg;
  }

  public void setProfileImg(String profileImg) {
    this.profileImg = profileImg;
  }

  public int getRanking() {
    return ranking;
  }

  public void setRanking(int ranking) {
    this.ranking = ranking;
  }

  public int getCountComment() {
    return countComment;
  }

  public void setCountComment(int countComment) {
    this.countComment = countComment;
  }

  public int getCountLike() {
    return countLike;
  }

  public void setCountLike(int countLike) {
    this.countLike = countLike;
  }

  public List<Images> getImages() {
    return images;
  }

  public void setImages(List<Images> images) {
    this.images = images;
  }

  public List<FeedHashtag> getHashtags() {
    return hashtags;
  }

  public void setHashtags(List<FeedHashtag> hashtags) {
    this.hashtags = hashtags;
  }

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

  public String getMemberId() {
    return memberId;
  }

  public void setMemberId(String memberId) {
    this.memberId = memberId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public int getHitcount() {
    return hitcount;
  }

  public void setHitcount(int hitcount) {
    this.hitcount = hitcount;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public String getChalTitle() {
    return chalTitle;
  }

  public void setChalTitle(String chalTitle) {
    this.chalTitle = chalTitle;
  }

}
