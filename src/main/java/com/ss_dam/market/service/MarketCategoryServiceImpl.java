package com.ss_dam.market.service;

import com.ss_dam.market.dao.MarketCategoryDao;
import com.ss_dam.market.model.MarketCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarketCategoryServiceImpl implements MarketCategoryService {

  @Autowired
  MarketCategoryDao categoryDao;

  @Override
  public List<MarketCategory> searchCategories() {
    return categoryDao.searchCategories();
  }

}
