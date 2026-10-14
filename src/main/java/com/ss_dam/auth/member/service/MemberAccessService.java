package com.ss_dam.auth.member.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.report.dao.AdminReportDao;

@Service
public class MemberAccessService {

    private static final ZoneId ACCESS_ZONE =
            ZoneId.of("Asia/Seoul");

    private final AdminReportDao adminReportDao;

    public MemberAccessService(AdminReportDao adminReportDao) {
        this.adminReportDao = adminReportDao;
    }

    // 회원의 현재 서비스 이용 가능 여부 확인
    @Transactional(readOnly = true)
    public void checkMemberAccess(Long memberCode) {

        // 1. 회원 번호 확인
        if (memberCode == null || memberCode < 1) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "회원 로그인 정보가 없습니다.");
        }

        // 2. 기존 회원 상태 확인
        String status =
                adminReportDao.findMemberAccessStatus(memberCode);

        if (status == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "존재하지 않는 회원입니다.");
        }

        if ("WITHDRAW".equals(status)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "탈퇴 처리된 계정입니다.");
        }

        if ("SUSPENDED".equals(status)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "이용 정지 중인 계정입니다.");
        }

        if ("SLEEP".equals(status)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "휴면 해제 후 이용해 주세요.");
        }

        if (!"ACTIVE".equals(status)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "현재 이용할 수 없는 계정 상태입니다.");
        }

        // 3. 현재 적용 중인 신고 제재 확인
        Map<String, Object> params = Map.of(
                "memberCode", memberCode,
                "now", LocalDateTime.now(ACCESS_ZONE));

        String restriction =
                adminReportDao.findEffectiveReportRestriction(params);

        if ("WITHDRAW".equals(restriction)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "관리자에 의해 강제 탈퇴 처리된 계정입니다.");
        }

        if ("SUSPEND".equals(restriction)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "신고 처리로 이용 정지 중인 계정입니다.");
        }

        // 제한 없음 또는 정지 기간 만료 시 정상 통과
        // WARNING은 이용 차단 대상이 아님
    }
}