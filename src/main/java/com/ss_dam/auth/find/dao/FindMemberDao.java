package com.ss_dam.auth.find.dao;

import com.ss_dam.auth.find.model.ChangePassword;
import com.ss_dam.auth.find.model.FindMember;
import com.ss_dam.auth.login.model.response.MemberProfile;

import java.util.Map;

public interface FindMemberDao {
  MemberProfile findMemberId(FindMember findMember);

  Long findMemberPw(FindMember findMember);

  int changePassword(ChangePassword changePassword);

  int checkPassword(Map<String, Object> params);
}
