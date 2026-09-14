package com.ss_dam.auth.member.service;

import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.MemberProfile;

public interface MemberService {

  MemberProfile searchProfileByMemberCode(Long code);

  Long registerMember(Member member);

  Member searchMemberByCode(Long memberCode);

  // 중복이면 true, 사용 가능하면 false 반환
    boolean isIdDuplicated(String id);

}
