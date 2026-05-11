package com.ss_dam.market.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ss_dam.market.MarketCategory;
import com.ss_dam.market.service.MarketCategoryService;

@RestController
@RequestMapping("/market_category")
public class MarketCategoryController {

  @Autowired
  MarketCategoryService categoryService;

  @GetMapping
  List<MarketCategory> searchCategories() {
    return categoryService.searchCategories();
  }

}
