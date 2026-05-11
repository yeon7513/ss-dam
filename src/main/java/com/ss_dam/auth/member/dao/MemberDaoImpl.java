package com.ss_dam.auth.member.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.auth.member.MemberProfile;

@Repository
public class MemberDaoImpl implements MemberDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<MemberProfile> searchProfileByMemberCode(Long code) {
    return sql.selectList("member.searchProfileByMemberCode", code);
  }

}
