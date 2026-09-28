package com.ss_dam.admin.report.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.ReportView;

public interface AdminReportDao {

  // 회원이 받은 전체 신고 통계
  AdminMemberReportsView loadMemberReportSummary(
          Map<String, Object> params);

  // 회원이 받은 신고 페이지 목록
  List<ReportView> loadMemberReports(
          Map<String, Object> params);
}