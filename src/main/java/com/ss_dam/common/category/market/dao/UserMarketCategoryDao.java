package com.ss_dam.common.category.market.dao;

import com.ss_dam.common.category.market.model.response.UserMarketCategoryView;

import java.util.List;

public interface UserMarketCategoryDao {

  List<UserMarketCategoryView> loadActiveMarketCategories();

}
