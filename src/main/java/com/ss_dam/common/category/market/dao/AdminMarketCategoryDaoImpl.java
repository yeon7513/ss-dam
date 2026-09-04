package com.ss_dam.common.category.market.dao;

import com.ss_dam.common.category.market.model.response.AdminMarketCategoryView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminMarketCategoryDaoImpl implements AdminMarketCategoryDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<AdminMarketCategoryView> loadAllMarketCategories() {
    return sql.selectList("categoryMarketView.loadAllMarketCategories");
  }

}
