package com.ss_dam.auth.member.mypage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.auth.member.mypage.model.response.MypageProfileView;
import com.ss_dam.auth.member.mypage.service.UserMypageService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.validator.auth.AuthValidator;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/mypage")
public class UserMypageController {

  private final UserMypageService mypageService;
  private final AuthValidator authValidator;

  public UserMypageController(
      UserMypageService mypageService,
      AuthValidator authValidator
  ) {
    this.mypageService = mypageService;
    this.authValidator = authValidator;
  }

  @GetMapping("/profile")
  public ResponseEntity<ApiResponse<MypageProfileView>> getProfile(
      HttpSession session
  ) {
    AuthProfile loginUser = authValidator.requireMember(session);

    MypageProfileView profile =
        mypageService.getProfile(loginUser.getCode());

    return ResponseEntity.ok(
        ApiResponse.success("마이페이지 프로필 조회 성공", profile)
    );
  }
}