package com.ss_dam.auth.find.service;

import com.ss_dam.auth.find.model.ChangePassword;
import com.ss_dam.auth.find.model.FindMember;
import com.ss_dam.auth.login.model.response.MemberProfile;

public interface FindMemberService {

  MemberProfile findMemberId(FindMember findMember);

  Long findMemberPw(FindMember findMember);

  boolean changePw(ChangePassword changePassword);
}
