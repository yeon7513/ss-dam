package com.ss_dam.admin.report.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.service.AdminActivityLogService;
import com.ss_dam.admin.report.dao.AdminReportDao;
import com.ss_dam.admin.report.model.request.AdminReportQuery;
import com.ss_dam.admin.report.model.request.ReportActionMemoRequest;
import com.ss_dam.admin.report.model.request.ResolveReportRequest;
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
            Set.of("feed", "comment", "market", "user");

    // 처리 가능한 제재 종류
    private static final Set<String> ACTION_TYPES =
            Set.of("WARNING", "SUSPEND", "WITHDRAW");

    // 신고 처리 기준 시간대
    private static final ZoneId REPORT_ZONE =
            ZoneId.of("Asia/Seoul");

		private final AdminReportDao adminReportDao;
    private final AdminMemberDao adminMemberDao;
    private final AdminActivityLogService adminActivityLogService;

    public AdminReportServiceImpl(
            AdminReportDao adminReportDao,
            AdminMemberDao adminMemberDao,
            AdminActivityLogService adminActivityLogService) {

        this.adminReportDao = adminReportDao;
        this.adminMemberDao = adminMemberDao;
        this.adminActivityLogService = adminActivityLogService;
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

    // 신고 검토 시작
    @Override
    @Transactional
    public void reviewReport(Long reportCode, Long admCode) {

        // 1. 신고 행 잠금 및 현재 상태 확인
        String beforeStatus = lockReportStatus(reportCode, admCode);

        // 2. 접수 상태에서만 검토 시작 가능
        if (!"PENDING".equals(beforeStatus)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "접수 상태의 신고만 검토를 시작할 수 있습니다.");
        }

        // 3. 검토 시작 이력 생성
        Map<String, Object> params = createLogParams(
                reportCode,
                admCode,
                beforeStatus,
                "IN_REVIEW",
                "REVIEW",
                null,
                null);

        // 4. 상태 변경 및 이력 저장
        updateStatusAndInsertLog(params);
    }

    // 신고 처리 완료 및 제재 등록
    @Override
    @Transactional
    public void resolveReport(
            Long reportCode,
            Long admCode,
            ResolveReportRequest request) {

        // 1. 요청값 확인
        if (request == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "처리 내용을 입력해 주세요.");
        }

        String actionType = trimToNull(request.getActionType());
        String memo = requireProcessMemo(request.getProcessMemo());
        String period = trimToNull(request.getSuspensionPeriod());

        if (actionType == null || !ACTION_TYPES.contains(actionType)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "조치 종류는 WARNING, SUSPEND, WITHDRAW 중 하나여야 합니다.");
        }

        // 2. 신고 행 잠금 후 처리 가능한 상태인지 확인
        String beforeStatus = lockReportStatus(reportCode, admCode);
        requireProcessableStatus(beforeStatus);

        // 3. 콘텐츠 작성자 또는 직접 신고된 회원 번호 조회
        Long targetMemberCode =
                adminReportDao.findReportTargetMemberCode(reportCode);

        if (targetMemberCode == null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "제재 대상 회원을 확인할 수 없습니다.");
        }

        // 4. 대상 계정의 존재 확인 및 행 잠금
        lockTargetMember(targetMemberCode);

        // 5. 처리 이력 생성
        Map<String, Object> params = createLogParams(
                reportCode,
                admCode,
                beforeStatus,
                "RESOLVED",
                "PROCESS",
                actionType,
                memo);

        params.put("targetMemberCode", targetMemberCode);

        // 6. 정지 조치인 경우 종료 시각 계산
        if ("SUSPEND".equals(actionType)) {
            LocalDateTime processedAt =
                    (LocalDateTime) params.get("createdAt");

            LocalDateTime suspendedUntil =
                    calculateSuspendedUntil(processedAt, period);

            params.put("suspensionPeriod", period);
            params.put("suspendedUntil", suspendedUntil);

        } else if (period != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "정지 조치에만 정지 기간을 지정할 수 있습니다.");
        }

        // 7. 신고 상태 변경 및 처리 이력 저장
        // 회원의 기존 STATUS, DELETE_YN은 덮어쓰지 않음
        // 신고에 의한 제재는 REPORT_LOG에서 별도로 판정
        updateStatusAndInsertLog(params);
    }

    // 신고 기각
    @Override
    @Transactional
    public void rejectReport(
            Long reportCode,
            Long admCode,
            ReportActionMemoRequest request) {

        // 1. 기각 사유 확인
        String memo = requireProcessMemo(
                request == null ? null : request.getProcessMemo());

        // 2. 신고 행 잠금 및 현재 상태 확인
        String beforeStatus = lockReportStatus(reportCode, admCode);
        requireProcessableStatus(beforeStatus);

        // 3. 기각 이력 생성
        Map<String, Object> params = createLogParams(
                reportCode,
                admCode,
                beforeStatus,
                "REJECTED",
                "PROCESS",
                "REJECT",
                memo);

        // 4. 기각 상태로 변경 및 이력 저장
        updateStatusAndInsertLog(params);
    }

    // 신고 제재 취소
    // 강제 탈퇴 조치를 취소하면 해당 신고에 의한 이용 차단 해제
    @Override
    @Transactional
    public void cancelReportAction(
            Long reportCode,
            Long processLogCode,
            Long admCode,
            ReportActionMemoRequest request) {

        changeReportAction(
                reportCode,
                processLogCode,
                admCode,
                request,
                "CANCEL");
    }

    // 취소했던 신고 제재 재적용
    @Override
    @Transactional
    public void restoreReportAction(
            Long reportCode,
            Long processLogCode,
            Long admCode,
            ReportActionMemoRequest request) {

        changeReportAction(
                reportCode,
                processLogCode,
                admCode,
                request,
                "RESTORE");
    }

    // 조치 취소·복구 공통 처리
    // public 메서드의 트랜잭션 안에서 실행
    private void changeReportAction(
            Long reportCode,
            Long processLogCode,
            Long admCode,
            ReportActionMemoRequest request,
            String eventType) {

        // 1. 변경 사유와 원본 이력 번호 확인
        String memo = requireProcessMemo(
                request == null ? null : request.getProcessMemo());

        if (processLogCode == null || processLogCode < 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "올바르지 않은 처리 이력 번호입니다.");
        }

        // 2. 신고 행 잠금 및 처리 완료 여부 확인
        String status = lockReportStatus(reportCode, admCode);

        if (!"RESOLVED".equals(status)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "처리 완료된 신고의 조치만 변경할 수 있습니다.");
        }

        Map<String, Object> lookup = new HashMap<>();
        lookup.put("reportCode", reportCode);
        lookup.put("processLogCode", processLogCode);

        // 3. 해당 신고의 최신 원본 PROCESS 이력인지 확인
        Map<String, Object> original =
                adminReportDao.loadOriginalProcessLog(lookup);

        if (original == null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "현재 신고의 원본 처리 이력이 아닙니다.");
        }

        String actionType = (String) original.get("actionType");

        if (actionType == null || !ACTION_TYPES.contains(actionType)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "취소 또는 복구할 수 없는 조치입니다.");
        }

        // 4. 원본 이력에 저장된 제재 대상 회원 확인
        Number targetCode = (Number) original.get("targetMemberCode");

        if (targetCode == null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "원본 이력에 제재 대상 회원 정보가 없습니다.");
        }

        Long targetMemberCode = targetCode.longValue();
        lockTargetMember(targetMemberCode);

        // 5. 최신 취소·복구 상태 확인
        String latestEvent =
                adminReportDao.findLatestActionEvent(lookup);

        boolean canceled = "CANCEL".equals(latestEvent);

        if ("CANCEL".equals(eventType) && canceled) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "이미 취소된 조치입니다.");
        }

        if ("RESTORE".equals(eventType) && !canceled) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "취소된 조치만 복구할 수 있습니다.");
        }

        // 6. 정지 복구 시 원래 종료 시각 유지
        LocalDateTime now = LocalDateTime.now(REPORT_ZONE);

        LocalDateTime suspendedUntil =
                (LocalDateTime) original.get("suspendedUntil");

        if ("RESTORE".equals(eventType)
                && "SUSPEND".equals(actionType)
                && (suspendedUntil == null
                    || !suspendedUntil.isAfter(now))) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "이미 만료된 정지 조치는 복구할 수 없습니다.");
        }

        // 7. 조치 변경 이력 생성
        // 신고 자체는 RESOLVED 상태 유지
        Map<String, Object> params = createLogParams(
                reportCode,
                admCode,
                status,
                status,
                eventType,
                actionType,
                memo);

        params.put("targetMemberCode", targetMemberCode);
        params.put("relatedLogCode", processLogCode);
        params.put("suspensionPeriod", original.get("suspensionPeriod"));
        params.put("suspendedUntil", suspendedUntil);

        // 8. 기존 이력은 유지하고 새 이력 추가
        insertReportLog(params);
    }

    // 신고 행 잠금 및 존재 여부 확인
    // 관리자 권한 자체는 컨트롤러의 requireAdmin()에서 검사
    private String lockReportStatus(Long reportCode, Long admCode) {

        if (admCode == null || admCode < 1) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "관리자 로그인 정보가 없습니다.");
        }

        if (reportCode == null || reportCode < 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "올바르지 않은 신고 번호입니다.");
        }

        String status = adminReportDao.lockReportStatus(reportCode);

        if (status == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 신고입니다.");
        }

        return status;
    }

    // 처리 가능한 신고 상태 검증
    private void requireProcessableStatus(String status) {
        if (!"PENDING".equals(status) && !"IN_REVIEW".equals(status)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "이미 처리 또는 기각된 신고입니다.");
        }
    }

    // 대상 회원 존재 확인 및 행 잠금
    private void lockTargetMember(Long memberCode) {
        if (adminReportDao.lockReportTargetMember(memberCode) == null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "제재 대상 회원 계정이 존재하지 않습니다.");
        }
    }

    // 처리 메모 검증
    private String requireProcessMemo(String value) {
        String memo = trimToNull(value);

        if (memo == null || memo.length() > 4000) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "처리 메모는 필수이며 4000자 이하여야 합니다.");
        }

        return memo;
    }

    // 정지 종료 시각 계산
    // 한 달은 고정 30일이 아닌 달력 기준 1개월
    private LocalDateTime calculateSuspendedUntil(
            LocalDateTime startAt,
            String period) {

        if (period == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "정지 기간을 선택해 주세요.");
        }

        return switch (period) {
            case "THREE_DAYS" -> startAt.plusDays(3);
            case "ONE_WEEK" -> startAt.plusWeeks(1);
            case "ONE_MONTH" -> startAt.plusMonths(1);
            default -> throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "올바르지 않은 정지 기간입니다.");
        };
    }

    // 처리 이력 공통 파라미터 생성
    private Map<String, Object> createLogParams(
            Long reportCode,
            Long admCode,
            String beforeStatus,
            String resultStatus,
            String eventType,
            String actionType,
            String memo) {

        Map<String, Object> params = new HashMap<>();

        params.put("reportCode", reportCode);
        params.put("admCode", admCode);
        params.put("previousStatus", beforeStatus);
        params.put("resultStatus", resultStatus);
        params.put("eventType", eventType);
        params.put("actionType", actionType);
        params.put("processMemo", memo);

        params.put("targetMemberCode", null);
        params.put("suspensionPeriod", null);
        params.put("suspendedUntil", null);
        params.put("relatedLogCode", null);

        params.put("createdAt", LocalDateTime.now(REPORT_ZONE));

        return params;
    }

    // 신고 상태 변경 및 이력 저장
    private void updateStatusAndInsertLog(Map<String, Object> params) {

        if (adminReportDao.updateReportStatus(params) != 1) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "신고 상태가 변경되었습니다. 다시 조회해 주세요.");
        }

        insertReportLog(params);
    }

		// 신고 상세 이력 + 신고 활동 로그 + 회원 조치 로그 저장
    private void insertReportLog(Map<String, Object> params) {

		// 1. 기존 신고 상세 이력 저장
		if (adminReportDao.insertReportLog(params) != 1) {
				throw new ResponseStatusException(
								HttpStatus.INTERNAL_SERVER_ERROR,
								"신고 처리 이력을 저장하지 못했습니다.");
		}

		Long reportCode = (Long) params.get("reportCode");
		Long adminCode = (Long) params.get("admCode");
		Long targetMemberCode =
						(Long) params.get("targetMemberCode");

		String eventType = (String) params.get("eventType");
		String actionType = (String) params.get("actionType");
		String resultStatus =
						(String) params.get("resultStatus");

		LocalDateTime createdAt =
						(LocalDateTime) params.get("createdAt");

		String memo = trimToNull(
						(String) params.get("processMemo"));

		// 검토 시작은 원래 메모가 없으므로 기본 문구 사용
		if (memo == null) {
				memo = "REVIEW".equals(eventType)
								? "신고 검토를 시작했습니다."
								: "신고 처리 이력이 기록되었습니다.";
		}

		// 2. 신고 처리 탭에 표시할 로그
		// 기존 REPORT_LOG에서는 완료와 기각 모두 PROCESS이므로
		// 활동 로그에서는 구분해서 저장
		String reportProcessType = eventType;

		if ("PROCESS".equals(eventType)) {
				reportProcessType = "REJECTED".equals(resultStatus)
								? "REJECT"
								: "RESOLVE";
		}

		adminActivityLogService.recordActivity(
						adminCode,
						"report",
						reportCode,
						reportProcessType,
						memo,
						createdAt,
						reportCode);

		// 3. 검토 시작·기각에는 회원 조치 로그를 남기지 않음
		if (targetMemberCode == null
						|| actionType == null
						|| !ACTION_TYPES.contains(actionType)) {
				return;
		}

		// 4. 실제 회원 제재 등록·취소·재적용 구분
		String memberProcessType = switch (eventType) {
				case "PROCESS" -> actionType;
				case "CANCEL" -> actionType + "_CANCEL";
				case "RESTORE" -> actionType + "_RESTORE";
				default -> null;
		};

		if (memberProcessType == null) {
				return;
		}

		// 5. 회원 탭에 표시할 로그
		// 신고 로그와 같은 reportCode로 연결
		adminActivityLogService.recordActivity(
						adminCode,
						"member",
						targetMemberCode,
						memberProcessType,
						memo,
						createdAt,
						reportCode);
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