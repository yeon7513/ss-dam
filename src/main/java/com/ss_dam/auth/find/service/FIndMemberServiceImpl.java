package com.ss_dam.auth.find.service;

import com.ss_dam.auth.find.dao.FindMemberDao;
import com.ss_dam.auth.find.model.ChangePassword;
import com.ss_dam.auth.find.model.FindMember;
import com.ss_dam.auth.login.model.response.MemberProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FIndMemberServiceImpl implements FindMemberService {

  @Autowired
  FindMemberDao dao;

  @Override
  public MemberProfile findMemberId(FindMember findMember) {
    return dao.findMemberId(findMember);
  }

  @Override
  public Long findMemberPw(FindMember findMember) {
    return dao.findMemberPw(findMember);
  }

  @Override
  public boolean changePw(ChangePassword changePassword) {
    int result = dao.changePassword(changePassword);
    return result == 1;
  }
}
