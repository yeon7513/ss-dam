package com.ss_dam.admin.log.service;

import java.time.LocalDateTime;

import com.ss_dam.admin.log.model.request.AdminActivityLogFilter;
import com.ss_dam.admin.log.model.response.AdminActivity;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface AdminActivityLogService {

	// 전체 관리자 활동 이력 조회
	PageResult<AdminActivity> loadActivityLogs(
            AdminActivityLogFilter filter);
    
	// 회원 정지·해제 로그 조회
	PageResult<AdminActivity> loadMemberLogs(Long memberCode, PageQuery pageQuery);

	// 챌린지 관리 처리 이력 조회
	PageResult<AdminActivity> loadChallengeLogs(Long code, PageQuery pageQuery);

	// 관리자 처리 이력 저장
	void recordActivity(
        Long adminCode,
        String targetType,
        Long targetCode,
        String processType,
        String memo,
        LocalDateTime createdAt);

		// 신고와 연결된 관리자 처리 이력 저장
    void recordActivity(
        Long adminCode,
        String targetType,
        Long targetCode,
        String processType,
        String memo,
        LocalDateTime createdAt,
        Long reportCode);
        
}