package com.ss_dam.market.service;

import java.util.List;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

public interface AdminProductService {
  
  //관리자 - 상품 목록 조회
  List<AdminProductView> loadProducts(Pager pager);

  //관리자 - 상품 목록 삭제
  ProductDetail loadProduct(Long prodCode);

  //관리자 - 상품 선택 삭제
    //관리자 - 상품 단건 삭제
    void deleteProduct(Long prodCode);
  

}
