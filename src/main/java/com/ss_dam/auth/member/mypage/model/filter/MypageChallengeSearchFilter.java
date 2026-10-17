package com.ss_dam.auth.member.mypage.model.filter;

import com.ss_dam.common.pager.PageQuery;

// 마이페이지 - 참여한 챌린지 검색 필터
// page, perPage, keyword는 PageQuery에서 상속
public class MypageChallengeSearchFilter extends PageQuery {

  private String status; // 참여 상태 탭 (JOINED, COMPLETED, CANCELED / 빈 값이면 전체)
  private Long memCode;  // 로그인한 회원 번호 (서버에서 세션 값으로 세팅)

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Long getMemCode() {
    return memCode;
  }

  public void setMemCode(Long memCode) {
    this.memCode = memCode;
  }
}