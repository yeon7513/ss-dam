package com.ss_dam.admin.report.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class UserReportDaoImpl implements UserReportDao {

    private final SqlSession sql;

    public UserReportDaoImpl(SqlSession sql) {
        this.sql = sql;
    }

    // 신고자 회원 확인 및 행 잠금
    @Override
    public Long lockReporter(Long reporterCode) {
        return sql.selectOne(
                "userReport.lockReporter",
                Map.of("reporterCode", reporterCode));
    }

    // 신고 대상 소유자 조회
    @Override
    public Long findTargetMemberCode(Map<String, Object> params) {
        return sql.selectOne(
                "userReport.findTargetMemberCode", params);
    }

    // 미처리 중복 신고 조회
    @Override
    public Long findPendingReportCode(Map<String, Object> params) {
        return sql.selectOne(
                "userReport.findPendingReportCode", params);
    }

    // 신고 등록
    @Override
    public int insertReport(Map<String, Object> params) {
        return sql.insert(
                "userReport.insertReport", params);
    }
}