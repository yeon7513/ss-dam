package com.ss_dam.market.model.response;

import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.market.enums.DealStatus;

// 일반 사용자가 보는 거래글 목록 DTO
public class UserProductView {
  private Long code; // 물품 등록 고유 번호
  private String title; // 제목
  private int price; // 가격
  private int hitcount; // 조회수
  private DealStatus dealStatus; // 판매 상태
  private String createdAt; // 작성일
  private String updatedAt; // 수정일

  // 상위 & 하위 카테고리명
  private String mainCategoryName;
  private String subCategoryName;

  // 거래글 작성자 프로필
  private MemberProfile memberProfile;

  // 상호작용 지표
  private int countPick; // Pick 수
  private boolean pickedYn; // Pick 클릭 여부 (로그인한 사용자 전용)

  // 대표 이미지
  private String thumbnail;

  // GETTER, SETTER
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }

  public int getHitcount() {
    return hitcount;
  }

  public void setHitcount(int hitcount) {
    this.hitcount = hitcount;
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

  public int getCountPick() {
    return countPick;
  }

  public void setCountPick(int countPick) {
    this.countPick = countPick;
  }

  public String getThumbnail() {
    return thumbnail;
  }

  public void setThumbnail(String thumbnail) {
    this.thumbnail = thumbnail;
  }

  public String getMainCategoryName() {
    return mainCategoryName;
  }

  public void setMainCategoryName(String mainCategoryName) {
    this.mainCategoryName = mainCategoryName;
  }

  public String getSubCategoryName() {
    return subCategoryName;
  }

  public void setSubCategoryName(String subCategoryName) {
    this.subCategoryName = subCategoryName;
  }

  public boolean isPickedYn() {
    return pickedYn;
  }

  public void setPickedYn(boolean pickedYn) {
    this.pickedYn = pickedYn;
  }

  public DealStatus getDealStatus() {
    return dealStatus;
  }

  public void setDealStatus(DealStatus dealStatus) {
    this.dealStatus = dealStatus;
  }
}
