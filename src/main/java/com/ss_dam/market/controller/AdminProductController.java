package com.ss_dam.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;
import com.ss_dam.market.service.AdminProductService;


@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

  @Autowired
  AdminProductService adminProductService;

  //관리자 - 상품 목록 조회
  @GetMapping
  public ResponseEntity<ApiResponse<List<AdminProductView>>> loadProducts(
    Pager pager){
    //pager는 쿼리스트링 값을 자동으로 받아줌

    List<AdminProductView> products = adminProductService.loadProducts(pager);

    return ResponseEntity.ok(
      ApiResponse.success("관리자 상품 목록 조회 성공", products)
    );
    }

  //관리자 - 상품 상세 조회
  @GetMapping("/{prodCode}")
  public ResponseEntity<ApiResponse<AdminProductDetail>> loadProduct(
    @PathVariable Long prodCode){

    AdminProductDetail product = 
      adminProductService.loadProduct(prodCode);

    if(product == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(ApiResponse.fail("상품이 존재하지 않습니다"));
    }

    return ResponseEntity.ok(
      ApiResponse.success("관리자 상품 상세 조회 성공", product)
    );
  }
  

  //상품 판매 중지 및 재개 (판매 중지시 사유 판매자에게 전달)
  //상품 판매 숨김(판매자와 관리자 조회 가능)
  //+처리 사유 입력 및 변경 이력 확인


  //상품 목록 삭제 (실제 삭제보다 소프트 삭제 또는 보관 처리 권장)



 

  /*나중에 추가하면 좋은 편의 기능*/
  //여러 상품 일괄 처리
  //관리자가 목록에서 체크박스로 상품 여러 개를 선택해 한 번에 처리하는 기능
  //상품 검색·필터·페이지네이션

}
  




