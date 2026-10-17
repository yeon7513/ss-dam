package com.ss_dam.auth.member.mypage.service;

import java.util.Map;

import com.ss_dam.auth.member.mypage.model.filter.MypageChallengeSearchFilter;
import com.ss_dam.auth.member.mypage.model.response.MypageChallengeView;
import com.ss_dam.auth.member.mypage.model.response.MypageProfileView;
import com.ss_dam.common.pager.PageResult;

public interface UserMypageService {

  MypageProfileView getProfile(Long memberCode);

  // 참여한 챌린지 목록 (페이지네이션)
  PageResult<MypageChallengeView> getMyChallenges(MypageChallengeSearchFilter filter, Long memberCode);

  // 참여한 챌린지 요약
  Map<String, Object> getMyChallengeSummary(Long memberCode);
}