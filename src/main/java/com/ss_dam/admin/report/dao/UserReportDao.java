package com.ss_dam.admin.report.dao;

import java.util.Map;

public interface UserReportDao {

    // 신고자 회원 확인 및 동시 요청 제어용 잠금
    Long lockReporter(Long reporterCode);

    // 신고 대상 회원 번호 또는 콘텐츠 작성자 번호 조회
    Long findTargetMemberCode(Map<String, Object> params);

    // 동일 회원의 동일 대상 미처리 신고 조회
    Long findPendingReportCode(Map<String, Object> params);

    // 신고 등록 및 생성 번호 반환
    int insertReport(Map<String, Object> params);
}