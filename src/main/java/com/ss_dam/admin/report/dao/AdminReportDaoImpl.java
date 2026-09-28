package com.ss_dam.admin.report.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.ReportView;

@Repository
public class AdminReportDaoImpl implements AdminReportDao {

    @Autowired
    private SqlSession sql;

    //관리자 회원 상세 - 회원이 받은 전체 신고 통계
    @Override
    public AdminMemberReportsView loadMemberReportSummary(
            Map<String, Object> params) {

        return sql.selectOne(
                "adminReport.loadMemberReportSummary", params);
    }

    //관리자 회원 상세  - 회원이 받은 신고 페이지 목록
    @Override
    public List<ReportView> loadMemberReports(
            Map<String, Object> params) {

        return sql.selectList(
                "adminReport.loadMemberReports", params);
    }
}