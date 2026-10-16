package com.ss_dam.auth.member.mypage.dao;

import com.ss_dam.auth.member.Member;

public interface UserMypageDao {

  Member searchProfile(Long memberCode);

  long countCompletedChallenges(Long memberCode);

  Long searchChallengeRanking(Long memberCode);
}