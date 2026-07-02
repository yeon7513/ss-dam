package com.ss_dam.market.controller;

import com.ss_dam.market.model.MarketCategory;
import com.ss_dam.market.service.MarketCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/market_category")
public class MarketCategoryController {

  @Autowired
  MarketCategoryService categoryService;

  @GetMapping
  List<MarketCategory> searchCategories() {
    return categoryService.searchCategories();
  }

}
