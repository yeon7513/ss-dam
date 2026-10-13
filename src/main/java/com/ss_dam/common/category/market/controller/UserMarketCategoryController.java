package com.ss_dam.common.category.market.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.category.market.model.response.UserMarketCategoryView;
import com.ss_dam.common.category.market.service.UserMarketCategoryService;

// 이 컨트롤러는 프론트엔드로 피드, 마켓 등록 시 사용하는
// 카테고리를 불러오는 컨트롤러임.
// -> 읽기 전용!!


@RestController
@RequestMapping("/api/market/categories")
public class UserMarketCategoryController {

  private final UserMarketCategoryService userMarketCategoryService;

  public UserMarketCategoryController (UserMarketCategoryService userMarketCategoryService) {
    this.userMarketCategoryService = userMarketCategoryService;
  }

  // 마켓 카테고리 (상위 & 하위)
  @GetMapping
  ResponseEntity<ApiResponse<List<UserMarketCategoryView>>> loadActiveMarketCategories() {
    List<UserMarketCategoryView> categories =
        userMarketCategoryService.loadActiveMarketCategories();

    return ResponseEntity.ok(ApiResponse.success("다시쓰담 카테고리 조회 성공", categories));
  }
}

