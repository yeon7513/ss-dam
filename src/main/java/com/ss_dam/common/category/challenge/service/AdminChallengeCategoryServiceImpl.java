package com.ss_dam.common.category.challenge.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ss_dam.common.category.challenge.dao.AdminChallengeCategoryDao;
import com.ss_dam.common.category.challenge.model.response.AdminChallengeCategoryView;

@Service
public class AdminChallengeCategoryServiceImpl implements AdminChallengeCategoryService { 

  private final AdminChallengeCategoryDao adminChallengeCategoryDao;

  public AdminChallengeCategoryServiceImpl (AdminChallengeCategoryDao adminChallengeCategoryDao) {
    this.adminChallengeCategoryDao = adminChallengeCategoryDao;
  }

  @Override
  public List<AdminChallengeCategoryView> loadAllChallengeCategories() {
    return adminChallengeCategoryDao.loadAllChallengeCategories();
  }

}
