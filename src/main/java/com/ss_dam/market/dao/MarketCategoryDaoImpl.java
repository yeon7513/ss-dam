package com.ss_dam.market.dao;

import com.ss_dam.market.model.MarketCategory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MarketCategoryDaoImpl implements MarketCategoryDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<MarketCategory> searchCategories() {
    return sql.selectList("category.searchCategories");
  }

}
