package com.ss_dam.comment.model.response;

import com.ss_dam.auth.member.MemberProfile;

// 댓글 조회용 DTO (일반 사용자용)
public class UserCommentView {
  private Long code; // 댓글 고유 번호
  private String content; // 댓글 내용
  private String createdAt; // 댓글 등록일
  private String updatedAt; // 댓글 수정일

  // 댓글 작성자 프로필
  private MemberProfile memberProfile;

  // 댓글 좋아요
  private int countCommentLike; // 좋아요 수
  private boolean likedYn; // 좋아요 클릭 여부 (로그인한 사용자 전용)


  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
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

  public MemberProfile getMemberProfile() {
    return memberProfile;
  }

  public void setMemberProfile(MemberProfile memberProfile) {
    this.memberProfile = memberProfile;
  }

  public int getCountCommentLike() {
    return countCommentLike;
  }

  public void setCountCommentLike(int countCommentLike) {
    this.countCommentLike = countCommentLike;
  }

  public boolean isLikedYn() {
    return likedYn;
  }

  public void setLikedYn(boolean likedYn) {
    this.likedYn = likedYn;
  }
}
