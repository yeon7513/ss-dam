package com.ss_dam.admin.report.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.report.dao.AdminReportDao;
import com.ss_dam.admin.report.model.request.AdminReportQuery;
import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.AdminReportDetailView;
import com.ss_dam.admin.report.model.response.ReportView;
import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;

@Service
public class AdminReportServiceImpl implements AdminReportService {

    // 조회 가능한 신고 상태
    private static final Set<String> REPORT_STATUSES =
            Set.of("PENDING", "IN_REVIEW", "RESOLVED", "REJECTED");

    // 조회 가능한 신고 대상 유형
    private static final Set<String> TARGET_TYPES =
            Set.of("feed", "comment", "market");

    private final AdminReportDao adminReportDao;
    private final AdminMemberDao adminMemberDao;

    public AdminReportServiceImpl(
            AdminReportDao adminReportDao,
            AdminMemberDao adminMemberDao) {

        this.adminReportDao = adminReportDao;
        this.adminMemberDao = adminMemberDao;
    }

    // 관리자 신고 목록 조회
    @Override
    @Transactional(readOnly = true)
    public PageResult<ReportView> loadReports(AdminReportQuery query) {

        // 1. 페이지 입력값 확인
        if (query.getPage() < 1
                || query.getPerPage() < 1
                || query.getPerPage() > 100
                || query.getPerGroup() < 1
                || query.getPerGroup() > 100) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "페이지는 1 이상, 페이지당 개수와 페이지 그룹은 1~100이어야 합니다.");
        }

        // 큰 페이지 번호 입력 시 int 범위 초과 방지
        long offset = (long) (query.getPage() - 1) * query.getPerPage();

        if (offset > Integer.MAX_VALUE - 100L) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "요청한 페이지 범위가 너무 큽니다.");
        }

        // 2. 검색 조건 정리
        // 공백 또는 빈 문자열은 검색 조건에서 제외
        String status = trimToNull(query.getStatus());
        String targetType = trimToNull(query.getTargetType());
        String reasonType = trimToNull(query.getReasonType());
        String keyword = trimToNull(query.getKeyword());

        // true이면 PENDING, IN_REVIEW를 함께 조회
        boolean pendingOnly =
                Boolean.TRUE.equals(query.getPendingOnly());

        // 3. 신고 상태 및 대상 유형 검증
        if (status != null && !REPORT_STATUSES.contains(status)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "올바르지 않은 신고 상태입니다.");
        }

        if (targetType != null && !TARGET_TYPES.contains(targetType)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "올바르지 않은 신고 대상 유형입니다.");
        }

        // 미처리 전체 조회와 특정 상태 조회는 동시에 사용하지 않음
        if (pendingOnly && status != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "pendingOnly와 status는 동시에 사용할 수 없습니다.");
        }

        // 4. 날짜 검색 조건 검증
        LocalDate startDate = query.getStartDate();
        LocalDate endDate = query.getEndDate();

        validateReportDate(startDate);
        validateReportDate(endDate);

        if (startDate != null
                && endDate != null
                && startDate.isAfter(endDate)) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "시작일은 종료일보다 늦을 수 없습니다.");
        }

        // 5. DAO에 전달할 검색 조건 설정
        Map<String, Object> params = new HashMap<>();

        params.put("status", status);
        params.put("pendingOnly", pendingOnly);
        params.put("targetType", targetType);
        params.put("reasonType", reasonType);

        // 검색어의 %, _는 와일드카드가 아닌 일반 문자로 처리
        params.put(
                "keywordPattern",
                keyword == null ? null : toContainsPattern(keyword));

        // 시작일 00:00 이상
        params.put(
                "startAt",
                startDate == null ? null : startDate.atStartOfDay());

        // 종료일 전체 포함: 다음 날 00:00 미만
        params.put(
                "endAtExclusive",
                endDate == null
                        ? null
                        : endDate.plusDays(1).atStartOfDay());

        params.put("offset", offset);
        params.put("perPage", query.getPerPage());

        // 6. 검색 조건에 해당하는 전체 신고 수 조회
        long totalCount = adminReportDao.countReports(params);

        // 7. 현재 페이지의 신고 목록 조회
        List<ReportView> reports =
                adminReportDao.loadReports(params);

        // 8. 신고 목록과 페이지 정보 반환
        Pager pager = new Pager(query, totalCount);

        return PageResult.of(reports, pager);
    }

    // 관리자 신고 상세 조회
    // 처리 전·후 동일한 API에서 사용
    @Override
    @Transactional(readOnly = true)
    public AdminReportDetailView loadReport(Long reportCode) {

        // 1. 신고 번호 확인
        if (reportCode == null || reportCode < 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "올바르지 않은 신고 번호입니다.");
        }

        // 2. 신고 내용과 처리 정보 조회
        // 처리 전에는 처리 관련 필드가 null
        // actionStatus는 상세 조회 XML의 CASE 문에서 계산
        AdminReportDetailView result =
                adminReportDao.loadReport(reportCode);

        // 3. 신고 존재 여부 확인
        if (result == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 신고입니다.");
        }

        return result;
    }

    //관리자 회원 상세 - 신고내역 탭
    @Override
    @Transactional(readOnly = true)
    public AdminMemberReportsView loadMemberReports(
            Long memberCode, PageQuery pageQuery) {

        // 1. 페이지 입력값 확인
        if (pageQuery.getPage() < 1
                || pageQuery.getPerPage() < 1
                || pageQuery.getPerGroup() < 1) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "페이지 관련 값은 1 이상이어야 합니다.");
        }

        // 2. 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        // 3. 해당 회원이 받은 전체 신고 통계
        AdminMemberReportsView result =
                adminReportDao.loadMemberReportSummary(params);

        // 4. 전체 신고 수로 페이지 계산
        Pager pager = new Pager(
                pageQuery, result.getTotalReportCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 5. 현재 페이지의 신고 목록 조회
        List<ReportView> reports =
                adminReportDao.loadMemberReports(params);

        // 6. 통계 DTO에 목록과 페이지 정보 설정
        result.setReports(PageResult.of(reports, pager));

        return result;
    }

    // 검색 조건의 앞뒤 공백 제거
    // null 또는 공백만 있는 문자열은 null 반환
    private String trimToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }

    // LIKE 검색용 문자열 생성
    // XML에서 LIKE #{keywordPattern} ESCAPE '!'와 함께 사용
    private String toContainsPattern(String keyword) {
        return "%" + keyword
                .replace("!", "!!")
                .replace("%", "!%")
                .replace("_", "!_") + "%";
    }

    // DB 날짜 범위 및 종료일 + 1일 계산 범위 확인
    private void validateReportDate(LocalDate date) {
        if (date != null
                && (date.isBefore(LocalDate.of(1000, 1, 1))
                || date.isAfter(LocalDate.of(9999, 12, 30)))) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "조회 날짜 범위를 확인해 주세요.");
        }
    }
}