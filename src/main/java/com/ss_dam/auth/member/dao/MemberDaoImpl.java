package com.ss_dam.auth.member.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;

@Repository
public class MemberDaoImpl implements MemberDao {

  private final SqlSession sql;

  public MemberDaoImpl (SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public MemberProfile searchProfileByMemberCode(Long code) {
    return sql.selectOne("member.searchProfileByMemberCode", code);
  }

  @Override
  public Long registerMember(Member member) {
    sql.insert("member.registerMember", member);

    return member.getCode();
  }

  @Override
  public Member searchMemberByCode(Long code) {
    return sql.selectOne("member.searchMemberByCode", code);
  }

  // 아이디 중복 확인
  @Override
  public int countById(String id) {
    return sql.selectOne("member.countById", id);
  }

  // 수정·탈퇴 대상 조회 및 잠금
  @Override
  public Long findMemberCodeForUpdate(Long memberCode) {
    return sql.selectOne(
        "member.findMemberCodeForUpdate", memberCode
    );
  }

  // 회원 정보 수정
  @Override
  public int updateMember(Member member) {
    return sql.update("member.updateMember", member);
  }

  // 회원 탈퇴
  @Override
  public int deleteMember(Long memberCode) {
    return sql.update("member.deleteMember", memberCode);
  }

  // 기존 프로필 이미지 논리 삭제
  @Override
  public int deleteProfileImages(Long memberCode) {
    return sql.update("member.deleteProfileImages", memberCode);
  }
  
}
