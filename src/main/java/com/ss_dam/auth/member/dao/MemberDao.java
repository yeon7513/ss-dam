package com.ss_dam.auth.member.dao;

import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.MemberProfile;

public interface MemberDao {

  MemberProfile searchProfileByMemberCode(Long code);

  Long registerMember(Member member);

  Member searchMemberByCode(Long code);

  // 아이디 중복 확인 쿼리 호출
  int countById(String id);

}
