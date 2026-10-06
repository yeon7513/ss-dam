package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.response.AdminChallengeEditState;
import com.ss_dam.challenge.model.response.AdminChallengeListView;

public interface AdminChallengeDao {

    // 목록 전체 건수
    long countChallenges(AdminChallengeSearch search);

    // 목록 조회
    List<AdminChallengeListView> loadChallenges(
            AdminChallengeSearch search);

    // 등록
    int createChallenge(Map<String, Object> params);

    // 수정·삭제·조기 완료를 위한 조회 및 행 잠금
    AdminChallengeEditState loadChallengeForUpdate(Long code);

    // 수정
    int updateChallenge(Map<String, Object> params);

    // 삭제 제한을 위한 참여·인증 이력 확인
    boolean hasChallengeHistory(Long code);

    // 논리 삭제
    int deleteChallenge(Map<String, Object> params);

    // 조기 완료
    int endChallenge(Map<String, Object> params);

    // 복구를 위한 삭제 여부 조회 및 행 잠금
    Integer loadDeleteYnForUpdate(Long code);

    // 복구
    int restoreChallenge(Map<String, Object> params);
}