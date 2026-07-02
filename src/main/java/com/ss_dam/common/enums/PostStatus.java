package com.ss_dam.common.enums;

// 이 enum은 피드, 마켓, 댓글에서
// 공통적으로 사용하는 status 값들의 집합
public enum PostStatus {
  ACTIVE("ACTIVE", "활성"), // 정상
  PRIVATE("PRIVATE", "비공개"), // 비공개 처리 (일반 사용자용)
  DELETED("DELETED", "삭제"), // 삭제된 게시물 (일반 사용자용)
  BLINDED("BLINDED", "블라인드"), // 신고 처리 후 가려진 게시물
  REPORTED("REPORTED", "신고됨"); // 신고를 받은 게시물 (관리자 대시보드용)

  private final String code;
  private final String label;

  PostStatus(String code, String label) {
    this.code = code;
    this.label = label;
  }

  public String getCode() {
    return code;
  }

  public String getLabel() {
    return label;
  }

}
