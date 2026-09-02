package com.ss_dam.market.service;

import java.util.List;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.response.AdminProductView;

public interface AdminProductService {
  
  //관리자 상품 목록 조회
  List<AdminProductView> loadProducts(Pager pager);

  

}
