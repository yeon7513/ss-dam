package com.ss_dam.admin.log.response;

// 관리자 대시보드에서
// 피드, 마켓, 회원 정보 목록 조회 시
// 수정 사항이나 제재를 가한 경우 보여질 간략한 활동 로그 DTO
public class AdminActivitySummary {
  private String targetType; // 대상 유형 (피드, 마켓, 회원)
  private Long targetCode; // 대상 고유 번호
  private String processType; // 처리 유형 (블라인드, 무고, 정상 등)
  private String createdAt; // 활동일

  // getter, setter
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

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }
}
