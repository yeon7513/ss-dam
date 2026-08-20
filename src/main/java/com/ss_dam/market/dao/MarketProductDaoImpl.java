package com.ss_dam.market.dao;

import com.ss_dam.market.model.MarketProduct;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MarketProductDaoImpl implements MarketProductDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<MarketProduct> searchProducts() {
    return sql.selectList("product.searchProducts");
  }

  @Override
  public MarketProduct searchProductByCode(Long code) {
    return sql.selectOne("product.searchProductByCode", code);
  }

}
