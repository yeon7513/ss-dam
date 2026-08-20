package com.ss_dam.common.category.service;

import com.ss_dam.common.category.dao.CategoryDao;
import com.ss_dam.common.category.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

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

  @Override
  public List<Category> loadMarketCategories() {
    return categoryDao.loadMarketCategories();
  }


}
