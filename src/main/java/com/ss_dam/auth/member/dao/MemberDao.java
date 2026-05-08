package com.ss_dam.auth.member.dao;

import com.ss_dam.auth.member.Member;

public interface MemberDao {

  Member searchProfileById(String id);

}
