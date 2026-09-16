package com.ss_dam.auth.member.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberView;

public interface AdminMemberDao {

  // 검색 조건에 해당하는 전체 회원 수
  int countMembers(Map<String, Object> params);

  // 회원 목록 조회
  List<AdminMemberView> loadMembers(Map<String, Object> params);

  // 관리자 회원 상세 조회 — 기본 정보 및 프로필 사진
  AdminMemberDetailView loadMember(Long memberCode);
  
}
