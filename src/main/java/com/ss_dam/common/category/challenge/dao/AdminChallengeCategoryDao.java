package com.ss_dam.common.category.challenge.dao;

import com.ss_dam.common.category.challenge.model.response.AdminChallengeCategoryView;

import java.util.List;

public interface AdminChallengeCategoryDao {
  List<AdminChallengeCategoryView> loadAllChallengeCategories();

}
