package com.ss_dam.comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;

// - AdminCommentController - 댓글 목록·검색, 상세, 삭제·복구, 처리 사유·이력
/* 필요한 기능
* 댓글 목록 조회 : 전체 댓글을 조회하고 피드,작성자,내용 등으로 검색
* 댓글 삭제 : 관리자가 부적절한 댓글을 삭제 처리 (delete_yn = 1)
*/

@RestController
@RequestMapping("/api/admin/comments")
public class AdminCommentController {

    // 관리자 댓글 목록 조회 및 검색
    // 조건 생략 시 해당 조건으로 제한하지 않음
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> loadComments(
            @RequestParam(required = false) Long feedCode,
            @RequestParam(required = false) Long writerCode,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status) {

        // TODO: 피드·작성자·댓글 내용 검색 연결
        // TODO: 상태 필터·페이지네이션 연결
        return notImplemented();
    }

    // 관리자 댓글 상세 조회
    // 비공개·삭제된 댓글 포함
    @GetMapping("/{commentCode}")
    public ResponseEntity<ApiResponse<Void>> loadComment(
            @PathVariable Long commentCode) {

        return notImplemented();
    }

    // 댓글 논리 삭제
    @DeleteMapping("/{commentCode}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(
            @PathVariable Long commentCode) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: delete_yn만 변경하고 기존 공개 상태 유지
        // TODO: 삭제와 처리 이력 저장을 같은 트랜잭션으로 처리
        return notImplemented();
    }

    // 삭제된 댓글 복구
    @PatchMapping("/{commentCode}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreComment(
            @PathVariable Long commentCode) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 기존 공개 상태를 유지하면서 delete_yn 복구
        // TODO: 복구와 처리 이력 저장을 같은 트랜잭션으로 처리
        return notImplemented();
    }

    // 댓글 관리 처리 이력 조회
    @GetMapping("/{commentCode}/logs")
    public ResponseEntity<ApiResponse<Void>> loadCommentLogs(
            @PathVariable Long commentCode) {

        return notImplemented();
    }

    // 미구현 API 공통 응답
    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }
}

/*요청 예시
# 전체 댓글
GET /api/admin/comments

# 특정 피드의 댓글
GET /api/admin/comments?feedCode=1

# 특정 작성자의 댓글
GET /api/admin/comments?writerCode=10

# 댓글 내용 검색
GET /api/admin/comments?keyword=검색어

# 공개 댓글
GET /api/admin/comments?status=ACTIVE

# 비공개 댓글
GET /api/admin/comments?status=PRIVATE

# 삭제된 댓글
GET /api/admin/comments?status=DELETED

# 특정 피드의 삭제된 댓글
GET /api/admin/comments?feedCode=1&status=DELETED
*/

//현재는 모든 요청이 501을 반환하고 실제 조회·삭제·복구는 수행하지 않아. 처리 사유 입력도 DTO를 만들 때 연결,서비스 구현