package com.ss_dam.common.category.challenge.service;

import com.ss_dam.common.category.challenge.dao.AdminChallengeCategoryDao;
import com.ss_dam.common.category.challenge.model.response.AdminChallengeCategoryView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminChallengeCategoryServiceImpl implements AdminChallengeCategoryService {

  @Autowired
  AdminChallengeCategoryDao adminChallengeCategoryDao;

  @Override
  public List<AdminChallengeCategoryView> loadAllChallengeCategories() {
    return adminChallengeCategoryDao.loadAllChallengeCategories();
  }

}
