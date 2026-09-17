package com.ss_dam.auth.member.service;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.auth.member.model.filter.AdminMemberSearchFilter;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberFeedsView;
import com.ss_dam.auth.member.model.response.AdminMemberReportsView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface AdminMemberService {

  //관리자 회원 목록 조회 및 검색
  PageResult<AdminMemberView> loadMembers(
        AdminMemberSearchFilter filter);
  
  // 관리자 회원 상세 조회 — 기본 정보 및 프로필 사진
  AdminMemberDetailView loadMember(Long memberCode);

  //회원 이용 제한
  void restrictMember(Long memberCode, String reason, Long adminCode);

  //회원 이용 제한 해제
  void releaseMember(Long memberCode, String reason, Long adminCode);

  // 회원 정지·해제 로그 조회
  PageResult<AdminActivity> loadMemberLogs(
        Long memberCode, PageQuery pageQuery);

  // 관리자 회원 상세 - 작성 피드 탭
  AdminMemberFeedsView loadMemberFeeds(
        Long memberCode, PageQuery pageQuery);
  
  //관리자 회원 상세 - 신고 내역 탭
  AdminMemberReportsView loadMemberReports(
      Long memberCode, PageQuery pageQuery);
  
  //

  
}
