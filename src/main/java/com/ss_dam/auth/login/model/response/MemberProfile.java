package com.ss_dam.auth.login.model.response;

import com.ss_dam.auth.login.enums.AuthRole;

// 프론트엔드에서 전역으로 관리할 회원 프로필 정보
public class MemberProfile implements AuthProfile {
  private Long code;
  private String id;
  private AuthRole role;
  private String name;
  private int rating;

  private String profileImage;

  @Override
  public Long getCode() {
    return code;
  }

  @Override
  public String getId() {
    return id;
  }

  @Override
  public AuthRole getRole() {
    return role;
  }

  @Override
  public String getName() {
    return name;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public String getProfileImage() {
    return profileImage;
  }

  public void setProfileImage(String profileImage) {
    this.profileImage = profileImage;
  }
}
