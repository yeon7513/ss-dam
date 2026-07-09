package com.ss_dam.common.category.controller;

import com.ss_dam.common.category.model.Category;
import com.ss_dam.common.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

  @Autowired
  CategoryService categoryService;

  // 활성 상태에 따라 호출 분기 처리
  @GetMapping("/challenge/{status}")
  List<Category> loadChallengeCategories(@PathVariable String status) {
    if ("active".equalsIgnoreCase(status)) {
      // 피드 등록에서 사용할 활성화 중인 카테고리 조회
      return categoryService.loadActiveChallengeCategories();
    } else if ("all".equalsIgnoreCase(status)) {
      // 피드 목록에서 사용할 전체 카테고리 조회 (진행중, 진행완료 포함)
      return categoryService.loadAllChallengeCategories();
    }

    // 허용되지 않은 status 값이 들어오면 예외 발생
    throw new IllegalArgumentException("지원하지 않는 카테고리 상태값입니다: " + status);
  }

  @GetMapping("/market")
  List<Category> loadMarketCategories() {
    return categoryService.loadMarketCategories();
  }
}
