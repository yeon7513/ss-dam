package com.ss_dam.auth.member.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.auth.member.dao.MemberDao;

@Service
public class MemberServiceImpl implements MemberService {

  @Autowired
  MemberDao memberDao;

  @Override
  public List<MemberProfile> searchProfileByMemberCode(Long code) {
    return memberDao.searchProfileByMemberCode(code);
  }


}
