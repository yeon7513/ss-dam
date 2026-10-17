package com.ss_dam.auth.member.service;

import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.model.request.MemberUpdateRequest;

public interface MemberService {

  MemberProfile searchProfileByMemberCode(Long code);

  Long registerMember(Member member);

  Member searchMemberByCode(Long memberCode);

  // 중복이면 true, 사용 가능하면 false 반환
  boolean isIdDuplicated(String id);

  // 회원 정보 수정
  void updateMember(Long memberCode, MemberUpdateRequest request);

  // 회원 탈퇴
  void deleteMember(Long memberCode);

}
