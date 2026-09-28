package com.ss_dam.challenge.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.challenge.dao.AdminChallengeDao;
import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.response.UserFeedView;

@Service
public class AdminChallengeServiceImpl implements AdminChallengeService {

    @Autowired
    private AdminChallengeDao adminChallengeDao;

    @Autowired
    private AdminMemberDao adminMemberDao;

        //관리자 회원 상세 - 회원 인증글 통계와 페이지 목록
        @Override
        @Transactional(readOnly = true)
        public AdminMemberProofsView loadMemberProofs(
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

        // 3. 해당 회원의 전체 인증글 기준 통계
        AdminMemberProofsView result =
                adminChallengeDao.loadMemberProofSummary(params);

        // 4. 공통 페이지 계산 기능 재사용
        Pager pager = new Pager(
                pageQuery, result.getTotalProofCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 5. 현재 페이지 인증글 목록
        List<UserFeedView> proofs =
                adminChallengeDao.loadMemberProofs(params);

        // 6. 통계 + 목록 + 페이지 정보 반환
        result.setProofs(PageResult.of(proofs, pager));

        return result;
        }

}