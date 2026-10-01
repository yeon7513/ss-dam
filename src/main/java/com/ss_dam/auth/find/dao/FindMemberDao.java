package com.ss_dam.auth.find.dao;

import com.ss_dam.auth.login.model.request.ChangePassword;
import com.ss_dam.auth.login.model.request.FindMember;
import com.ss_dam.auth.login.model.response.MemberProfile;

public interface FindMemberDao {
    MemberProfile findMemberId(FindMember findMember);

    Long findMemberPw(FindMember findMember);

    int changePassword(ChangePassword changePassword);
}
