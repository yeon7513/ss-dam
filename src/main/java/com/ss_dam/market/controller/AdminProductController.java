package com.ss_dam.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.response.AdminProductView;
import com.ss_dam.market.service.AdminProductService;


@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

  @Autowired
  AdminProductService adminProductService;

  //관리자 상품 목록 조회
  @GetMapping
  public ResponseEntity<ApiResponse<List<AdminProductView>>> loadProducts(
    Pager pager){
    //pager는 쿼리스트링 값을 자동으로 받아줌

    List<AdminProductView> products = adminProductService.loadProducts(pager);

    return ResponseEntity.ok(
      ApiResponse.success("관리자 상품 목록 조회 성공", products)
    );
    }
    
}
  




