package com.ss_dam.market.service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.dao.AdminProductDao;
import com.ss_dam.market.model.response.AdminProductView;
import com.ss_dam.market.model.response.ProductDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminProductServiceImpl implements AdminProductService {

  @Autowired
  private AdminProductDao adminProductDao;

  //관리자 - 상품 목록 조회
  @Override
  public List<AdminProductView> loadProducts(Pager pager) {
    Map<String, Object> params = new HashMap<>();
    //Objects는 유틸리티 클래스라서 String 값을 넣을 수 없습니다. 다음처럼 **단수형 Object**로 수정

    //검색 조건
    //    params.put("searchCode", pager.getSearchCode());
    //    params.put("keyword", pager.getKeyword());

    //검색 조건에 해당하는 전체 상품 수
    int total = adminProductDao.countProducts(params);
    pager.setTotal(total);

    //페이지네이션
    //    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return adminProductDao.loadProducts(params);

  }

  //관리자 - 상품 상세 조회
  @Override
  public ProductDetail loadProduct(Long prodCode) {
    return adminProductDao.loadProduct(prodCode);
  }

  //관리자 - 상품 선택 삭제
  //관리자 - 상품 단건 삭제 + [처리 사유 + 로그에 남길 관리자 번호]
  @Transactional
  //상품 삭제와 로그 저장을 하나의 작업으로 묶기 위해서
  //-1. 상품의 delete_yn을 1로 변경
  //-2. 관리자 번호와 처리 사유를 로그에 저장
  //@Transactional이 있으면,
  //로그 저장 중 오류가 발생했을 때 앞서 실행한 상품 삭제도 취소 -> 롤백(rollback)
  @Override
  public void deleteProduct(Long prodCode, String reason, Long admCode) {

    //상품 논리 삭제
    int updatedCount = adminProductDao.deleteProduct(prodCode);

    if (updatedCount == 0) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, " 상품이 존재하지 않거나 이미 삭제되었습니다");
    }

    //관리자 활동 로그 저장
    //관리자 번호, 상품 코드, 처리 사유를 Map에 담아서 DAO에 전달
    Map<String, Object> params = new HashMap<>();
    params.put("admCode", admCode);
    params.put("prodCode", prodCode);
    params.put("reason", reason);

    int insertedCount = adminProductDao.insertDeleteLog(params);

    if (insertedCount != 1) {
      throw new IllegalStateException("삭제 로그 저장에 실패했습니다");
    }


  }



}
