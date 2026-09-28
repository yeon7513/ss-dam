package com.ss_dam.challenge.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.feed.model.response.UserFeedView;

public interface AdminChallengeDao {

  // 전체 인증글 / 인증한 챌린지 / 최근 30일 인증글
  AdminMemberProofsView loadMemberProofSummary(
          Map<String, Object> params);

  // 현재 페이지 인증글 목록
  List<UserFeedView> loadMemberProofs(
          Map<String, Object> params);

}