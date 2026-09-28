package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.feed.model.response.UserFeedView;

@Repository
public class AdminChallengeDaoImpl implements AdminChallengeDao {

    @Autowired
    private SqlSession sql;


    // 관리자 챌린지 진행현황 목록 조회 - 전체 대상 건수
    @Override 
    public long countChallenges(AdminChallengeSearch search) {
        return sql.selectOne("adminChallengeView.countChallenges", search);
    }

    // 관리자 챌린지 진행현황 목록 조회 - 현재 페이지 목록
    @Override 
    public List<AdminChallengeListView> loadChallenges(
            AdminChallengeSearch search) {

        return sql.selectList(
            "adminChallengeView.loadChallenges", search);
        }

    // 관리자 챌린지 진행현황 상세 조회
    @Override 
    public AdminChallengeDetailView loadChallenge(Long code) {

        return sql.selectOne(
            "adminChallengeView.loadChallenge", 
            //XML의 #{code}와 연결되도록 Map에 담아 전달
            Map.of("code", code));
    }

    // 관리자 챌린지 등록
    @Override
    public int createChallenge(Map<String, Object> params) {

        return sql.insert(
                "adminChallengeCommand.createChallenge",
                params);
    }





    //관리자 회원 상세 - 인증글 통계
    @Override
    public AdminMemberProofsView loadMemberProofSummary(
            Map<String, Object> params) {

        return sql.selectOne(
                "adminChallengeView.loadMemberProofSummary", params);
    }

    //관리자 회원 상세 - 인증글 페이지 목록
    @Override
    public List<UserFeedView> loadMemberProofs(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeView.loadMemberProofs", params);
    }
}