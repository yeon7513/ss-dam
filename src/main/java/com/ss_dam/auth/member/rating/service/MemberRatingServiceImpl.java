package com.ss_dam.auth.member.rating.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ss_dam.auth.member.rating.dao.MemberRatingDao;

@Service
public class MemberRatingServiceImpl implements MemberRatingService {

  private final MemberRatingDao memberRatingDao;

  public MemberRatingServiceImpl(MemberRatingDao memberRatingDao) {
    this.memberRatingDao = memberRatingDao;
  }

  @Override
  @Transactional(readOnly = true)
  public long getRatingScore(Long memberCode) {
    return memberRatingDao.getRatingScore(memberCode);
  }
}