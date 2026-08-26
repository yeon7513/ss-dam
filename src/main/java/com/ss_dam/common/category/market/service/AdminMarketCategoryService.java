package com.ss_dam.common.category.market.service;

import com.ss_dam.common.category.market.model.response.AdminMarketCategoryView;

import java.util.List;

public interface AdminMarketCategoryService {

  List<AdminMarketCategoryView> loadAllMarketCategories();
}
