package com.ss_dam.market.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.dao.AdminProductDao;
import com.ss_dam.market.model.response.AdminProductView;
import com.ss_dam.market.model.response.ProductDetail;

@Service
public class AdminProductServiceImpl implements AdminProductService {

  @Autowired
  private AdminProductDao adminProductDao;

  //관리자 - 상품 목록 조회
  @Override
  public List<AdminProductView> loadProducts(Pager pager){
    Map<String, Object> params = new HashMap<>();
    //Objects는 유틸리티 클래스라서 String 값을 넣을 수 없습니다. 다음처럼 **단수형 Object**로 수정

    //검색 조건
    params.put("search", pager.getSearch());
    params.put("keyword", pager.getKeyword());

    //검색 조건에 해당하는 전체 상품 수
    int total = adminProductDao.countProducts(params);
    pager.setTotal(total);

    //페이지네이션
    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return adminProductDao.loadProducts(params);

  }

  //관리자 - 상품 상세 조회
  @Override
  public ProductDetail loadProduct(Long prodCode){
    return adminProductDao.loadProduct(prodCode);
  }

  //관리자 - 상품 선택 삭제
    //관리자 - 상품 단건 삭제
    @Override 
    public void deleteProduct(Long prodCode) {
      int updatedCount = adminProductDao.deleteProduct(prodCode);

      if(updatedCount == 0) {
        throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
        " 상품이 존재하지 않거나 이미 삭제되었습니다"
        );
      }
    }





  
}
