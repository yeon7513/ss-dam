package com.ss_dam.common.category.market.dao;

import com.ss_dam.common.category.market.model.response.UserMarketCategoryView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserMarketCategoryDaoImpl implements UserMarketCategoryDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<UserMarketCategoryView> loadActiveMarketCategories() {
    return sql.selectList("categoryMarketView.loadActiveMarketCategories");
  }

}
