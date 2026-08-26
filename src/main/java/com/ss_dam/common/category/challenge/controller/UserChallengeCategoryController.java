package com.ss_dam.common.category.challenge.controller;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.category.challenge.model.response.UserChallengeCategoryView;
import com.ss_dam.common.category.challenge.service.UserChallengeCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/challenge/categories")
public class UserChallengeCategoryController {

  @Autowired
  UserChallengeCategoryService userChallengeCategoryService;

  @GetMapping
  ResponseEntity<ApiResponse<List<UserChallengeCategoryView>>> loadChallengeCategories() {

    List<UserChallengeCategoryView> categories =
        userChallengeCategoryService.loadActiveChallengeCategories();
    return ResponseEntity.ok(ApiResponse.success("활성 상태의 챌린지 카테고리 조회 성공", categories));
  }

}
