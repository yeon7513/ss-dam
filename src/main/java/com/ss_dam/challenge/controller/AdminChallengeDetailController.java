package com.ss_dam.challenge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView;
import com.ss_dam.challenge.service.AdminChallengeDetailService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AdminAuthValidator;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin/challenge")
public class AdminChallengeDetailController {

    private final AdminChallengeDetailService adminChallengeDetailService;
    private final AdminAuthValidator adminAuthValidator;

    public AdminChallengeDetailController(
            AdminChallengeDetailService adminChallengeDetailService,
            AdminAuthValidator adminAuthValidator) {

        this.adminChallengeDetailService = adminChallengeDetailService;
        this.adminAuthValidator = adminAuthValidator;
    }

    // 챌린지 상세 조회
    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<AdminChallengeDetailView>> loadChallenge(
            @PathVariable Long code,
            HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        AdminChallengeDetailView result =
                adminChallengeDetailService.loadChallenge(code);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 상세 조회 성공", result));
    }

    // 챌린지 참여자 목록 조회
    @GetMapping("/{code}/participants")
    public ResponseEntity<ApiResponse<PageResult<AdminChallengeParticipantView>>>
            loadParticipants(
                    @PathVariable Long code,
                    @ModelAttribute PageQuery pageQuery,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        PageResult<AdminChallengeParticipantView> result =
                adminChallengeDetailService.loadParticipants(code, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 참여자 조회 성공", result));
    }

    // 챌린지 참여 순위 조회
    @GetMapping("/{code}/ranking")
    public ResponseEntity<ApiResponse<PageResult<AdminChallengeRankingView>>>
            loadChallengeRanking(
                    @PathVariable Long code,
                    @ModelAttribute PageQuery pageQuery,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        PageResult<AdminChallengeRankingView> result =
                adminChallengeDetailService.loadChallengeRanking(code, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 참여 순위 조회 성공", result));
    }

    // 챌린지 상세 통계 조회
    @GetMapping("/{code}/statistics")
    public ResponseEntity<ApiResponse<AdminChallengeStatisticsView>>
            loadChallengeStatistics(
                    @PathVariable Long code,
                    HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        AdminChallengeStatisticsView result =
                adminChallengeDetailService.loadChallengeStatistics(code);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 상세 통계 조회 성공", result));
    }
}