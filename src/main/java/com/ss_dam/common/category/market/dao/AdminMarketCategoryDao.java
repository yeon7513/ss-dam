package com.ss_dam.common.category.market.dao;

import com.ss_dam.common.category.market.model.response.AdminMarketCategoryView;

import java.util.List;

public interface AdminMarketCategoryDao {

  List<AdminMarketCategoryView> loadAllMarketCategories();

}
