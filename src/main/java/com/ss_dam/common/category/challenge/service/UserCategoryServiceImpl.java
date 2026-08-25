package com.ss_dam.common.category.challenge.service;

import com.ss_dam.common.category.core.Category;
import com.ss_dam.common.category.dao.CategoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCategoryServiceImpl implements UserCategoryService {

  @Autowired
  CategoryDao categoryDao;

  @Override
  public List<Category> loadAllChallengeCategories() {
    return categoryDao.loadAllChallengeCategories();
  }

  @Override
  public List<Category> loadActiveChallengeCategories() {
    return categoryDao.loadActiveChallengeCategories();
  }

}
