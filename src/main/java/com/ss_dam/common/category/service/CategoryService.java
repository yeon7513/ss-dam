package com.ss_dam.common.category.service;

import com.ss_dam.common.category.core.Category;

import java.util.List;

public interface CategoryService {
  List<Category> loadAllChallengeCategories();

  List<Category> loadActiveChallengeCategories();

  List<Category> loadActiveMarketCategories();

  List<Category> loadAllMarketCategories();
}
