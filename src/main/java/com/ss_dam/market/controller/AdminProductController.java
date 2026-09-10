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
  
  //2. 관리자 상품 단건 삭제 + 처리 사유
  @DeleteMapping("/{prodCode}")
  public ResponseEntity<ApiResponse<Void>> deleteProduct(
    @PathVariable Long prodCode,
    @RequestParam Long memCode,
    @Valid @RequestBody ProductDelete request) {

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

  //관리자 권한 확인 추가 
  

  //상품 판매 중지 및 재개 (판매 중지시 사유 판매자에게 전달)
  //상품 판매 숨김(판매자와 관리자 조회 가능)
  //+처리 사유 입력 및 변경 이력 확인




  /*나중에 추가하면 좋은 편의 기능*/
  //여러 상품 일괄 처리
  //관리자가 목록에서 체크박스로 상품 여러 개를 선택해 한 번에 처리하는 기능
  //상품 검색·필터·페이지네이션



  /*
  // 전체 상품 조회
// GET /api/admin/products
// 정상 상품 조회
// GET /api/admin/products?status=ACTIVE
// 비공개 상품 조회
// GET /api/admin/products?status=PRIVATE
// 숨김 상품 조회
// GET /api/admin/products?status=BLINDED
// 신고된 상품 조회
// GET /api/admin/products?status=REPORTED
// 삭제된 상품 조회
// GET /api/admin/products?status=DELETED

// 판매 중 상품 조회
// GET /api/admin/products?dealStatus=ON_SALE
// 예약 중 상품 조회
// GET /api/admin/products?dealStatus=IN_PROGRESS
// 판매 완료 상품 조회
// GET /api/admin/products?dealStatus=SOLD

// 필터 조합: 정상 노출 중이면서 판매 중인 상품
// GET /api/admin/products?status=ACTIVE&dealStatus=ON_SALE
// 위 필터는 같은 @GetMapping에서 @RequestParam으로 받음
@GetMapping

// 상품 상세 조회 (비공개·숨김·삭제 상태 포함)
@GetMapping("/{prodCode}")

// 상품 숨김
@PatchMapping("/{prodCode}/hide")

// 상품 숨김 해제
@PatchMapping("/{prodCode}/unhide")

// 상품 판매 중지
@PatchMapping("/{prodCode}/suspend")

// 상품 판매 중지 해제
@PatchMapping("/{prodCode}/resume")

// 상품 삭제
@DeleteMapping("/{prodCode}")

// 삭제된 상품 복구
@PatchMapping("/{prodCode}/restore")

// 상품 관리 처리 이력 조회
@GetMapping("/{prodCode}/logs")
 */
//필터와 추가 API는 구현할 구성안이에요. 현재 DealStatus에는 판매 중지 상태가 없으므로, 
//판매 중지·해제를 구현하려면 별도의 중지 여부 필드 등도 필요
}
  




