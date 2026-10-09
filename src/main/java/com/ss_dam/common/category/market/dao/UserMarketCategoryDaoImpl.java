package com.ss_dam.common.category.market.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.common.category.market.model.response.UserMarketCategoryView;

@Repository
public class UserMarketCategoryDaoImpl implements UserMarketCategoryDao {

  private final SqlSession sql;

  public UserMarketCategoryDaoImpl (SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public List<UserMarketCategoryView> loadActiveMarketCategories() {
    return sql.selectList("categoryMarketView.loadActiveMarketCategories");
  }

}
