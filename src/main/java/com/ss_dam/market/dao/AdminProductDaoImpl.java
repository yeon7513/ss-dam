package com.ss_dam.market.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

@Repository
public class AdminProductDaoImpl implements AdminProductDao {

  @Autowired
  private SqlSession sql;

  //관리자 상품 목록 전체 개수
  @Override
  public int countProducts(Map<String, Object> params) {
    return sql.selectOne(
        "adminProductView.countProducts", params);
  }
  
  //관리자 상품 목록 조회
  @Override
  public List<AdminProductView> loadProducts(Map<String, Object> params) {

    return sql.selectList(
        "adminProductView.loadProducts", params);
  }

  //관리자 상품 상세 조회
  @Override
  public AdminProductDetail loadProduct(Long prodCode){
    return sql.selectOne(
      "adminProductView.loadProduct", prodCode);
  }
}
