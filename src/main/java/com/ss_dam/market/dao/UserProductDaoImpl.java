package com.ss_dam.market.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.UserProductView;

@Repository
public class UserProductDaoImpl implements UserProductDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<UserProductView> loadProducts(Map<String, Object> params) {
    return sql.selectList("userProductView.loadProducts", params);
  }

  @Override
  public ProductDetail findProductDetailByProdCode(Map<String, Object> params) {
    return sql.selectOne("userProductView.findProductDetailByProdCode", params);
  }
}
