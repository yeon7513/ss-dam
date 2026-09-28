package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.feed.model.response.UserFeedView;

@Repository
public class AdminChallengeDaoImpl implements AdminChallengeDao {

    @Autowired
    private SqlSession sql;

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