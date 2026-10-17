package com.ss_dam.admin.log.dao;

import com.ss_dam.admin.log.model.response.AdminActivity;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AdminActivityLogDaoImpl implements AdminActivityLogDao {

  private final SqlSession sql;

  public AdminActivityLogDaoImpl(SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public long countActivityLogs(Map<String, Object> params) {
    return sql.selectOne("adminActivityLog.countActivityLogs", params);
  }

  @Override
  public List<AdminActivity> loadActivityLogs(Map<String, Object> params) {

    return sql.selectList("adminActivityLog.loadActivityLogs", params);
  }

  // 회원 정지·해제 이력 전체 건수
  @Override
  public int countMemberLogs(Map<String, Object> params) {
    return sql.selectOne("adminActivityLog.countMemberLogs", params);
  }

  // 회원 정지·해제 이력 목록
  @Override
  public List<AdminActivity> loadMemberLogs(Map<String, Object> params) {

    return sql.selectList("adminActivityLog.loadMemberLogs", params);
  }

  // 챌린지 처리 이력 전체 건수
  @Override
  public long countChallengeLogs(Map<String, Object> params) {
    return sql.selectOne("adminActivityLog.countChallengeLogs", params);
  }

  // 챌린지 처리 이력 목록
  @Override
  public List<AdminActivity> loadChallengeLogs(Map<String, Object> params) {

    return sql.selectList("adminActivityLog.loadChallengeLogs", params);
  }

  // 관리자 처리 이력 저장
  @Override
  public int insertActivityLog(Map<String, Object> params) {
    return sql.insert("adminActivityLog.insertActivityLog", params);
  }

  @Override
  public List<AdminActivity> loadActivityLogsByAdminCode(Map<String, Object> params) {
    return sql.selectList("adminActivityLog.loadActivityLogsByAdminCode", params);
  }
}
