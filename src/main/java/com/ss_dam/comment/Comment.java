package com.ss_dam.comment;

import java.util.List;
import com.ss_dam.auth.member.MemberProfile;

public class Comment {
  private Long code;
  private Long feedCode;
  private Long memCode;
  private String content;
  private String status;
  private String createdAt;
  private String updatedAt;

  // 조인용 필드
  private List<MemberProfile> memberProfiles;
  private int countLike;

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getFeedCode() {
    return feedCode;
  }

  public void setFeedCode(Long feedCode) {
    this.feedCode = feedCode;
  }

  public Long getMemCode() {
    return memCode;
  }

  public void setMemCode(Long memCode) {
    this.memCode = memCode;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
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

  public int getCountLike() {
    return countLike;
  }

  public void setCountLike(int countLike) {
    this.countLike = countLike;
  }

  public List<MemberProfile> getMemberProfiles() {
    return memberProfiles;
  }

  public void setMemberProfiles(List<MemberProfile> memberProfiles) {
    this.memberProfiles = memberProfiles;
  }

}
