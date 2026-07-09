package com.ss_dam.common.category.dao;

import com.ss_dam.common.category.model.Category;

import java.util.List;

public interface CategoryDao {
  List<Category> loadAllChallengeCategories();

  List<Category> loadMarketCategories();

  List<Category> loadActiveChallengeCategories();
}
