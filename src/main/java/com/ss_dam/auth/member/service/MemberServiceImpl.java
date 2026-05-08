package com.ss_dam.auth.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.dao.MemberDao;

@Service
public class MemberServiceImpl implements MemberService {

  @Autowired
  MemberDao memberDao;

  @Override
  public Member searchProfileById(String id) {
    return memberDao.searchProfileById(id);
  }


}
