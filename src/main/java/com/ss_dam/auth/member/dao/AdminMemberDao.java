package com.ss_dam.auth.member.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.admin.report.model.response.ReportView;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberFeedsView;
import com.ss_dam.auth.member.model.response.AdminMemberReportsView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.feed.model.response.UserFeedView;

public interface AdminMemberDao {

  // 검색 조건에 해당하는 전체 회원 수
  int countMembers(Map<String, Object> params);

  // 회원 목록 조회
  List<AdminMemberView> loadMembers(Map<String, Object> params);

  // 관리자 회원 상세 조회 — 기본 정보 및 프로필 사진
  AdminMemberDetailView loadMember(Long memberCode);

  //회원이 완료한 챌린지 수
  long countCompletedChallenges(Long memberCode);

  //상단 통계 - 신고 누적 수
  long countReceivedReports(Long memberCode);

  //상단 통계 - 피드 활동 (회원이 작성한 피드 수)
  long countMemberFeeds(Long memberCode);

  //상단 통계 - 거래 활동 (회원이 작성한 거래 수)
  long countMemberTrades(Long memberCode);

  //상단 통계 - 로그인 횟수
  long countMemberLogins(Long memberCode);

  // 회원 상태 변경
  int updateMemberStatus(Map<String, Object> params);

  // 관리자 회원 상태 변경 이력 저장
  int insertMemberStatusLog(Map<String, Object> params);

  // 회원 정지·해제 로그 전체 건수
  int countMemberLogs(Map<String, Object> params);

  // 회원 정지·해제 로그 목록
  List<AdminActivity> loadMemberLogs(Map<String, Object> params);

  // 회원 작성 피드 전체 통계
  AdminMemberFeedsView loadMemberFeedSummary(Map<String, Object> params);

  // 회원 작성 피드 페이지 목록
  List<UserFeedView> loadMemberFeeds(Map<String, Object> params);
  
  // 회원이 받은 전체 신고 통계
  AdminMemberReportsView loadMemberReportSummary(
          Map<String, Object> params);

  // 회원이 받은 신고 페이지 목록
  List<ReportView> loadMemberReports(
          Map<String, Object> params);

}
