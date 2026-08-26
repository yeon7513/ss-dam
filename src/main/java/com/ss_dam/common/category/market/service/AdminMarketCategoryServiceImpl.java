package com.ss_dam.common.category.market.service;

import com.ss_dam.common.category.market.dao.AdminMarketCategoryDao;
import com.ss_dam.common.category.market.model.response.AdminMarketCategoryView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminMarketCategoryServiceImpl implements AdminMarketCategoryService {

  @Autowired
  AdminMarketCategoryDao adminMarketCategoryDao;

  @Override
  public List<AdminMarketCategoryView> loadAllMarketCategories() {
    return adminMarketCategoryDao.loadAllMarketCategories();
  }

}
