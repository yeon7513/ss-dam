package com.ss_dam.admin.log.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.dao.AdminActivityLogDao;
import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;

@Service
public class AdminActivityLogServiceImpl
        implements AdminActivityLogService {

    @Autowired
    private AdminActivityLogDao adminActivityLogDao;

    @Autowired
    private AdminMemberDao adminMemberDao;

  //관리자 회원 상세 - 회원 정지·해제 로그 조회
    @Override
    @Transactional(readOnly = true)
    public PageResult<AdminActivity> loadMemberLogs(
            Long memberCode, PageQuery pageQuery) {

        // 페이지 입력값 검증
        if (pageQuery.getPage() < 1
                || pageQuery.getPerPage() < 1
                || pageQuery.getPerGroup() < 1) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "페이지 관련 값은 1 이상이어야 합니다.");
        }

        // 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        //해당 회원의 전체 로그 수
        //Pager로 페이지 번호를 표시하려면 필요
        int total = adminActivityLogDao.countMemberLogs(params);

        Pager pager = new Pager(pageQuery, total);

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        List<AdminActivity> logs =
                adminActivityLogDao.loadMemberLogs(params);

        return PageResult.of(logs, pager);
    }
}