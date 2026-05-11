package com.ss_dam.market;

public class MarketCategory {
  private Long code; // 카테고리 고유 번호
  private Long mainCate; // 메인 카테고리 (대분류)
  // mainCate -> scott 실습할 때 mgr 기억나나요? 그런 로직입니다.
  // 즉, 이 컬럼(필드)이 NULL이면? 대분류임
  private String name; // 카테고리명
  private String empId; // 관리자 아이디
  private String status; // 카테고리 활성 상태
  private String createdAt; // 카테고리 등록일
  private boolean deleteYn; // 삭제 여부

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getMainCate() {
    return mainCate;
  }

  public void setMainCate(Long mainCate) {
    this.mainCate = mainCate;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
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

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }

}
