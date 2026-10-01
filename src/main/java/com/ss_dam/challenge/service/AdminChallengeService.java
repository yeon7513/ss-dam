package com.ss_dam.challenge.service;

import org.springframework.web.multipart.MultipartFile;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.request.AdminChallengeWriteRequest;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView;
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
            MultipartFile image,
            Long adminCode,
            String adminId);
    
    // 관리자 챌린지 수정
    void updateChallenge(
        Long code,
        AdminChallengeWriteRequest request,
        MultipartFile image,
        boolean removeImage,
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

    // 삭제된 챌린지 복구
    void restoreChallenge(
            Long code,
            String reason,
            Long adminCode,
            String adminId);

    // 챌린지 참여자 목록 조회
    PageResult<AdminChallengeParticipantView> loadParticipants(
            Long code,
            PageQuery pageQuery);

    // 챌린지 관리 처리 이력 조회
    PageResult<AdminActivity> loadChallengeLogs(
            Long code,
            PageQuery pageQuery);

    // 관리자 챌린지 상세 통계 조회
    AdminChallengeStatisticsView loadChallengeStatistics(Long code);

    // 관리자 챌린지 참여 순위 조회
    PageResult<AdminChallengeRankingView> loadChallengeRanking(
            Long code,
            PageQuery pageQuery);
    
    // 관리자 회원 상세 - 회원 인증글 통계와 페이지 목록
    AdminMemberProofsView loadMemberProofs(
            Long memberCode, PageQuery pageQuery);
}