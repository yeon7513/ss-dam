package com.ss_dam.admin.log.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.dao.AdminActivityLogDao;
import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.challenge.dao.AdminChallengeDetailDao;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.common.validator.PageQueryValidator;
import com.ss_dam.common.validator.challenge.AdminChallengeValidator;

@Service
public class AdminActivityLogServiceImpl implements AdminActivityLogService {

	private final AdminActivityLogDao adminActivityLogDao;
	private final AdminMemberDao adminMemberDao;
	private final AdminChallengeDetailDao adminChallengeDetailDao;
	private final AdminChallengeValidator adminChallengeValidator;
	private final PageQueryValidator pageQueryValidator;

	public AdminActivityLogServiceImpl (
		AdminActivityLogDao adminActivityLogDao,
		AdminMemberDao adminMemberDao,
		AdminChallengeDetailDao adminChallengeDetailDao,
		AdminChallengeValidator adminChallengeValidator,
		PageQueryValidator pageQueryValidator
	) {
		this.adminActivityLogDao = adminActivityLogDao;
		this.adminMemberDao = adminMemberDao;
		this.adminChallengeDetailDao = adminChallengeDetailDao;
		this.adminChallengeValidator = adminChallengeValidator;
		this.pageQueryValidator = pageQueryValidator;
	}

    // 회원 정지·해제 이력 조회
    @Override
    @Transactional(readOnly = true)
    public PageResult<AdminActivity> loadMemberLogs(
            Long memberCode,
            PageQuery pageQuery) {

        pageQueryValidator.validate(pageQuery);

        // 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        int total =
                adminActivityLogDao.countMemberLogs(params);

        Pager pager = new Pager(pageQuery, total);

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        List<AdminActivity> logs =
                adminActivityLogDao.loadMemberLogs(params);

        return PageResult.of(logs, pager);
    }

    // 챌린지 처리 이력 조회
    @Override
    @Transactional(readOnly = true)
    public PageResult<AdminActivity> loadChallengeLogs(
            Long code,
            PageQuery pageQuery) {

        adminChallengeValidator.validateCode(code);
        pageQueryValidator.validate(pageQuery);

        // 삭제된 챌린지의 이력도 조회 가능
        if (!adminChallengeDetailDao.existsChallengeIncludingDeleted(code)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 챌린지입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);

        long total =
                adminActivityLogDao.countChallengeLogs(params);

        Pager pager = new Pager(pageQuery, total);

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        List<AdminActivity> logs =
                adminActivityLogDao.loadChallengeLogs(params);

        return PageResult.of(logs, pager);
    }

    // 관리자 처리 이력 저장
    @Override
    @Transactional
    public void recordActivity(
            Long adminCode,
            String targetType,
            Long targetCode,
            String processType,
            String memo,
            LocalDateTime createdAt) {

        Map<String, Object> params = new HashMap<>();
        params.put("adminCode", adminCode);
        params.put("targetType", targetType);
        params.put("targetCode", targetCode);
        params.put("processType", processType);
        params.put("memo", memo);
        params.put("createdAt", createdAt);

        int inserted =
                adminActivityLogDao.insertActivityLog(params);

        if (inserted != 1) {
            throw new IllegalStateException(
                    "관리자 처리 이력 저장에 실패했습니다.");
        }
    }
}