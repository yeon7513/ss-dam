package com.ss_dam.market.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.dao.AdminProductDao;
import com.ss_dam.market.model.response.AdminProductView;

@Service
public class AdminProductServiceImpl implements AdminProductService {

  @Autowired
  private AdminProductDao adminProductDao;

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
  
}
