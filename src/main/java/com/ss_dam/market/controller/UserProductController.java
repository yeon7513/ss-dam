package com.ss_dam.market.controller;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AuthValidator;
import com.ss_dam.market.model.filter.UserProductSearchFilter;
import com.ss_dam.market.model.request.ProductCreate;
import com.ss_dam.market.model.request.ProductUpdate;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.ProductEditView;
import com.ss_dam.market.model.response.UserProductView;
import com.ss_dam.market.service.UserProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/market/products")
public class UserProductController {

  private final AuthValidator authValidator;
  private final UserProductService userProductService;

  public UserProductController(AuthValidator authValidator, UserProductService userProductService) {
    this.authValidator = authValidator;
    this.userProductService = userProductService;
  }

  // 거래글 목록 조회
  @GetMapping
  ResponseEntity<ApiResponse<PageResult<UserProductView>>> loadProducts(
      UserProductSearchFilter filter, HttpSession session) {

    // 로그인한 사용자의 Pick 여부를 받아오기 위해
    // 세션에서 로그인 정보를 가져옴.
    // -> 비회원일 수도 있으니 선택적 세션 추출 메소드로..
    AuthProfile loginUser = authValidator.getLoginUser(session);
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    System.out.println("dealStatus: " + filter.getDealStatus());

    PageResult<UserProductView> products = userProductService.loadProducts(filter, memberCode);

    return ResponseEntity.ok(ApiResponse.success("다시쓰담 거래글 조회 성공", products));
  }


  // 거래글 상세 조회
  @GetMapping("/{prodCode}")
  ResponseEntity<ApiResponse<ProductDetail>> findProductDetailByProdCode(
      @PathVariable Long prodCode, HttpSession session) {

    // 로그인한 사용자의 Pick 여부를 받아오기 위해 세션에서 로그인 정보를 가져옴.
    AuthProfile loginUser = authValidator.getLoginUser(session);
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    ProductDetail productDetail =
        userProductService.findProductDetailByProdCode(prodCode, memberCode);

    if (productDetail == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.fail("존재하지 않는 거래글입니다."));
    }

    return ResponseEntity.ok(ApiResponse.success("거래글 상세 조회 성공", productDetail));
  }

  // 거래글 등록
  @PostMapping
  ResponseEntity<ApiResponse<Long>> registerProductPost(ProductCreate productCreate,
      HttpSession session) {

    // 거래글 등록은 "무조건" 로그인 해야하기 때문에
    // 필수 세션 추출 메소드를 호출함.
    AuthProfile loginUser = authValidator.requireLogin(session);

    // 세션을 서비스로 넘겨 값 세팅을 서비스에 위임함.
    Long newProdPostCode = userProductService.registerProductPost(productCreate, loginUser);

    return ResponseEntity.ok(ApiResponse.success("거래글 등록 성공", newProdPostCode));
  }


  // 수정할 거래글 데이터 조회
  @GetMapping("/{prodCode}/edit")
  ResponseEntity<ApiResponse<ProductEditView>> findProductDetailForEdit(@PathVariable Long prodCode,
      HttpSession session) {

    AuthProfile loginUser = authValidator.requireLogin(session);

    ProductEditView productEditView =
        userProductService.findProductDetailForEdit(prodCode, loginUser.getCode());

    if (productEditView == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(ApiResponse.fail("존재하지 않는 피드 게시물입니다."));
    }

    return ResponseEntity.ok(ApiResponse.success("거래글 수정 데이터 조회 성공", productEditView));
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

    AuthProfile loginUser = authValidator.requireLogin(session);

    userProductService.updateProductPost(productUpdate, loginUser);

    return ResponseEntity.ok(ApiResponse.success("거래글 수정 완료", null));
  }

  @DeleteMapping("/{prodCode}")
  ResponseEntity<ApiResponse<Void>> deleteProductPost(@PathVariable Long prodCode,
      HttpSession session) {

    AuthProfile loginUser = authValidator.requireLogin(session);

    userProductService.deleteProductPost(prodCode, loginUser);

    return ResponseEntity.ok(ApiResponse.success("거래글 삭제 완료", null));
  }

}
