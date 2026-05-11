package com.ss_dam.global.image;

public class Images {
  private Long targetCode; // 타겟 고유 번호
  private String type; // 타입 - 피드, 마켓, 프로필
  private String path; // 경로
  private boolean deleteYn; // 삭제 여부

  // 2026.05.11 수업시간에 잠깐 나온 배치 관리를 통해
  // 이미지의 물리적 삭제를 구현하면 좋을 것 같음.

  public Long getTargetCode() {
    return targetCode;
  }

  public void setTargetCode(Long targetCode) {
    this.targetCode = targetCode;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public boolean isDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(boolean deleteYn) {
    this.deleteYn = deleteYn;
  }
}
