package com.ss_dam.common.category.market.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ss_dam.common.category.market.dao.UserMarketCategoryDao;
import com.ss_dam.common.category.market.model.response.UserMarketCategoryView;

@Service
public class UserMarketCategoryServiceImpl implements UserMarketCategoryService {

  private final UserMarketCategoryDao userMarketCategoryDao;

  public UserMarketCategoryServiceImpl (UserMarketCategoryDao userMarketCategoryDao) {
    this.userMarketCategoryDao = userMarketCategoryDao;
  }

  @Override
  public List<UserMarketCategoryView> loadActiveMarketCategories() {
    return userMarketCategoryDao.loadActiveMarketCategories();
  }

}
