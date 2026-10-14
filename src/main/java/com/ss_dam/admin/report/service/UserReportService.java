package com.ss_dam.admin.report.service;

import com.ss_dam.admin.report.model.request.CreateReportRequest;

public interface UserReportService {

  // 사용자 신고 등록
  Long createReport(Long reporterCode, CreateReportRequest request);

}