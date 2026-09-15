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
import com.ss_dam.common.likes.service.LikeService;
import com.ss_dam.common.likes.util.LikeRateLimiter;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/comments")
public class CommentLikeController {
	
	@Autowired
	LikeService likeService;
	
	@Autowired
	LikeRateLimiter rateLimiter;
	
	@PostMapping("/{cmtCode}/like")
	public ResponseEntity<ApiResponse<Boolean>> toggleCommentLike(
			@PathVariable Long cmtCode, 
			HttpSession session){
		
		Login loginUser = (Login) session.getAttribute("loginUser");
		
		if(loginUser == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(ApiResponse.fail("로그인이 필요한 서비스입니다."));
		}
		
		long memCode = loginUser.getCode();
		
		if(!rateLimiter.isAllowed("COMMENT", memCode, cmtCode)) {
			return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
					.body(ApiResponse.fail("요청이 너무 빠릅니다."));
		}
		
		boolean isLiked = likeService.toggleCommentLike(cmtCode, memCode);
		
		String message = isLiked ? "좋아요를 눌렀습니다." : "좋아요를 취소했습니다";
		
		return ResponseEntity.ok(ApiResponse.success(message, isLiked));
	}
}
