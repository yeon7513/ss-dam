package com.ss_dam.common.category.challenge.controller;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.category.challenge.model.response.AdminChallengeCategoryView;
import com.ss_dam.common.category.challenge.service.AdminChallengeCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/challenge/categories")
public class AdminChallengeCategoryController {

  @Autowired
  AdminChallengeCategoryService adminChallengeCategoryService;

  @GetMapping
  ResponseEntity<ApiResponse<List<AdminChallengeCategoryView>>> loadChallengeCategories() {

    List<AdminChallengeCategoryView> categories =
        adminChallengeCategoryService.loadAllChallengeCategories();

    return ResponseEntity.ok(ApiResponse.success("활성 상태의 챌린지 카테고리 조회 성공", categories));
  }
}
