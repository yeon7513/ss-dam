package com.ss_dam.admin.log.service;

import com.ss_dam.admin.log.dao.AdminActivityLogDao;
import com.ss_dam.admin.log.model.request.AdminActivityLogFilter;
import com.ss_dam.admin.log.model.response.AdminActivity;
import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.challenge.dao.AdminChallengeDetailDao;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.common.validator.PageQueryValidator;
import com.ss_dam.common.validator.challenge.AdminChallengeValidator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class AdminActivityLogServiceImpl implements AdminActivityLogService {

  // 허용 유형
  private static final Set<String> LOG_TARGET_TYPES =
      Set.of("report", "member", "feed", "challenge", "market", "admin");

  private final AdminActivityLogDao adminActivityLogDao;
  private final AdminMemberDao adminMemberDao;
  private final AdminChallengeDetailDao adminChallengeDetailDao;
  private final AdminChallengeValidator adminChallengeValidator;
  private final PageQueryValidator pageQueryValidator;

  public AdminActivityLogServiceImpl(AdminActivityLogDao adminActivityLogDao,
      AdminMemberDao adminMemberDao, AdminChallengeDetailDao adminChallengeDetailDao,
      AdminChallengeValidator adminChallengeValidator, PageQueryValidator pageQueryValidator) {
    this.adminActivityLogDao = adminActivityLogDao;
    this.adminMemberDao = adminMemberDao;
    this.adminChallengeDetailDao = adminChallengeDetailDao;
    this.adminChallengeValidator = adminChallengeValidator;
    this.pageQueryValidator = pageQueryValidator;
  }

  // 전체 관리자 활동 이력 조회
  @Override
  @Transactional(readOnly = true)
  public PageResult<AdminActivity> loadActivityLogs(AdminActivityLogFilter filter) {

    // 1. 페이지 검증
    pageQueryValidator.validate(filter);

    // 2. 문자열 검색 조건 정리
    String targetType = normalizeLogFilter(filter.getTargetType());
    String processType = normalizeLogFilter(filter.getProcessType());
    String keyword = normalizeLogFilter(filter.getKeyword());

    // 전체 탭은 targetType을 보내지 않음
    if (targetType != null && !LOG_TARGET_TYPES.contains(targetType)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "올바르지 않은 활동 대상 유형입니다.");
    }

    if (processType != null && processType.length() > 32) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "처리 유형은 32자 이하여야 합니다.");
    }

    if (keyword != null && keyword.length() > 100) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "검색어는 100자 이하여야 합니다.");
    }

    // 3. 번호 검증
    validateLogFilterCode(filter.getAdmCode(), "관리자 번호");
    validateLogFilterCode(filter.getTargetCode(), "대상 번호");
    validateLogFilterCode(filter.getReportCode(), "신고 번호");

    // 4. 날짜 검증
    LocalDate from = filter.getFrom();
    LocalDate to = filter.getTo();

    // MySQL DATETIME 범위 및 종료일 +1일 계산 범위 제한
    LocalDate minDate = LocalDate.of(1000, 1, 1);
    LocalDate maxDate = LocalDate.of(9999, 12, 30);

    if ((from != null && (from.isBefore(minDate) || from.isAfter(
        maxDate))) || (to != null && (to.isBefore(minDate) || to.isAfter(maxDate)))) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "조회 날짜 범위를 확인해 주세요.");
    }

    if (from != null && to != null && from.isAfter(to)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "시작일은 종료일보다 늦을 수 없습니다.");
    }

    // 5. 조회 조건 생성
    Map<String, Object> params = new HashMap<>();
    params.put("targetType", targetType);
    params.put("processType", processType);
    params.put("admCode", filter.getAdmCode());
    params.put("targetCode", filter.getTargetCode());
    params.put("reportCode", filter.getReportCode());

    // %, _를 검색 와일드카드가 아닌 문자로 처리
    String keywordPattern = keyword == null ?
        null :
        "%" + keyword.replace("!", "!!").replace("%", "!%").replace("_", "!_") + "%";

    params.put("keywordPattern", keywordPattern);

    params.put("fromAt", from == null ? null : from.atStartOfDay());

    // 종료일 다음 날 00:00 미만으로 조회
    params.put("toExclusive", to == null ? null : to.plusDays(1).atStartOfDay());

    // 6. 전체 건수 및 페이지 목록 조회
    long total = adminActivityLogDao.countActivityLogs(params);

    Pager pager = new Pager(filter, total);

    params.put("offset", filter.getOffset());
    params.put("perPage", filter.getPerPage());

    List<AdminActivity> logs = adminActivityLogDao.loadActivityLogs(params);

    return PageResult.of(logs, pager);
  }

  private String normalizeLogFilter(String value) {
    return value == null || value.isBlank() ? null : value.trim();
  }

  private void validateLogFilterCode(Long code, String label) {
    if (code != null && code < 1) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, label + "는 1 이상이어야 합니다.");
    }
  }

  // 회원 정지·해제 이력 조회
  @Override
  @Transactional(readOnly = true)
  public PageResult<AdminActivity> loadMemberLogs(Long memberCode, PageQuery pageQuery) {

    pageQueryValidator.validate(pageQuery);

    // 회원 존재 여부 확인
    if (adminMemberDao.loadMember(memberCode) == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다.");
    }

    Map<String, Object> params = new HashMap<>();
    params.put("memberCode", memberCode);

    int total = adminActivityLogDao.countMemberLogs(params);

    Pager pager = new Pager(pageQuery, total);

    params.put("offset", pageQuery.getOffset());
    params.put("perPage", pager.getPerPage());

    List<AdminActivity> logs = adminActivityLogDao.loadMemberLogs(params);

    return PageResult.of(logs, pager);
  }

  // 챌린지 처리 이력 조회
  @Override
  @Transactional(readOnly = true)
  public PageResult<AdminActivity> loadChallengeLogs(Long code, PageQuery pageQuery) {

    adminChallengeValidator.validateCode(code);
    pageQueryValidator.validate(pageQuery);

    // 삭제된 챌린지의 이력도 조회 가능
    if (!adminChallengeDetailDao.existsChallengeIncludingDeleted(code)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 챌린지입니다.");
    }

    Map<String, Object> params = new HashMap<>();
    params.put("code", code);

    long total = adminActivityLogDao.countChallengeLogs(params);

    Pager pager = new Pager(pageQuery, total);

    params.put("offset", pageQuery.getOffset());
    params.put("perPage", pager.getPerPage());

    List<AdminActivity> logs = adminActivityLogDao.loadChallengeLogs(params);

    return PageResult.of(logs, pager);
  }

  // 일반 관리자 처리 이력 저장
  // 기존 호출부는 그대로 사용하고, 관련 신고 번호는 null로 저장
  @Override
  @Transactional
  public void recordActivity(Long adminCode, String targetType, Long targetCode, String processType,
      String memo, LocalDateTime createdAt) {

    recordActivity(adminCode, targetType, targetCode, processType, memo, createdAt, null);
  }

  // 신고와 연결된 관리자 처리 이력 저장
  @Override
  @Transactional
  public void recordActivity(Long adminCode, String targetType, Long targetCode, String processType,
      String memo, LocalDateTime createdAt, Long reportCode) {

    Map<String, Object> params = new HashMap<>();
    params.put("adminCode", adminCode);
    params.put("targetType", targetType);
    params.put("targetCode", targetCode);
    params.put("processType", processType);
    params.put("memo", memo);
    params.put("createdAt", createdAt);
    params.put("reportCode", reportCode);

    int inserted = adminActivityLogDao.insertActivityLog(params);

    if (inserted != 1) {
      throw new IllegalStateException("관리자 처리 이력 저장에 실패했습니다.");
    }
  }

  // 해당하는 관리자의 활동 내역 조회
  @Override
  public PageResult<AdminActivity> loadActivityLogsByAdminCode(Long targetCode,
      PageQuery pageQuery) {
    Map<String, Object> params = new HashMap<>();

    params.put("targetCode", targetCode);

    long total = adminActivityLogDao.countActivityLogs(params);

    Pager pager = new Pager(pageQuery, total);

    params.put("offset", pageQuery.getOffset());
    params.put("perPage", pager.getPerPage());

    List<AdminActivity> activities = adminActivityLogDao.loadActivityLogsByAdminCode(params);

    return PageResult.of(activities, pager);
  }
}
