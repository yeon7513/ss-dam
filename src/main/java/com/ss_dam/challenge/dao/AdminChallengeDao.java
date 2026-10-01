package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

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

public interface AdminChallengeDao {

	// 관리자 챌린지 진행현황 목록 조회 - 전체 대상 건수
	long countChallenges(AdminChallengeSearch search);

	// 관리자 챌린지 진행현황 목록 조회 - 현재 페이지 목록
	List<AdminChallengeListView> loadChallenges(
					AdminChallengeSearch search);
	
	// 관리자 챌린지 진행현황 상세 조회
	AdminChallengeDetailView loadChallenge(Long code);

	// 관리자 챌린지 등록
	int createChallenge(Map<String, Object> params);

	// 관리자 챌린지 수정 - 수정 검사용 조회 및 행 잠금
	AdminChallengeEditState loadChallengeForUpdate(Long code);

	// 관리자 챌린지 수정 - 기존 수정 메서드 유지
	int updateChallenge(Map<String, Object> params);

	// 관리자 챌린지 논리 삭제 조건 - 참여 이력 또는 인증글 존재 여부
	boolean hasChallengeHistory(Long code);

	// 관리자 챌린지 논리 삭제
	int deleteChallenge(Map<String, Object> params);

	// 관리자 챌린지 조기 완료
	int endChallenge(Map<String, Object> params);

	// 삭제된 챌린지를 포함하여 삭제 여부 조회 및 행 잠금
	Integer loadDeleteYnForUpdate(Long code);

	// 삭제된 챌린지 복구
	int restoreChallenge(Map<String, Object> params);

	// 삭제 여부와 관계없이 챌린지 존재 확인
	boolean existsChallengeIncludingDeleted(Long code);

	// 챌린지 참여자 전체 건수
	long countParticipants(Map<String, Object> params);

	// 챌린지 참여자 목록
	List<AdminChallengeParticipantView> loadParticipants(
					Map<String, Object> params);

	// 챌린지 처리 이력 전체 건수
	long countChallengeLogs(Map<String, Object> params);

	// 챌린지 처리 이력 목록
	List<AdminActivity> loadChallengeLogs(
					Map<String, Object> params);

	// 챌린지 상세 통계 - 지정 기간에 작성된 인증글 수
	long countNewChallengeProofs(Map<String, Object> params);

	// 챌린지 상세 통계 - 지정 기간에 처음 참여한 회원 수
	long countNewChallengeParticipants(Map<String, Object> params);

	// 챌린지 상세 통계 - 오늘·어제의 시간별 신규 참여자 수
	List<AdminChallengeHourlyCount> loadChallengeHourlyParticipants(
					Map<String, Object> params);

	// 관리자 챌린지 참여 순위 조회
	List<AdminChallengeRankingView> loadChallengeRanking(
					Map<String, Object> params);

  // 관리자 회원 상세 -  전체 인증글 / 인증한 챌린지 / 최근 30일 인증글
  AdminMemberProofsView loadMemberProofSummary(
          Map<String, Object> params);

  //관리자 회원 상세 - 현재 페이지 인증글 목록
  List<UserFeedView> loadMemberProofs(
          Map<String, Object> params);

}