package com.ss_dam.common.category.market.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.common.category.market.model.response.AdminMarketCategoryView;

@Repository
public class AdminMarketCategoryDaoImpl implements AdminMarketCategoryDao {

  private final SqlSession sql;

  public AdminMarketCategoryDaoImpl (SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public List<AdminMarketCategoryView> loadAllMarketCategories() {
    return sql.selectList("categoryMarketView.loadAllMarketCategories");
  }

}
