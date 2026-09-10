package com.ss_dam.common.likes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.Login;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.likes.service.MarketProductPickService;
import com.ss_dam.common.likes.util.LikeRateLimiter;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/market/products")
public class MarketProductPickController {
	
	@Autowired
	MarketProductPickService pickService;
	
	@Autowired
	LikeRateLimiter rateLimiter;
	
	@PostMapping("/{prodCode}/pick")
	public ResponseEntity<ApiResponse<Boolean>> toggleProdPick(
			@PathVariable long prodCode,
			HttpSession session){
		
		Login loginUser = (Login) session.getAttribute("loginUser");
		
		if(loginUser == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(ApiResponse.fail("로그인이 필요한 서비스입니다"));			
		}
		
		long memCode = loginUser.getCode();
		
		if(!rateLimiter.isAllowed("PRODUCT", memCode, prodCode)) {
			return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
					.body(ApiResponse.fail("너무 빠른 요청입니다"));
		}
		
		boolean isLiked = pickService.toggleProdPick(prodCode, memCode);
		
		String message = isLiked ? "찜 목록에 추가되었습니다" : "이미 찜 목록에 추가되어있습니다";
		
		return ResponseEntity.ok(ApiResponse.success(message, isLiked));
		
	}
}
