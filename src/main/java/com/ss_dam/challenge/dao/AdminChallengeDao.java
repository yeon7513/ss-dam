package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
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






  // 관리자 회원 상세 -  전체 인증글 / 인증한 챌린지 / 최근 30일 인증글
  AdminMemberProofsView loadMemberProofSummary(
          Map<String, Object> params);

  //관리자 회원 상세 - 현재 페이지 인증글 목록
  List<UserFeedView> loadMemberProofs(
          Map<String, Object> params);

}