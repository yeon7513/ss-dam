package com.ss_dam.challenge.service;

import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.request.AdminChallengeWriteRequest;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface AdminChallengeService {

    // 관리자 챌린지 진행현황 목록 조회 
    PageResult<AdminChallengeListView> loadChallenges(
        AdminChallengeSearch search);
    
    // 관리자 챌린지 진행현황 상세 조회
    AdminChallengeDetailView loadChallenge(Long code);

    // 관리자 챌린지 등록
    Long createChallenge(
            AdminChallengeWriteRequest request,
            Long adminCode,
            String adminId);
    
    // 관리자 챌린지 수정
    void updateChallenge(
        Long code,
        AdminChallengeWriteRequest request,
        Long adminCode,
        String adminId);

    // 관리자 챌린지 논리 삭제
    void deleteChallenge(
        Long code,
        Long adminCode,
        String adminId);

    // 관리자 챌린지 조기 완료
    void endChallenge(
            Long code,
            Long adminCode,
            String adminId);    
    
    // 관리자 회원 상세 - 회원 인증글 통계와 페이지 목록
    AdminMemberProofsView loadMemberProofs(
            Long memberCode, PageQuery pageQuery);
}