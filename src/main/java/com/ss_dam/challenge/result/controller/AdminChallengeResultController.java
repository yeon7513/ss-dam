package com.ss_dam.challenge.result.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.result.model.request.AdminChallengeResultSearch;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultDetailView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultListView;
import com.ss_dam.challenge.result.model.response.AdminChallengeResultStatisticsView;
import com.ss_dam.challenge.result.service.AdminChallengeResultService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AdminAuthValidator;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin/challenge/result")
public class AdminChallengeResultController {

    private final AdminChallengeResultService resultService;
    private final AdminAuthValidator adminAuthValidator;

    public AdminChallengeResultController(
            AdminChallengeResultService resultService,
            AdminAuthValidator adminAuthValidator) {

        this.resultService = resultService;
        this.adminAuthValidator = adminAuthValidator;
    }

  // 종료 챌린지 목록 조회
  @GetMapping
  public ResponseEntity<ApiResponse<PageResult<AdminChallengeResultListView>>>
          loadChallenges(
                  @ModelAttribute AdminChallengeResultSearch search,
                  HttpSession session) {

      adminAuthValidator.requireAdmin(session);

      PageResult<AdminChallengeResultListView> result =
              resultService.loadChallenges(search);

      return ResponseEntity.ok(
              ApiResponse.success("종료 챌린지 목록 조회 성공", result));
  }
    // 종료 챌린지 상세 정보 조회
    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<AdminChallengeResultDetailView>>
            loadChallenge(
                    @PathVariable("code") Long code,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        AdminChallengeResultDetailView result =
                resultService.loadChallenge(code);

        return ResponseEntity.ok(
                ApiResponse.success("종료 챌린지 상세 조회 성공", result));
    }

    // 종료 챌린지 통계 및 차트 조회
    @GetMapping("/{code}/statistics")
    public ResponseEntity<ApiResponse<AdminChallengeResultStatisticsView>>
            loadChallengeStatistics(
                    @PathVariable("code") Long code,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        AdminChallengeResultStatisticsView result =
                resultService.loadChallengeStatistics(code);

        return ResponseEntity.ok(
                ApiResponse.success("종료 챌린지 통계 조회 성공", result));
    }

    // 종료 챌린지 참여 순위 조회
    @GetMapping("/{code}/ranking")
    public ResponseEntity<ApiResponse<PageResult<AdminChallengeRankingView>>>
            loadChallengeRanking(
                    @PathVariable("code") Long code,
                    @ModelAttribute PageQuery pageQuery,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        PageResult<AdminChallengeRankingView> result =
                resultService.loadChallengeRanking(code, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("종료 챌린지 참여 순위 조회 성공", result));
    }
}