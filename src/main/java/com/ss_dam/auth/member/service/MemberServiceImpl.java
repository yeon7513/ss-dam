package com.ss_dam.auth.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.auth.member.dao.MemberDao;
import com.ss_dam.global.image.service.ImageService;

@Service
public class MemberServiceImpl implements MemberService {

  @Autowired
  ImageService imageService;

  @Autowired
  MemberDao memberDao;

  @Override
  public MemberProfile searchProfileByMemberCode(Long code) {
    return memberDao.searchProfileByMemberCode(code);
  }

  @Override
  public Long registerMember(Member member) {

    Long newCode = memberDao.registerMember(member);

    if (member.getFile() != null && !member.getFile().isEmpty()) {
      // 프로필 사진 업로드
      imageService.uploadSingleImage(member.getFile(), "profile", newCode);
    }

    return newCode;
  }

  @Override
  public Member searchMemberByCode(Long code) {
    return memberDao.searchMemberByCode(code);
  }


}
