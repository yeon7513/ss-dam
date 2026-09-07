package com.ss_dam.market.controller;

import com.ss_dam.auth.login.Login;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.request.ProductUpdate;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.ProductEditView;
import com.ss_dam.market.model.response.UserProductView;
import com.ss_dam.market.service.UserProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


  // 수정할 거래글 데이터 조회
  @GetMapping("/{prodCode}/edit")
  ResponseEntity<ApiResponse<ProductEditView>> findProductDetailForEdit(@PathVariable Long prodCode,
      HttpSession session) {

    // 로그인한 사용자와 거래글 작성자가 맞는지
    // Login loginUser = (Login) session.getAttribute("loginUser");
    // Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    // 임시로 하드코딩
    Long memberCode = 1L;

    ProductEditView productEditView =
        userProductService.findProductDetailForEdit(prodCode, memberCode);

    if (productEditView == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(ApiResponse.fail("존재하지 않는 피드 게시물입니다."));
    }

    return ResponseEntity.ok(ApiResponse.success("거래글 수정 데이터 조회 성공", null));
  }


  // 거래글 수정
  @PutMapping("/{prodCode}")
  ResponseEntity<ApiResponse<Void>> updateProductPost(@PathVariable Long prodCode,
      ProductUpdate productUpdate, HttpSession session) {

    // 데이터 위변조 방지
    if (productUpdate.getCode() == null || !prodCode.equals(productUpdate.getCode())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(ApiResponse.fail("잘못된 요청입니다. 거래글 식별자가 일치하지 않습니다."));
    }

    //    Login loginUser = (Login) session.getAttribute("loginUser");
    //
    //    // 로그인하지 않은 사용자일 경우
    //    if (loginUser == null) {
    //      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    //          .body(ApiResponse.fail("로그인이 필요한 서비스입니다."));
    //    }
    //
    //    // 로그인은 했지만, 사용자 본인이 작성한 글이 아닐 경우
    //    if (!loginUser.getCode().equals(productUpdate.getMemCode())) {
    //      return ResponseEntity.status(HttpStatus.FORBIDDEN)
    //          .body(ApiResponse.fail("수정 권한이 없습니다."));
    //    }

    // 임시로 하드 코딩 -> 나중에 삭제할 것!!
    productUpdate.setMemCode(1L);
    productUpdate.setUpdatedBy("user01");

    userProductService.updateProductPost(productUpdate);

    return ResponseEntity.ok(ApiResponse.success("거래글 수정 완료", null));
  }

  @DeleteMapping("/{prodCode}")
  ResponseEntity<ApiResponse<Void>> deleteProductPost(@PathVariable Long prodCode, Long memCode,
      HttpSession session) {

    //    Login loginUser = (Login) session.getAttribute("loginUser");
    //    // -> 로그인하지 않은 사용자의 경우
    //    if (loginUser == null) {
    //      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    //          .body(ApiResponse.fail("로그인이 필요한 서비스입니다."));
    //    }
    //
    //    // -> 로그인한 사용자 본인이 작성한 글이 맞는지 확인
    //    if (!loginUser.getCode().equals(memCode)) {
    //      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.fail("삭제 권한이 없습니다."));
    //    }
    //
    //    String updatedBy = loginUser.getMemberId();

    // 임시로 하드코딩
    String updatedBy = "user01";

    userProductService.deleteProductPost(prodCode, updatedBy);

    return ResponseEntity.ok(ApiResponse.success("거래글 삭제 완료", null));
  }

}
