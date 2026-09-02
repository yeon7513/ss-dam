package com.ss_dam.market.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.market.model.response.AdminProductView;

@Repository
public class AdminProductDaoImpl implements AdminProductDao {

  @Autowired
  private SqlSession sql;

  @Override
  public int countProducts(Map<String, Object> params) {
    return sql.selectOne(
        "adminProductView.countProducts", params);
  }

  @Override
  public List<AdminProductView> loadProducts(
      Map<String, Object> params) {

    return sql.selectList(
        "adminProductView.loadProducts", params);
  }
}
