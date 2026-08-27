package com.ss_dam.common.category.challenge.service;

import com.ss_dam.common.category.challenge.model.response.AdminChallengeCategoryView;

import java.util.List;

public interface AdminChallengeCategoryService {
  List<AdminChallengeCategoryView> loadAllChallengeCategories();

}
