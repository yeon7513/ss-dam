package com.ss_dam.admin.log.dao;

import com.ss_dam.admin.log.model.response.AdminActivity;

import java.util.List;
import java.util.Map;

public interface AdminActivityLogDao {

  // 전체 관리자 활동 이력 건수
  long countActivityLogs(Map<String, Object> params);

  // 전체 관리자 활동 이력 목록
  List<AdminActivity> loadActivityLogs(Map<String, Object> params);

  // 회원 정지·해제 이력 전체 건수
  int countMemberLogs(Map<String, Object> params);

  // 회원 정지·해제 이력 목록
  List<AdminActivity> loadMemberLogs(Map<String, Object> params);

  // 챌린지 처리 이력 전체 건수
  long countChallengeLogs(Map<String, Object> params);

  // 챌린지 처리 이력 목록
  List<AdminActivity> loadChallengeLogs(Map<String, Object> params);

  // 관리자 처리 이력 저장
  int insertActivityLog(Map<String, Object> params);

  List<AdminActivity> loadActivityLogsByAdminCode(Map<String, Object> params);
}
