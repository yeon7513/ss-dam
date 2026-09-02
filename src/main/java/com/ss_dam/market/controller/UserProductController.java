package com.ss_dam.market.controller;

import com.ss_dam.auth.login.Login;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.UserProductView;
import com.ss_dam.market.service.UserProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/market/products")
public class UserProductController {

  @Autowired
  UserProductService userProductService;


  // 거래글 목록 조회
  @GetMapping
  ResponseEntity<ApiResponse<List<UserProductView>>> loadProducts(Pager pager,
      HttpSession session) {

    // 로그인한 사용자의 Pick 여부를 받아오기 위해 세션에서 로그인 정보를 가져옴.
    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    List<UserProductView> products = userProductService.loadProducts(pager, memberCode);

    return ResponseEntity.ok(ApiResponse.success("다시쓰담 거래글 조회 성공", products));
  }


  // 거래글 상세 조회
  @GetMapping("/{prodCode}")
  ResponseEntity<ApiResponse<ProductDetail>> findProductDetailByProdCode(
      @PathVariable Long prodCode, HttpSession session) {
    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    ProductDetail productDetail =
        userProductService.findProductDetailByProdCode(prodCode, memberCode);

    if (productDetail == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.fail("거래글이 존재하지 않습니다."));
    }

    return ResponseEntity.ok(ApiResponse.success("다시쓰담 거래글 상세 조회 성공", productDetail));
  }


  // 수정할 거래글 조회
  @GetMapping("/{prodCode}/edit")
  ResponseEntity<ApiResponse<ProductDetail>> findProductDetailForEdit(@PathVariable Long prodCode,
      HttpSession session) {

    // 로그인한 사용자와 거래글 작성자가 맞는지
    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;



    return ResponseEntity.ok(ApiResponse.success("거래글 수정 데이터 조회 성공", null));
  }
}
