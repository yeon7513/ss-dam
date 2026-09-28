package com.ss_dam.feed.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.dao.AdminFeedDao;
import com.ss_dam.feed.model.response.AdminMemberFeedsView;
import com.ss_dam.feed.model.response.UserFeedView;

@Service
public class AdminFeedServiceImpl implements AdminFeedService {

    @Autowired
    private AdminFeedDao adminFeedDao;

    @Autowired
    private AdminMemberDao adminMemberDao;

    // 관리자 회원 상세 - 작성 피드 탭
    @Override
    @Transactional(readOnly = true)
    public AdminMemberFeedsView loadMemberFeeds(
            Long memberCode, PageQuery pageQuery) {

        // 페이지 입력값 확인
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

        // 전체 대상 피드의 통계 조회
        AdminMemberFeedsView result =
                adminFeedDao.loadMemberFeedSummary(params);

        // 기존 페이지 계산 기능 사용
        Pager pager = new Pager(pageQuery, result.getTotalFeedCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 현재 페이지의 피드 목록 조회
        List<UserFeedView> feeds =
                adminFeedDao.loadMemberFeeds(params);

        result.setFeeds(PageResult.of(feeds, pager));

        return result;
    }
}