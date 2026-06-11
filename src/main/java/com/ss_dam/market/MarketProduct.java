package com.ss_dam.market;

import java.util.List;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.global.image.Images;

public class MarketProduct {
  private Long code; // 등록 물품 고유 번호
  private Long cateCode; // 카테고리 고유 번호
  private Long memCode; // 회원 고유 번호 (거래글을 등록한 회원)
  private String title; // 거래글 제목
  private String content; // 거래글 내용
  private int price; // 가격 (포인트)
  private int hitcount; // 조회수
  private String status; // 거래글 상태 (판매중, 완료, 정지)
  private String createdAt; // 등록일
  private String updatedAt; // 수정일
  private boolean deleteYn; // 삭제 여부

  // 조인용 필드
  private String categoryName;
  private int countPick;

  // 작성자 프로필 정보
  private MemberProfile memberProfile;

  // 전체 조회용 리스트
  private List<Images> images;

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

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }

  public List<Images> getImages() {
    return images;
  }

  public void setImages(List<Images> images) {
    this.images = images;
  }
}
