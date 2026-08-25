package com.ss_dam.common.category.challenge.dao;

import com.ss_dam.common.category.core.Category;

import java.util.List;

public interface UserCategoryDao {
  List<Category> loadAllChallengeCategories();

  List<Category> loadActiveChallengeCategories();

}
