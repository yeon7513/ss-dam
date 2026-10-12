package com.ss_dam.challenge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.challenge.model.request.analysis_request.AdminChallengeAnalysisSearch;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisDetailView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisListView;
import com.ss_dam.challenge.model.response.analysis_response.AdminChallengeAnalysisStatisticsView;
import com.ss_dam.challenge.service.AdminChallengeAnalysisService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AdminAuthValidator;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin/challenge/analysis")
public class AdminChallengeAnalysisController {

    private final AdminChallengeAnalysisService analysisService;
    private final AdminAuthValidator adminAuthValidator;

    public AdminChallengeAnalysisController(
            AdminChallengeAnalysisService analysisService,
            AdminAuthValidator adminAuthValidator) {

        this.analysisService = analysisService;
        this.adminAuthValidator = adminAuthValidator;
    }

  // 종료 챌린지 목록 조회
  @GetMapping
  public ResponseEntity<ApiResponse<PageResult<AdminChallengeAnalysisListView>>>
          loadChallenges(
                  @ModelAttribute AdminChallengeAnalysisSearch search,
                  HttpSession session) {

      adminAuthValidator.requireAdmin(session);

      PageResult<AdminChallengeAnalysisListView> result =
              analysisService.loadChallenges(search);

      return ResponseEntity.ok(
              ApiResponse.success("종료 챌린지 목록 조회 성공", result));
  }
    // 종료 챌린지 상세 정보 조회
    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<AdminChallengeAnalysisDetailView>>
            loadChallenge(
                    @PathVariable("code") Long code,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        AdminChallengeAnalysisDetailView result =
                analysisService.loadChallenge(code);

        return ResponseEntity.ok(
                ApiResponse.success("종료 챌린지 상세 조회 성공", result));
    }

    // 종료 챌린지 통계 및 차트 조회
    @GetMapping("/{code}/statistics")
    public ResponseEntity<ApiResponse<AdminChallengeAnalysisStatisticsView>>
            loadChallengeStatistics(
                    @PathVariable("code") Long code,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        AdminChallengeAnalysisStatisticsView result =
                analysisService.loadChallengeStatistics(code);

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
                analysisService.loadChallengeRanking(code, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("종료 챌린지 참여 순위 조회 성공", result));
    }
}