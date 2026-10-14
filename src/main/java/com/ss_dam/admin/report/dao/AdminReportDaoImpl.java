package com.ss_dam.admin.report.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.AdminReportDetailView;
import com.ss_dam.admin.report.model.response.ReportView;

@Repository
public class AdminReportDaoImpl implements AdminReportDao {

    private final SqlSession sql;

    public AdminReportDaoImpl(SqlSession sql) {
        this.sql = sql;
    }

    // 관리자 신고 검색 결과 개수
    @Override
    public long countReports(Map<String, Object> params) {
        return sql.selectOne(
                "adminReport.countReports", params);
    }

    // 관리자 신고 목록
    @Override
    public List<ReportView> loadReports(Map<String, Object> params) {
        return sql.selectList(
                "adminReport.loadReports", params);
    }

    // 관리자 신고 상세
    @Override
    public AdminReportDetailView loadReport(Long reportCode) {
        return sql.selectOne(
                "adminReport.loadReport",
                Map.of("reportCode", reportCode));
    }

	// 신고 현재 상태 조회 및 행 잠금
	@Override
	public String lockReportStatus(Long reportCode) {
			return sql.selectOne(
							"adminReport.lockReportStatus",
							Map.of("reportCode", reportCode));
	}

	// 신고 대상 회원 번호 조회
	@Override
	public Long findReportTargetMemberCode(Long reportCode) {
			return sql.selectOne(
							"adminReport.findReportTargetMemberCode",
							Map.of("reportCode", reportCode));
	}

	// 제재 대상 회원 행 잠금
	@Override
	public Long lockReportTargetMember(Long memberCode) {
			return sql.selectOne(
							"adminReport.lockReportTargetMember",
							Map.of("memberCode", memberCode));
	}

	// 신고 상태 변경
	@Override
	public int updateReportStatus(Map<String, Object> params) {
			return sql.update("adminReport.updateReportStatus", params);
	}

	// 신고 처리 이력 등록
	@Override
	public int insertReportLog(Map<String, Object> params) {
			return sql.insert("adminReport.insertReportLog", params);
	}

	// 원본 처리 이력 조회
	@Override
	public Map<String, Object> loadOriginalProcessLog(
					Map<String, Object> params) {

			return sql.selectOne(
							"adminReport.loadOriginalProcessLog", params);
	}

	// 최신 취소·복구 이벤트 조회
	@Override
	public String findLatestActionEvent(Map<String, Object> params) {
			return sql.selectOne(
							"adminReport.findLatestActionEvent", params);
	}

	// 적용 중인 신고 제재 조회
	@Override
	public String findEffectiveReportRestriction(
					Map<String, Object> params) {

			return sql.selectOne(
							"adminReport.findEffectiveReportRestriction", params);
	}

	// 회원의 기본 이용 상태 조회
	@Override
	public String findMemberAccessStatus(Long memberCode) {
			return sql.selectOne(
							"adminReport.findMemberAccessStatus",
							Map.of("memberCode", memberCode));
	}

    //관리자 회원 상세 - 회원이 받은 전체 신고 통계
    @Override
    public AdminMemberReportsView loadMemberReportSummary(
            Map<String, Object> params) {

        return sql.selectOne(
                "adminReport.loadMemberReportSummary", params);
    }

    //관리자 회원 상세 - 회원이 받은 신고 페이지 목록
    @Override
    public List<ReportView> loadMemberReports(
            Map<String, Object> params) {

        return sql.selectList(
                "adminReport.loadMemberReports", params);
    }
}