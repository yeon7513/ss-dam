package com.ss_dam.auth.member.service;

import org.springframework.stereotype.Service;

import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.dao.MemberDao;
import com.ss_dam.common.image.service.ImageService;

@Service
public class MemberServiceImpl implements MemberService {

  private final MemberDao memberDao;
  private final ImageService imageService;

  public MemberServiceImpl (
    MemberDao memberDao,
    ImageService imageService
  ) {
    this.memberDao = memberDao;
    this.imageService = imageService;
  }
  
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

  // [추가] 아이디 중복 확인 (중복 시 true, 사용 가능 시 false)
  @Override
  public boolean isIdDuplicated(String id) {
    return memberDao.countById(id) > 0;
  }


}
