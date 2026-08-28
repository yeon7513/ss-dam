package com.ss_dam.comment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.comment.Comment;
import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.service.UserCommentService;
import com.ss_dam.common.ApiResponse;

@RestController
@RequestMapping("/api/comments")
public class UserCommentController {

	@Autowired
	UserCommentService userCommentService;

	// 댓글 등록
	@PostMapping
	public ResponseEntity<ApiResponse<CommentCreate>> registerComment(@RequestBody Comment comment) {
		
		CommentCreate createdComment = userCommentService.registerComment(comment);
		
		// 데이터 생성이라 HttpStatus.CREATED -> 201 상태 코드 적용
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success("댓글 등록 성공", createdComment));
	}

	/*
	주의할 점은 현재 구조에서는 클라이언트가 memCode를 직접 보냅니다.
	임시 구현으로는 동작하지만, 로그인 기능과 연결할 때는 memCode를 요청에서 받지 않고
	 HttpSession의 loginUser에서 가져오는 것이 안전합니다.
	*/

}
