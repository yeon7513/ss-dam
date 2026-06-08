package com.ss_dam.auth.member.service;

import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.MemberProfile;

public interface MemberService {

  MemberProfile searchProfileByMemberCode(Long code);

  Long registerMember(Member member);

  Member searchMemberByCode(Long memberCode);

}
