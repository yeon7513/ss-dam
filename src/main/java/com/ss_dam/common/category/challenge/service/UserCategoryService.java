package com.ss_dam.common.category.challenge.service;

import com.ss_dam.common.category.core.Category;

import java.util.List;

public interface UserCategoryService {
  List<Category> loadAllChallengeCategories();

  List<Category> loadActiveChallengeCategories();

}
