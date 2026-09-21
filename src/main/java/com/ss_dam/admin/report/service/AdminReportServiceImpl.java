package com.ss_dam.admin.report.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.report.dao.AdminReportDao;
import com.ss_dam.admin.report.model.response.AdminMemberReportsView;
import com.ss_dam.admin.report.model.response.ReportView;
import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;

@Service
public class AdminReportServiceImpl implements AdminReportService {

    @Autowired
    private AdminReportDao adminReportDao;

    @Autowired
    private AdminMemberDao adminMemberDao;

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

}