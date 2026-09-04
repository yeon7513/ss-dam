package com.ss_dam.comment.controller;

import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.request.CommentUpdate;
import com.ss_dam.comment.service.UserCommentService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.category.challenge.controller.AdminChallengeCategoryController;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class UserCommentController {

  private final AdminChallengeCategoryController adminChallengeCategoryController;
  @Autowired
  UserCommentService userCommentService;

  UserCommentController(AdminChallengeCategoryController adminChallengeCategoryController) {
    this.adminChallengeCategoryController = adminChallengeCategoryController;
  }

  //댓글 등록 (임시)
  @PostMapping
  public ResponseEntity<ApiResponse<CommentCreate>> registerComment(
      @RequestBody CommentCreate comment, HttpSession session) {

    // 로그인한 사용자만 댓글 작성 가능
    // 클라이언트쪽에서 가져올 필요 없이 서버 세션에서 사용자 PK를 가져옴

    // 현재는 임시로 하드코딩 -> 로그인 해제 후 삭제할 것
    comment.setMemCode(2L);

    CommentCreate createdComment = userCommentService.registerComment(comment);

    // 데이터 생성이라 HttpStatus.CREATED -> 201 상태 코드 적용
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(ApiResponse.success("댓글 등록 성공", createdComment));
  }

  //댓글 수정 (임시)
  @PatchMapping("/{commentCode}")
  public ResponseEntity<ApiResponse<Void>> updateComment(@PathVariable Long commentCode,
      @RequestParam Long memCode, @RequestBody CommentUpdate request) {
    //매개변수 : 댓글 번호, 회원 번호, 내용
    //임시로 쿼리 파라미터를 받는 방식, 나중에 memCode 제거하고 세션에서 가져오기

    userCommentService.updateComment(commentCode, memCode, request);

    return ResponseEntity.ok(ApiResponse.success("댓글 수정 성공", null));

  }

  //code는 JSON으로 보내지 않습니다. Controller가 URL의 15를 DTO에 넣습니다.

  //댓글 삭제(soft delete -> delete_yn=0을 delete_yn=1로 변경)
  @DeleteMapping("/{commentCode}")
  public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable Long commentCode,
      @RequestParam Long memCode) {

    //현재는 임시로 memCode를 쿼리 파라미터로 받음
    userCommentService.deleteComment(commentCode, memCode);

    return ResponseEntity.ok(ApiResponse.success("댓글 삭제 성공", null));
  }
}


	/*
	주의할 점은 현재 구조에서는 클라이언트가 memCode를 직접 보냅니다.
	임시 구현으로는 동작하지만, 로그인 기능과 연결할 때는 memCode를 요청에서 받지 않고
	 HttpSession의 loginUser에서 가져오는 것이 안전합니다.

	 클라이언트가 보내는 memCode는 조작할 수 있기 때문에 로그인 기능이 연결되면,
	 댓글 등록·수정·삭제 모두 반드시 세션의 loginUser.getCode()로 교체

	*/

	/* 
	//댓글 등록 (세션 확인)
	@PostMapping
	public ResponseEntity<ApiResponse<CommentCreate>> registerComment(@RequestBody CommentCreate request, HttpSession session) {
		
		Login loginUser = (Login) session.getAttribute("loginUser");

		//1. 로그인 여부 확인
		if(loginUser == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
			.body(ApiResponse.fail("로그인이 필요합니다"));
		}
		//현재 인터셉터가 비활성화 되어 있으므로 Controller에서 확인

		//2. 로그인 회원 번호 가져오기
		Long memberCode = loginUser.getCode();

		//3. 댓글 등록 서비스 호출
		CommentCreate createdComment = 
			userCommentService.registerComment(request, memberCode);

			//서비스에 두 가지 값을 전달합니다.
			//- request: 클라이언트가 보낸 댓글 정보
				//	- feedCode
				//	- content
			//- memberCode: 세션에서 가져온 로그인 회원 번호

			//4. 댓글 등록 성공 응답
			return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success("댓글 등록 성공", createdComment));
*/


			

