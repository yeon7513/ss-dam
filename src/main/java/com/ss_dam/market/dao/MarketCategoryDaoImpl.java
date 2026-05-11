package com.ss_dam.market.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.market.MarketCategory;

@Repository
public class MarketCategoryDaoImpl implements MarketCategoryDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<MarketCategory> searchCategories() {
    return sql.selectList("category.searchCategories");
  }

}
