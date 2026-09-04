package com.ss_dam.common.category.challenge.dao;

import com.ss_dam.common.category.challenge.model.response.UserChallengeCategoryView;

import java.util.List;

public interface UserChallengeCategoryDao {

  List<UserChallengeCategoryView> loadActiveChallengeCategories();

}
