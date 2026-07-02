package com.ss_dam.admin.log.response;

// 최고관리자가 확인하기 위한 전체 관리자의 활동 내역 DTO
public class AdminActivity {
  private Long code; // 로그 번호
  private String empId; // 관리자 아이디
  private String targetType; // 처리 대상 유형 (피드, 마켓, 회원)
  private Long targetCode; // 처리 대상 고유 번호
  private String processType; // 처리 유형
  private String memo; // 처리 사유 (상세 메모)
  private String createdAt; // 활동일

  // getter, setter
  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
  }

  public String getTargetType() {
    return targetType;
  }

  public void setTargetType(String targetType) {
    this.targetType = targetType;
  }

  public Long getTargetCode() {
    return targetCode;
  }

  public void setTargetCode(Long targetCode) {
    this.targetCode = targetCode;
  }

  public String getProcessType() {
    return processType;
  }

  public void setProcessType(String processType) {
    this.processType = processType;
  }

  public String getMemo() {
    return memo;
  }

  public void setMemo(String memo) {
    this.memo = memo;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }
}
