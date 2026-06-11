package com.ss_dam.feed;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.comment.Comment;
import com.ss_dam.global.image.Images;

public class Feed {
  private Long code; // 피드 번호
  private Long chalCode; // 챌린지 번호
  private Long memCode; // 회원 번호
  private String title; // 제목
  private String content; // 내용
  private int hitcount; // 조회수
  private String status; // 공개 상태
  private String createdAt; // 작성일
  private String updatedAt; // 수정일
  private boolean deleteYn; // 삭제 여부

  // 작성자 프로필 정보
  private MemberProfile memberProfile;

  // 챌린지 정보
  private String chalTitle;

  // 좋아요 개수
  private int countComment;
  private int countFeedLike;

  // 전체 조회용 리스트
  private List<Comment> comments;
  private List<Images> images;
  private List<FeedHashtag> hashtags;

  // 이미지 업로드용 필드 (임시 저장소 같은 느낌)
  private List<MultipartFile> files;

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

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }

  public String getChalTitle() {
    return chalTitle;
  }

  public void setChalTitle(String chalTitle) {
    this.chalTitle = chalTitle;
  }

  public int getCountComment() {
    return countComment;
  }

  public void setCountComment(int countComment) {
    this.countComment = countComment;
  }

  public int getCountFeedLike() {
    return countFeedLike;
  }

  public void setCountFeedLike(int countFeedLike) {
    this.countFeedLike = countFeedLike;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
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

  public MemberProfile getMemberProfile() {
    return memberProfile;
  }

  public void setMemberProfile(MemberProfile memberProfile) {
    this.memberProfile = memberProfile;
  }

  public List<MultipartFile> getFiles() {
    return files;
  }

  public void setFiles(List<MultipartFile> files) {
    this.files = files;
  }
}
