package com.ss_dam.admin.log.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.admin.log.response.AdminActivity;

public interface AdminActivityLogDao {

    // 회원 정지·해제 이력 전체 건수
    int countMemberLogs(Map<String, Object> params);

    // 회원 정지·해제 이력 목록
    List<AdminActivity> loadMemberLogs(
            Map<String, Object> params);

    // 챌린지 처리 이력 전체 건수
    long countChallengeLogs(Map<String, Object> params);

    // 챌린지 처리 이력 목록
    List<AdminActivity> loadChallengeLogs(
            Map<String, Object> params);

    // 관리자 처리 이력 저장
    int insertActivityLog(Map<String, Object> params);
}