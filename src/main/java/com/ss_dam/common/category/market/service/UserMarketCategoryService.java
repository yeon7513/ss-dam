package com.ss_dam.common.category.market.service;

import com.ss_dam.common.category.market.model.response.UserMarketCategoryView;

import java.util.List;

public interface UserMarketCategoryService {

  List<UserMarketCategoryView> loadActiveMarketCategories();

}
