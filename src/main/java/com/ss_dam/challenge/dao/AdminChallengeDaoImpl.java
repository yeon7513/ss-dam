package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.response.AdminChallengeEditState;
import com.ss_dam.challenge.model.response.AdminChallengeListView;

@Repository
public class AdminChallengeDaoImpl implements AdminChallengeDao {

    @Autowired
    private SqlSession sql;

    // 챌린지 목록 - 전체 건수
    @Override
    public long countChallenges(AdminChallengeSearch search) {
        return sql.selectOne(
                "adminChallenge.countChallenges",
                search);
    }

    // 챌린지 목록 조회
    @Override
    public List<AdminChallengeListView> loadChallenges(
            AdminChallengeSearch search) {

        return sql.selectList(
                "adminChallenge.loadChallenges",
                search);
    }

    // 챌린지 등록
    @Override
    public int createChallenge(Map<String, Object> params) {
        return sql.insert(
                "adminChallenge.createChallenge",
                params);
    }

    // 수정·삭제·조기 완료를 위한 조회 및 행 잠금
    @Override
    public AdminChallengeEditState loadChallengeForUpdate(Long code) {
        return sql.selectOne(
                "adminChallenge.loadChallengeForUpdate",
                Map.of("code", code));
    }

    // 챌린지 수정
    @Override
    public int updateChallenge(Map<String, Object> params) {
        return sql.update(
                "adminChallenge.updateChallenge",
                params);
    }

    // 삭제 제한을 위한 참여 이력·인증글 존재 여부 확인
    @Override
    public boolean hasChallengeHistory(Long code) {
        return sql.selectOne(
                "adminChallenge.hasChallengeHistory",
                Map.of("code", code));
    }

    // 챌린지 논리 삭제
    @Override
    public int deleteChallenge(Map<String, Object> params) {
        return sql.update(
                "adminChallenge.deleteChallenge",
                params);
    }

    // 챌린지 조기 완료
    @Override
    public int endChallenge(Map<String, Object> params) {
        return sql.update(
                "adminChallenge.endChallenge",
                params);
    }

    // 복구를 위한 삭제 여부 조회 및 행 잠금
    @Override
    public Integer loadDeleteYnForUpdate(Long code) {
        return sql.selectOne(
                "adminChallenge.loadDeleteYnForUpdate",
                Map.of("code", code));
    }

    // 삭제된 챌린지 복구
    @Override
    public int restoreChallenge(Map<String, Object> params) {
        return sql.update(
                "adminChallenge.restoreChallenge",
                params);
    }
}