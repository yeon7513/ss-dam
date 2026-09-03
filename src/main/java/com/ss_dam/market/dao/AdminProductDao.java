package com.ss_dam.market.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

public interface AdminProductDao {

  //관리자 상품 목록 전체 개수
  int countProducts(Map<String, Object> params);

  //관리자 상품 목록 조회
  List<AdminProductView> loadProducts(Map<String, Object> params);

  //관리자 상품 상세 조회
  AdminProductDetail loadProduct(Long prodCode);

  
} 