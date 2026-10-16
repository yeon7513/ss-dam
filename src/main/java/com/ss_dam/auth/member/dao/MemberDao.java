package com.ss_dam.auth.member.dao;

import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;

public interface MemberDao {

  MemberProfile searchProfileByMemberCode(Long code);

  Long registerMember(Member member);

  Member searchMemberByCode(Long code);

  // 아이디 중복 확인 쿼리 호출
  int countById(String id);

  // 수정·탈퇴 대상 조회 및 잠금
  Long findMemberCodeForUpdate(Long memberCode);

  // 회원 정보 수정
  int updateMember(Member member);

  // 회원 탈퇴
  int deleteMember(Long memberCode);

  // 기존 프로필 이미지 논리 삭제
  int deleteProfileImages(Long memberCode);


}
