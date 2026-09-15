package com.ss_dam.auth.member.service;

import com.ss_dam.auth.member.model.filter.AdminMemberSearchFilter;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.common.pager.PageResult;

public interface AdminMemberService {

  //관리자 회원 목록 조회 및 검색
  PageResult<AdminMemberView> loadMembers(
        AdminMemberSearchFilter filter);
  
  // 관리자 회원 상세 조회 — 기본 정보 및 프로필 사진
  AdminMemberDetailView loadMember(Long memberCode);

  
}
