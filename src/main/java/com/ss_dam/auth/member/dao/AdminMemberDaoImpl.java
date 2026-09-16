package com.ss_dam.auth.member.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberView;

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

}
