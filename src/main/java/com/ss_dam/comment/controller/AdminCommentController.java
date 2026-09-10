package com.ss_dam.comment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//관리자가 댓글을 조회하고 관리하는 API 작성
/* 필요한 기능
 * 댓글 목록 조회 : 전체 댓글을 조회하고 피드,작성자,내용 등으로 검색
 * 댓글 삭제 : 관리자가 부적절한 댓글을 삭제 처리 (delete_yn = 1)
 */

@RestController
@RequestMapping("/api/admin/comments")
public class AdminCommentController {

/* 
// 전체 댓글 조회
// GET /api/admin/comments
@GetMapping

// 비공개 댓글 조회
// GET /api/admin/comments?visibility=PRIVATE
// 공개 댓글 조회
// GET /api/admin/comments?visibility=PUBLIC
// 숨김 댓글 조회
// GET /api/admin/comments?hidden=true
// 삭제된 댓글 조회
// GET /api/admin/comments?deleted=true
// 필터 조합: 비공개이면서 숨김인 댓글
// GET /api/admin/comments?visibility=PRIVATE&hidden=true
// 위 필터는 같은 @GetMapping에서 @RequestParam으로 받음

// 댓글 상세 조회
@GetMapping("/{commentCode}")

// 공개·비공개 변경
// 요청 본문: {"visibility": "PRIVATE"} 또는 {"visibility": "PUBLIC"}
@PatchMapping("/{commentCode}/visibility")

// 댓글 숨김
@PatchMapping("/{commentCode}/hide")

// 댓글 숨김 해제
@PatchMapping("/{commentCode}/unhide")

// 댓글 삭제
@DeleteMapping("/{commentCode}")

// 삭제된 댓글 복구
@PatchMapping("/{commentCode}/restore")
*/

}

