package com.ss_dam.common.category.market.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ss_dam.common.category.market.dao.AdminMarketCategoryDao;
import com.ss_dam.common.category.market.model.response.AdminMarketCategoryView;

@Service
public class AdminMarketCategoryServiceImpl implements AdminMarketCategoryService {

  private final AdminMarketCategoryDao adminMarketCategoryDao;

  public AdminMarketCategoryServiceImpl (AdminMarketCategoryDao adminMarketCategoryDao) {
    this.adminMarketCategoryDao = adminMarketCategoryDao;
  }

  @Override
  public List<AdminMarketCategoryView> loadAllMarketCategories() {
    return adminMarketCategoryDao.loadAllMarketCategories();
  }

}
