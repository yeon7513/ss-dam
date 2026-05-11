package com.ss_dam.market.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.market.MarketCategory;
import com.ss_dam.market.dao.MarketCategoryDao;

@Service
public class MarketCategoryServiceImpl implements MarketCategoryService {

  @Autowired
  MarketCategoryDao categoryDao;

  @Override
  public List<MarketCategory> searchCategories() {
    return categoryDao.searchCategories();
  }

}
