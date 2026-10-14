package com.ss_dam.admin.report.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.AdminReportDetailView;
import com.ss_dam.admin.report.model.response.ReportView;

public interface AdminReportDao {
  
	// 관리자 신고 검색 결과 개수
	long countReports(Map<String, Object> params);

	// 관리자 신고 목록
	List<ReportView> loadReports(Map<String, Object> params);

	// 관리자 신고 상세
	AdminReportDetailView loadReport(Long reportCode);

   // 신고 현재 상태 조회 및 행 잠금
	String lockReportStatus(Long reportCode);

	// 신고 대상 회원 번호 조회
	Long findReportTargetMemberCode(Long reportCode);

	// 제재 대상 회원 행 잠금
	Long lockReportTargetMember(Long memberCode);

	// 신고 상태 변경
	int updateReportStatus(Map<String, Object> params);

	// 신고 처리 이력 등록
	int insertReportLog(Map<String, Object> params);

	// 해당 신고의 원본 처리 이력 조회
	Map<String, Object> loadOriginalProcessLog(Map<String, Object> params);

	// 원본 처리에 대한 최신 취소·복구 이벤트 조회
	String findLatestActionEvent(Map<String, Object> params);

	// 회원에게 적용 중인 신고 제재 조회 — 인증 검사 연결용
	String findEffectiveReportRestriction(Map<String, Object> params);     

  // 회원이 받은 전체 신고 통계
  AdminMemberReportsView loadMemberReportSummary(
          Map<String, Object> params);

  // 회원이 받은 신고 페이지 목록
  List<ReportView> loadMemberReports(
          Map<String, Object> params);

	// 회원의 기본 이용 상태 조회
	String findMemberAccessStatus(Long memberCode);
}