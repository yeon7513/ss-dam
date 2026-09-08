package com.ss_dam.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.request.ProductDelete;
import com.ss_dam.market.model.response.AdminProductView;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.service.AdminProductService;

import jakarta.validation.Valid;


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
  public ResponseEntity<ApiResponse<ProductDetail>> loadProduct(
    @PathVariable Long prodCode){

    ProductDetail product = 
      adminProductService.loadProduct(prodCode);

    if(product == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(ApiResponse.fail("상품이 존재하지 않습니다"));
    }

    return ResponseEntity.ok(
      ApiResponse.success("관리자 상품 상세 조회 성공", product)
    );
  }
  
  //관리자 - 선택 상품 삭제 (soft delete)
    //1. 판매자가 게시글 삭제 /	본인 게시글인지 확인 → 소프트 삭제
    //2. 관리자가 게시글 삭제 /	관리자 권한 확인 → 소프트 삭제
    //3. 보관 기간 종료 /	나중에 보관 정책을 정한 뒤 자동 정리 구현
    //2번, 3번 기능 구현
  
  //2. 관리자 상품 단건 삭제 
    // + 처리 사유 
    // + 처리 상태 4가지 중 하나 

    //

  @DeleteMapping("/{prodCode}")
  public ResponseEntity<ApiResponse<Void>> deleteProduct(
    @PathVariable Long prodCode,
    @Valid @RequestBody ProductDelete request,
    @RequestParam Long memCode
    /* @RequstParam Long memCode 나중에 수정
     * HttpSession session
     */

    ) {

      /* 나중에 추가
       * Login loginUser = (Login) session.getAttribute("loginUser");
       * if (loginUser == null) {
       *    throw new ResponseStatusException(
       *     HttpStatus.UNAUTHORIZED, "로그인이 필요합니다"); }
       * 
       * //ADMIN, SUPER_ADMIN은 예시
       * //ADMIN_ACCOUNT.ROLE에 실제 저장하는 값에 맞추기
       * String role = loginUser.getRole();
       * 
       * if(!"ADMIN".equals(role) && !"SUPER_ADMIN".equals(role)) {
       *    throw new ResponseStatusException(
       *      HttpStatus.FORBIDDEN,
       *       "관리자만 상품을 삭제할 수 있습니다"
       *     );
       *   }
       * 
       * Long admCode = loginUser.getCode();
       * 
       * if(admCode == null) {
       *    throw new ResponseStatusException(
       *      HttpStatus.UNAUTHORIZED,
       *      "관리자 로그인 정보를 확인할 수 없습니다"
       *    );
       *  } 
       * 
       */

      adminProductService.deleteProduct
        (prodCode, 
        request.getReason(),
        memCode);

      return ResponseEntity.ok(
        ApiResponse.<Void>success("상품 삭제 성공", null));
    }

    //아직 관리자 권한 검증 X
    //세션 이용 X -> memCode이용 
    // memCode로 적어도 service에서 admCode 사용 가능, 변수 이름이 달라도 세 번째 인자로 전달




 
  //상품 판매 중지 및 재개 (판매 중지시 사유 판매자에게 전달)
  //상품 판매 숨김(판매자와 관리자 조회 가능)
  //+처리 사유 입력 및 변경 이력 확인




  /*나중에 추가하면 좋은 편의 기능*/
  //여러 상품 일괄 처리
  //관리자가 목록에서 체크박스로 상품 여러 개를 선택해 한 번에 처리하는 기능
  //상품 검색·필터·페이지네이션

}
  




