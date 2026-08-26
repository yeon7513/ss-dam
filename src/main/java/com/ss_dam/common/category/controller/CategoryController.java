package com.ss_dam.common.category.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.category.model.Category;
import com.ss_dam.common.category.service.CategoryService;

// 이 컨트롤러는 프론트엔드로 피드, 마켓 등록 시 사용하는
// 카테고리를 불러오는 컨트롤러임.
// -> 읽기 전용!!

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	CategoryService categoryService;

	// 각 구역의 카테고리 활성 상태에 따라 호출 분기 처리

	// 챌린지 카테고리
	@GetMapping("/challenge/{status}")
	public ResponseEntity<ApiResponse<List<Category>>> loadChallengeCategories(@PathVariable String status) {
		if ("active".equalsIgnoreCase(status)) {
			// 피드 등록에서 사용할 활성화 중인 카테고리 조회
			List<Category> categories = categoryService.loadActiveChallengeCategories();

			return ResponseEntity.ok(ApiResponse.success("활성화 중인 챌린지 카테고리 조회 성공", categories));

		} else if ("all".equalsIgnoreCase(status)) {
			// 피드 목록에서 사용할 전체 카테고리 조회 (진행중, 진행완료 포함)
			List<Category> categories = categoryService.loadAllChallengeCategories();

			return ResponseEntity.ok(ApiResponse.success("전체 챌린지 카테고리 조회 성공", categories));
		}

		// 허용되지 않은 status 값이 들어오면 예외 발생
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(ApiResponse.fail("지원하지 않는 카테고리 상태값입니다: " + status));
	}

	// 마켓 카테고리 (상위 & 하위)
	@GetMapping("/market/{status}")
	public ResponseEntity<ApiResponse<List<Category>>> loadMarketCategories(@PathVariable String status) {
		if ("active".equalsIgnoreCase(status)) {
			// 거래글 등록에서 사용할 활성화 중인 카테고리 조회
			List<Category> categories = categoryService.loadActiveMarketCategories();
			
			return ResponseEntity.ok(ApiResponse.success("활성화 중인 마켓 카테고리 조회 성공", categories));
		} else if ("all".equalsIgnoreCase(status)) {
			// 거래글 목록에서 사용할 전체 카테고리 조회 (판매중, 판매완료 포함)
			List<Category> categories = categoryService.loadAllMarketCategories();
			
			return ResponseEntity.ok(ApiResponse.success("전체 마켓 카테고리 조회 성공", categories));
		}

		// 허용되지 않은 status 값이 들어오면 예외 발생
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(ApiResponse.fail("지원하지 않는 카테고리 상태값입니다: " + status));
	}
}
