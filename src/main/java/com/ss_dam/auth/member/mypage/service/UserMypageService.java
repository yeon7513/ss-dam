package com.ss_dam.auth.member.mypage.service;

import com.ss_dam.auth.member.mypage.model.response.MypageProfileView;

public interface UserMypageService {

  MypageProfileView getProfile(Long memberCode);
}