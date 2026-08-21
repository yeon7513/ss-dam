package com.ss_dam.common.enums;

import com.fasterxml.jackson.annotation.JsonValue;

// 이 enum은 피드, 마켓, 댓글에서
// 공통적으로 사용하는 status 값들의 집합
public enum PostStatus {
  ACTIVE("활성"), // 정상
  PRIVATE("비공개"), // 비공개 처리 (일반 사용자용)
  DELETED("삭제"), // 삭제된 게시물 (일반 사용자용)
  BLINDED("블라인드"), // 신고 처리 후 가려진 게시물
  REPORTED("신고됨"); // 신고를 받은 게시물 (관리자 대시보드용)

  private final String label;

  PostStatus(String label) {
    this.label = label;
  }

  @JsonValue
  public String getLabel() {
    return label;
  }

}
