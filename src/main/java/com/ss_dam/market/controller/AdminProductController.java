package com.ss_dam.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.request.ProductDelete;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;
import com.ss_dam.market.service.AdminProductService;

import jakarta.validation.Valid;


//아직 관리자 권한 검증 X
//세션 이용 X -> memCode이용 

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

   @Autowired
    private AdminProductService adminProductService;

    //관리자 상품 목록 조회
    //Pager: 검색 조건 및 페이지네이션
    //status: ACTIVE, PRIVATE, REPORTED, DELETED 등
    //dealStatus: ON_SALE, IN_PROGRESS, SOLD
    //필터 생략 시 해당 조건으로 제한하지 않음
    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminProductView>>> loadProducts(
            Pager pager,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String dealStatus) {

        List<AdminProductView> products = 
              adminProductService.loadProducts(pager, status, dealStatus);
        
        return ResponseEntity.ok(
          ApiResponse.success("관리자 상품 목록 조회 성공", products));
        
        }
    
    //관리자 상품 상세 조회
    //비공개,삭제된 상품도 조회
    //상품이 없으면 서비스에서 예외 처리
    @GetMapping("/{prodCode}")
    public ResponseEntity<ApiResponse<AdminProductDetail>> loadProduct(
            @PathVariable Long prodCode) {

        AdminProductDetail product =
              adminProductService.loadProduct(prodCode);

        return ResponseEntity.ok(
                ApiResponse.success(
                  "관리자 상품 상세 조회 성공", product));
      
      }
    
      //상품 논리 삭제 + 처리 사유
      //delete_yn = 1
      //post_status와 deal_status는 변경하지 않음
      @DeleteMapping("/{prodCode}")
      public ResponseEntity<ApiResponse<Void>> deleteProduce(
              @PathVariable Long prodCode,
              @RequestParam Long admCode,
              @Valid @RequestBody ProductDelete request) {
        
        adminProductService.deleteProduct(
          prodCode,
          request.getReason(),
          admCode);
        
        return ResponseEntity.ok(
                ApiResponse.<Void>success("상품 삭제 성공", null));
        
        }
      

      //삭제된 상품 복구 + 처리 사유
      //delete_yn = 0
      //기존 post_status와 deal_status 유지
      @PatchMapping("/{prodCode}/restore")
      public ResponseEntity<ApiResponse<Void>> restoreProduct(
              @PathVariable Long prodCode,
              @RequestParam Long admCode,
              @Valid @RequestBody ProductDelete request) {

          adminProductService.restoreProduct(
            prodCode,
             request.getReason(),
            admCode);

        return ResponseEntity.ok(
          ApiResponse.<Void>success(
            "상품 복구 성공", null));
      
        }
      
      
      //상품 관리 처리 이력 조회
      @GetMapping("/{prodCode}/logs")
      public ResponseEntity<ApiResponse<List<AdminActivity>>> loadProductLogs(
              @PathVariable Long prodCode){

          List<AdminActivity> logs = 
                  adminProductService.loadProductLogs(prodCode);
          
          return ResponseEntity.ok(
                  ApiResponse.success(
                    "상품 관리 처리 이력 조회 성공", logs));
          
          }
     }

  /*서비스 구현 시에는 다음을 반영
  //loadProducts에 status, dealStatus 필터를 추가하고 허용 값을 검증
  //판매 중지 여부를 별도로 저장해 기존 판매 상태를 유지
  //상태 변경과 처리 이력 저장을 하나의 트랜잭션으로 처리하고, 판매 중지 사유를 판매자에게 전달
  //memCode는 기존 방식에 맞춘 임시 인자야. 실제 운영에서는 로그인한 관리자 정보를 인증 정보에서 가져오고, 조회를 포함한 모든 관리자 API에 권한 검증을 적용
  //보관 기간 만료에 따른 자동 정리는 이 컨트롤러와 별도로 스케줄러·서비스에서 구현
  */


/*나중에 추가하면 좋은 편의 기능*/
//여러 상품 일괄 처리
//관리자가 목록에서 체크박스로 상품 여러 개를 선택해 한 번에 처리하는 기능
//상품 검색·필터·페이지네이션



  




