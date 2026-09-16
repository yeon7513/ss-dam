package com.ss_dam.auth.member.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberFeedsView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.feed.model.response.UserFeedView;

@Repository 
public class AdminMemberDaoImpl implements AdminMemberDao {

  
    @Autowired
    private SqlSession sql;

    // 검색 조건에 해당하는 전체 회원 수
    @Override
    public int countMembers(Map<String, Object> params) {
        return sql.selectOne("adminMember.countMembers", params);
    }

    // 관리자 회원 목록 조회
    @Override
    public List<AdminMemberView> loadMembers(
            Map<String, Object> params) {

        return sql.selectList("adminMember.loadMembers", params);
    }

    // 관리자 회원 상세 조회 — 기본 정보 및 프로필 사진
    @Override
    public AdminMemberDetailView loadMember(Long memberCode) {

        return sql.selectOne(
                "adminMember.loadMember",
                memberCode);
    }

    // 회원이 완료한 챌린지 수
    @Override
    public long countCompletedChallenges(Long memberCode) {
        return sql.selectOne(
                "adminMember.countCompletedChallenges",
                memberCode);
    }

    //상단 통계 - 신고 누적 수
    public long countReceivedReports(Long memberCode) {
        return sql.selectOne("adminMember.countReceivedReports",
            memberCode);
    }

    //상단 통계 - 피드 활동 (회원이 작성한 피드 수)
    @Override 
    public long countMemberFeeds(Long memberCode) {
        return sql.selectOne(
                "adminMember.countMemberFeeds",
                memberCode);
    }

    //상단 통계 - 거래 활동 (회원이 작성한 거래 수)
    @Override 
    public long countMemberTrades(Long memberCode) {
        return sql.selectOne(
                "adminMember.countMemberTrades",
                memberCode);
    }

    //상단 통계 - 로그인 횟수 
    
    @Override 
    public long countMemberLogins(Long memberCode) {
        return sql.selectOne(
            "adminMember.countMemberLogins",
            memberCode);
        
    }

    // 회원 상태 변경
    @Override
    public int updateMemberStatus(Map<String, Object> params) {
        return sql.update(
                "adminMember.updateMemberStatus",
                params);
    }

    // 관리자 회원 상태 변경 이력 저장
    @Override
    public int insertMemberStatusLog(Map<String, Object> params) {
        return sql.insert(
                "adminMember.insertMemberStatusLog",
                params);
    }
    // 회원 정지·해제 로그 전체 건수
    @Override
    public int countMemberLogs(Map<String, Object> params) {
        return sql.selectOne(
                "adminMember.countMemberLogs",
                params);
    }

    // 회원 정지·해제 로그 목록
    @Override
    public List<AdminActivity> loadMemberLogs(
            Map<String, Object> params) {

        return sql.selectList(
                "adminMember.loadMemberLogs",
                params);
    }

    // 회원 작성 피드 전체 통계
    @Override
    public AdminMemberFeedsView loadMemberFeedSummary(
            Map<String, Object> params) {

        return sql.selectOne(
                "adminMember.loadMemberFeedSummary",
                params);
    }

    // 회원 작성 피드 페이지 목록
    @Override
    public List<UserFeedView> loadMemberFeeds(
            Map<String, Object> params) {

        return sql.selectList(
                "adminMember.loadMemberFeeds",
                params);
    }

}
