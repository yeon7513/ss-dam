package com.ss_dam.common.category.market.controller;

import com.ss_dam.common.category.market.model.response.AdminMarketCategoryView;
import com.ss_dam.common.category.market.service.AdminMarketCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// 이 컨트롤러는 프론트엔드로 피드, 마켓 등록 시 사용하는
// 카테고리를 불러오는 컨트롤러임.
// -> 읽기 전용!!


@RestController
@RequestMapping("/api/admin/market/categories")
public class AdminMarketCategoryController {

  @Autowired
  AdminMarketCategoryService adminMarketCategoryService;

  @GetMapping
  List<AdminMarketCategoryView> loadAllMarketCategories() {
    return adminMarketCategoryService.loadAllMarketCategories();
  }
}

