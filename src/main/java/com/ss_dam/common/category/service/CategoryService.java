package com.ss_dam.common.category.service;

import com.ss_dam.common.category.model.Category;

import java.util.List;

public interface CategoryService {
  List<Category> loadAllChallengeCategories();

  List<Category> loadMarketCategories();

  List<Category> loadActiveChallengeCategories();
}
