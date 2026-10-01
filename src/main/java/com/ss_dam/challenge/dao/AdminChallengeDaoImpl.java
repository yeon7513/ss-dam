package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeEditState;
import com.ss_dam.challenge.model.response.AdminChallengeHourlyCount;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
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

    // 관리자 챌린지 수정
    @Override
    public AdminChallengeEditState loadChallengeForUpdate(Long code) {

        return sql.selectOne(
                "adminChallengeView.loadChallengeForUpdate",
                Map.of("code", code));
    }

    @Override
    public int updateChallenge(Map<String, Object> params) {

        return sql.update(
                "adminChallengeCommand.updateChallenge",
                params);
    }

    // 관리자 챌린지 논리 삭제
    @Override
    public boolean hasChallengeHistory(Long code) {

        return sql.selectOne(
                "adminChallengeView.hasChallengeHistory",
                Map.of("code", code));
    }

    @Override
    public int deleteChallenge(Map<String, Object> params) {

        return sql.update(
                "adminChallengeCommand.deleteChallenge",
                params);
    }

    // 관리자 챌린지 조기 완료
    @Override
    public int endChallenge(Map<String, Object> params) {

        return sql.update(
                "adminChallengeCommand.endChallenge",
                params);
    }

    // 삭제된 챌린지를 포함하여 삭제 여부 조회 및 행 잠금
    @Override
    public Integer loadDeleteYnForUpdate(Long code) {

        return sql.selectOne(
                "adminChallengeView.loadDeleteYnForUpdate",
                Map.of("code", code));
    }


    // 삭제된 챌린지 복구
    @Override
    public int restoreChallenge(Map<String, Object> params) {

        return sql.update(
                "adminChallengeCommand.restoreChallenge",
                params);
    }


    // 삭제 여부와 관계없이 챌린지 존재 확인
    @Override
    public boolean existsChallengeIncludingDeleted(Long code) {

        return sql.selectOne(
                "adminChallengeView.existsChallengeIncludingDeleted",
                Map.of("code", code));
    }


    // 챌린지 참여자 전체 건수
    @Override
    public long countParticipants(Map<String, Object> params) {

        return sql.selectOne(
                "adminChallengeView.countParticipants",
                params);
    }


    // 챌린지 참여자 목록
    @Override
    public List<AdminChallengeParticipantView> loadParticipants(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeView.loadParticipants",
                params);
    }


    // 챌린지 처리 이력 전체 건수
    @Override
    public long countChallengeLogs(Map<String, Object> params) {

        return sql.selectOne(
                "adminChallengeView.countChallengeLogs",
                params);
    }


    // 챌린지 처리 이력 목록
    @Override
    public List<AdminActivity> loadChallengeLogs(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeView.loadChallengeLogs",
                params);
    }

    // 챌린지 상세 통계 - 지정 기간에 작성된 인증글 수
    @Override
    public long countNewChallengeProofs(Map<String, Object> params) {

        return sql.selectOne(
                "adminChallengeView.countNewChallengeProofs",
                params);
    }


    // 챌린지 상세 통계 - 지정 기간에 처음 참여한 회원 수
    @Override
    public long countNewChallengeParticipants(
            Map<String, Object> params) {

        return sql.selectOne(
                "adminChallengeView.countNewChallengeParticipants",
                params);
    }


    // 챌린지 상세 통계 - 오늘·어제의 시간별 신규 참여자 수
    @Override
    public List<AdminChallengeHourlyCount> loadChallengeHourlyParticipants(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeView.loadChallengeHourlyParticipants",
                params);
    }

    // 관리자 챌린지 참여 순위 조회
    @Override
    public List<AdminChallengeRankingView> loadChallengeRanking(
            Map<String, Object> params) {

        return sql.selectList(
                "adminChallengeView.loadChallengeRanking",
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