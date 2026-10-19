package com.ss_dam.auth.member.mypage.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.auth.member.mypage.model.filter.MypageChallengeSearchFilter;
import com.ss_dam.auth.member.mypage.model.response.MypageChallengeView;
import com.ss_dam.auth.member.mypage.model.response.MypageProfileView;
import com.ss_dam.auth.member.mypage.service.UserMypageService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.validator.auth.AuthValidator;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/mypage")
public class UserMypageController {

  @GetMapping("/sales")
  public ResponseEntity<ApiResponse<PageResult<Map<String, Object>>>> getMySales(
      PageQuery query, HttpSession session) {
    AuthProfile member = authValidator.requireMember(session);
    return ResponseEntity.ok(ApiResponse.success("판매 목록 조회 성공",
        mypageService.getMySales(query, member.getCode())));
  }

  @GetMapping("/sales/summary")
  public ResponseEntity<ApiResponse<Map<String, Object>>> getMySalesSummary(HttpSession session) {
    AuthProfile member = authValidator.requireMember(session);
    return ResponseEntity.ok(ApiResponse.success("판매 요약 조회 성공",
        mypageService.getMySalesSummary(member.getCode())));
  }

  @GetMapping("/liked-feeds/summary")
  public ResponseEntity<ApiResponse<Map<String, Object>>> getLikedFeedSummary(HttpSession session) {
    AuthProfile member = authValidator.requireMember(session);
    return ResponseEntity.ok(ApiResponse.success("좋아요 피드 요약 조회 성공",
        mypageService.getLikedFeedSummary(member.getCode())));
  }

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

  // 참여한 챌린지 목록
  // GET /api/mypage/challenges?page=1&perPage=10&status=JOINED&keyword=텀블러
  @GetMapping("/challenges")
  public ResponseEntity<ApiResponse<PageResult<MypageChallengeView>>> getMyChallenges(
      MypageChallengeSearchFilter filter,
      HttpSession session
  ) {
    AuthProfile loginUser = authValidator.requireMember(session);

    PageResult<MypageChallengeView> challenges =
        mypageService.getMyChallenges(filter, loginUser.getCode());

    return ResponseEntity.ok(
        ApiResponse.success("참여한 챌린지 목록 조회 성공", challenges)
    );
  }

  // 참여한 챌린지 요약
  @GetMapping("/challenges/summary")
  public ResponseEntity<ApiResponse<Map<String, Object>>> getMyChallengeSummary(
      HttpSession session
  ) {
    AuthProfile loginUser = authValidator.requireMember(session);

    Map<String, Object> summary =
        mypageService.getMyChallengeSummary(loginUser.getCode());

    return ResponseEntity.ok(
        ApiResponse.success("참여한 챌린지 요약 조회 성공", summary)
    );
  }
}
