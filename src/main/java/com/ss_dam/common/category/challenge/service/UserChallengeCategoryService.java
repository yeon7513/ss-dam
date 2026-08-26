package com.ss_dam.common.category.challenge.service;

import com.ss_dam.common.category.challenge.model.response.UserChallengeCategoryView;

import java.util.List;

public interface UserChallengeCategoryService {

  List<UserChallengeCategoryView> loadActiveChallengeCategories();

}
