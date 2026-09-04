package com.ss_dam.common.category.challenge.service;

import com.ss_dam.common.category.challenge.dao.UserChallengeCategoryDao;
import com.ss_dam.common.category.challenge.model.response.UserChallengeCategoryView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserChallengeCategoryServiceImpl implements UserChallengeCategoryService {

  @Autowired
  UserChallengeCategoryDao userChallengeCategoryDao;

  @Override
  public List<UserChallengeCategoryView> loadActiveChallengeCategories() {
    return userChallengeCategoryDao.loadActiveChallengeCategories();
  }

}
