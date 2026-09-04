package com.ss_dam.common.category.market.service;

import com.ss_dam.common.category.market.dao.UserMarketCategoryDao;
import com.ss_dam.common.category.market.model.response.UserMarketCategoryView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMarketCategoryServiceImpl implements UserMarketCategoryService {

  @Autowired
  UserMarketCategoryDao userMarketCategoryDao;

  @Override
  public List<UserMarketCategoryView> loadActiveMarketCategories() {
    return userMarketCategoryDao.loadActiveMarketCategories();
  }

}
