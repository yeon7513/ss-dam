package com.ss_dam.auth.member.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.MemberProfile;

@Repository
public class MemberDaoImpl implements MemberDao {

  @Autowired
  SqlSession sql;

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

}
