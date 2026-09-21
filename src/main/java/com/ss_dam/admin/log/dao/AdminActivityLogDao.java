package com.ss_dam.admin.log.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.admin.log.response.AdminActivity;

public interface AdminActivityLogDao {

  // 회원 정지·해제 로그 전체 건수
  int countMemberLogs(Map<String, Object> params);

  // 회원 정지·해제 로그 목록
  List<AdminActivity> loadMemberLogs(Map<String, Object> params);
}