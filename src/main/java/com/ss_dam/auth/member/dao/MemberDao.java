package com.ss_dam.auth.member.dao;

import com.ss_dam.auth.member.MemberProfile;

public interface MemberDao {

  MemberProfile searchProfileByMemberCode(Long code);

}
