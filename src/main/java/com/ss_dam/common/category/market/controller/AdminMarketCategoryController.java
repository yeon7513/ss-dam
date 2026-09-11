package com.ss_dam.common.category.market.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;

//- AdminMarketCategoryController - //

// 이 컨트롤러는 프론트엔드로 피드, 마켓 등록 시 사용하는
// 카테고리를 불러오는 컨트롤러임.
// -> 읽기 전용!!

//카테고리는 삭제 대신 비활성화·재활성화하도록 구성

@RestController
@RequestMapping("/api/admin/market/categories")
public class AdminMarketCategoryController {

    // 상품 카테고리 목록 조회
    // active 생략: 전체 / true: 활성 / false: 비활성
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> loadMarketCategories(
            @RequestParam(required = false) Boolean active) {

        // TODO: 상위·하위 카테고리 조회 및 활성 여부 필터 연결
        return notImplemented();
    }

    // 상품 카테고리 등록
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createMarketCategory() {

        // TODO: 등록 요청 DTO 연결
        // TODO: 이름·상위 카테고리·표시 순서 검증
        return notImplemented();
    }

    // 상품 카테고리 수정
    @PutMapping("/{cateCode}")
    public ResponseEntity<ApiResponse<Void>> updateMarketCategory(
            @PathVariable Long cateCode) {

        // TODO: 수정 요청 DTO 연결
        // TODO: 존재 여부·이름 중복·카테고리 계층 검증
        return notImplemented();
    }

    // 상품 카테고리 비활성화
    @PatchMapping("/{cateCode}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivateMarketCategory(
            @PathVariable Long cateCode) {

        // TODO: 신규 상품 등록 시 선택할 수 없도록 처리
        // TODO: 기존 상품과의 연결 유지
        // TODO: 하위 카테고리가 있는 경우 처리 정책 적용
        return notImplemented();
    }

    // 상품 카테고리 재활성화
    @PatchMapping("/{cateCode}/activate")
    public ResponseEntity<ApiResponse<Void>> activateMarketCategory(
            @PathVariable Long cateCode) {

        // TODO: 상위 카테고리 활성 여부 검증
        // TODO: 상품 등록 시 다시 선택할 수 있도록 처리
        return notImplemented();
    }

    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }
}

//현재는 필터·등록·수정·상태 변경이 동작하지 않고 모두 501을 반환해. 활성 여부를 저장하는 DB 필드와 등록·수정 DTO는 서비스 구현 시 연결

/*요청 예시
# 전체 상품 카테고리
GET /api/admin/market/categories

# 활성 상품 카테고리
GET /api/admin/market/categories?active=true

# 비활성 챌린지 카테고리
GET /api/admin/challenge/categories?active=false
 */

