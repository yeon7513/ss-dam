package com.ss_dam.admin.report.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.report.dao.UserReportDao;
import com.ss_dam.admin.report.model.request.CreateReportRequest;

@Service
public class UserReportServiceImpl implements UserReportService {

    private static final Set<String> TARGET_TYPES =
            Set.of("feed", "market", "comment", "user");

    private final UserReportDao userReportDao;

    public UserReportServiceImpl(UserReportDao userReportDao) {
        this.userReportDao = userReportDao;
    }

    // 사용자 신고 등록
    @Override 
    @Transactional 
    public Long createReport(Long reporterCode, CreateReportRequest request) {

      // 1. 로그인 회원 번호 확인
      if (reporterCode == null || reporterCode < 1) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다");
      }

      // 2. 요청값 확인
      if (request == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "신고 내용을 입력해 주세요");
      }

  
      String targetType = trimToNull(request.getTargetType());
      Long targetCode = request.getTargetCode();
      String reasonType = trimToNull(request.getReasonType());
      String content = trimToNull(request.getContent());

      if (targetType == null || !TARGET_TYPES.contains(targetType)) {
          throw new ResponseStatusException(
                  HttpStatus.BAD_REQUEST,
                  "신고 대상 유형은 feed, market, comment, user 중 하나여야 합니다.");
      }

      if (targetCode == null || targetCode < 1) {
          throw new ResponseStatusException(
                  HttpStatus.BAD_REQUEST,
                  "올바르지 않은 신고 대상 번호입니다.");
      }

      if (reasonType == null || reasonType.length() > 32) {
          throw new ResponseStatusException(
                  HttpStatus.BAD_REQUEST,
                  "신고 사유는 필수이며 32자 이하여야 합니다.");
      }

      if (content != null && content.length() > 4000) {
          throw new ResponseStatusException(
                  HttpStatus.BAD_REQUEST,
                  "신고 상세 내용은 4000자 이하여야 합니다.");
      }

      // 3. 신고자 회원 확인 및 행 잠금
      // 같은 회원의 동시 신고 요청을 순서대로 처리
      // 트랜잭션 종료 시 잠금 해제
      Long memberCode = userReportDao.lockReporter(reporterCode);

      if (memberCode == null) {
          throw new ResponseStatusException(
                  HttpStatus.UNAUTHORIZED,
                  "신고 가능한 회원 정보를 찾을 수 없습니다.");
      }

      Map<String, Object> params = new HashMap<>();
      params.put("reporterCode", reporterCode);
      params.put("targetType", targetType);
      params.put("targetCode", targetCode);
      params.put("reasonType", reasonType);
      params.put("content", content);

      // 4. 신고 대상 존재 여부 및 소유자 확인
      // user이면 대상 회원 번호, 콘텐츠이면 작성자 번호 반환
      Long targetMemberCode =
              userReportDao.findTargetMemberCode(params);

      if (targetMemberCode == null) {
          throw new ResponseStatusException(
                  HttpStatus.NOT_FOUND,
                  "존재하지 않거나 삭제된 신고 대상입니다.");
      }

      // 5. 본인 또는 본인 콘텐츠 신고 금지
      if (reporterCode.equals(targetMemberCode)) {
          throw new ResponseStatusException(
                  HttpStatus.BAD_REQUEST,
                  "본인 또는 본인이 작성한 콘텐츠는 신고할 수 없습니다.");
      }

      // 6. 동일 회원의 동일 대상 미처리 신고 확인
      // 신고 사유가 달라도 PENDING, IN_REVIEW 신고가 있으면 차단
      Long pendingReportCode =
              userReportDao.findPendingReportCode(params);

      if (pendingReportCode != null) {
          throw new ResponseStatusException(
                  HttpStatus.CONFLICT,
                  "이미 접수되어 처리 중인 신고입니다.");
      }

      // 7. PENDING 상태로 신고 저장
      // 접수 단계에서는 REPORT_LOG를 저장하지 않음
      int insertedCount = userReportDao.insertReport(params);

      if (insertedCount != 1) {
          throw new ResponseStatusException(
                  HttpStatus.INTERNAL_SERVER_ERROR,
                  "신고 등록에 실패했습니다.");
      }

      // 8. DB에서 생성한 신고 번호 반환
      Number generatedCode = (Number) params.get("reportCode");

      if (generatedCode == null) {
          throw new ResponseStatusException(
                  HttpStatus.INTERNAL_SERVER_ERROR,
                  "생성된 신고 번호를 확인할 수 없습니다.");
      }

      return generatedCode.longValue();
  }

  // 앞뒤 공백 제거 및 빈 문자열 처리
  private String trimToNull(String value) {
      if (value == null || value.isBlank()) {
          return null;
      }

      return value.trim();
  }
}