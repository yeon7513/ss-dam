package com.ss_dam.auth.member;

import org.springframework.web.multipart.MultipartFile;

public class Member {
  private Long code;
  private String id; // 아이디
  private String password; // 비밀번호
  private String name; // 이름
  private String phone; // 연락처
  private String address; // 주소
  private int rating; // 등급
  private int ranking; // 랭킹
  private int point; // 보유 포인트
  private String status; // 상태
  private String createdAt; // 가입일
  private String updatedAt; // 수정일
  private String loggedAt; // 마지막 로그인
  private boolean deleteYn; // 회원 탈퇴(삭제) 여부

  // 조인용 필드
  private String path;

  // 프로필 업로드용 필드
  private MultipartFile file; // 프로필 사진

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public int getRanking() {
    return ranking;
  }

  public void setRanking(int ranking) {
    this.ranking = ranking;
  }

  public int getPoint() {
    return point;
  }

  public void setPoint(int point) {
    this.point = point;
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

  public String getLoggedAt() {
    return loggedAt;
  }

  public void setLoggedAt(String loggedAt) {
    this.loggedAt = loggedAt;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public MultipartFile getFile() {
    return file;
  }

  public void setFile(MultipartFile file) {
    this.file = file;
  }
}
