package com.ss_dam.auth.member.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.auth.member.Member;

@Repository
public class MemberDaoImpl implements MemberDao {

  @Autowired
  SqlSession sql;

  @Override
  public Member searchProfileById(String id) {
    return sql.selectOne("member.searchProfileById", id);
  }

}
