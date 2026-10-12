package com.ss_dam.common.category.challenge.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ss_dam.common.category.challenge.dao.UserChallengeCategoryDao;
import com.ss_dam.common.category.challenge.model.response.UserChallengeCategoryView;

@Service
public class UserChallengeCategoryServiceImpl implements UserChallengeCategoryService {

  private final UserChallengeCategoryDao userChallengeCategoryDao;

  public UserChallengeCategoryServiceImpl (UserChallengeCategoryDao userChallengeCategoryDao) {
    this.userChallengeCategoryDao = userChallengeCategoryDao;
  }
  
  @Override
  public List<UserChallengeCategoryView> loadActiveChallengeCategories() {
    return userChallengeCategoryDao.loadActiveChallengeCategories();
  }

}
