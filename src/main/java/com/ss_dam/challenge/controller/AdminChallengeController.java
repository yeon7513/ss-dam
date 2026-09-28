package com.ss_dam.challenge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.controller.AdminActivityLogController;
import com.ss_dam.auth.login.Login;
import com.ss_dam.challenge.model.request.AdminChallengeCreateRequest;
import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.challenge.service.AdminChallengeService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

import jakarta.servlet.http.HttpSession;


//- AdminChallengController - 등록·수정·삭제, 관리자용 목록·상세 조회, 숨김·복구 등 운영 기능

//challenge 폴더 → 관리자 챌린지 등록·목록·상세·수정·삭제
//common/category/challenge 폴더 → 피드 작성 시 선택할 챌린지 목록 조회


@RestController
@RequestMapping("/api/admin/challenge")
public class AdminChallengeController {

private final AdminActivityLogController adminActivityLogController;
@Autowired 
private AdminChallengeService adminChallengeService;

AdminChallengeController(AdminActivityLogController adminActivityLogController) {
  this.adminActivityLogController = adminActivityLogController;
}

    // 관리자 챌린지 진행현황 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<PageResult<AdminChallengeListView>>> 
				loadChallenges(@ModelAttribute AdminChallengeSearch search) {

				PageResult<AdminChallengeListView> result = 
							adminChallengeService.loadChallenges(search);
				
				return ResponseEntity.ok(
								ApiResponse.success("챌린지 진행현황 조회 성공", result));
				}
  
				// @ModelAttribute가 다음 요청 값을 DTO에 담아 줌 
				// ?page=1&perPage=10&perGroup=5
    

    // 관리자 챌린지 진행현황 상세 조회  
    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<AdminChallengeDetailView>>
						 loadChallenge(@PathVariable Long code) {

				AdminChallengeDetailView result = 
							adminChallengeService.loadChallenge(code);

         	return ResponseEntity.ok(
            ApiResponse.success("챌린지 상세 조회 성공", result));
					}

    // 관리자 챌린지 등록
    @PostMapping
    public ResponseEntity<ApiResponse<Long>> createChallenge(
						@RequestBody AdminChallengeCreateRequest request,
						HttpSession session) {

						Login loginUser = (Login) session.getAttribute("loginUser");

						if (loginUser == null) {
							throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다");
						}

						String role = loginUser.getRole();

						// 여기서는 세 관리자 권한 모두 등록 허용
						if (!"ROLE_SUPER".equals(role)
									&& !"ROLE_MANAGER".equals(role)
									&& !"ROLE_STAFF".equals(role)) {

								throw new ResponseStatusException(
												HttpStatus.FORBIDDEN,
												"관리자만 등록할 수 있습니다");
									}
						 Long code = adminChallengeService.createChallenge(
            request,
            loginUser.getCode(),
            loginUser.getMemberId());

							return ResponseEntity.status(HttpStatus.CREATED)
											.body(ApiResponse.success("챌린지 등록 성공", code));
					}
			

    // 챌린지 수정
    @PutMapping("/{code}")
    public ResponseEntity<ApiResponse<Void>> updateChallenge(
            @PathVariable Long code) {

        // TODO: 수정 요청 DTO와 입력값 검증 연결
        // TODO: 진행 상태에 따른 수정 가능 항목 검증
        return notImplemented();
    }

    // 챌린지 조기 완료 
		// 종료일 전에 관리자가 챌린지를 끝내는 기능으로 구현하면 됩니다. 삭제하지 않고 PROGRESS_STATUS를 ENDED로
		//챌린지 운영 종료를 뜻합니다. 참여자 전원을 달성 완료로 바꾸거나 보상을 자동 지급하는 처리는 별개
		//API : PATCH /api/admin/challenge/26/end
    @DeleteMapping("/{code}")
    public ResponseEntity<ApiResponse<Void>> deleteChallenge(
            @PathVariable Long code) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 기존 공개 범위를 유지하면서 논리 삭제
        // TODO: 참여자가 있는 챌린지의 삭제 정책 검증
        // TODO: 삭제와 처리 이력 저장을 같은 트랜잭션으로 처리
        return notImplemented();
    }

    // 삭제된 챌린지 복구
    @PatchMapping("/{code}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreChallenge(
            @PathVariable Long code) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 기존 공개 범위를 유지하면서 삭제 여부 복구
        // TODO: 복구와 처리 이력 저장을 같은 트랜잭션으로 처리
        return notImplemented();
    }

    // 챌린지 참여자 목록 조회
    // challenge/entry의 참여자 조회 기능
    // 참여 승인·실격 등 기능이 많아질 때 AdminChallengeEntryController로 분리
    
    @GetMapping("/{code}/participants")
    public ResponseEntity<ApiResponse<Void>> loadParticipants(
            @PathVariable Long code) {

        // TODO: 참여자 조회 서비스·페이지네이션 연결
        return notImplemented();
    }

    // 미구현 API 공통 응답
    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }

    // 챌린지 관리 처리 이력 조회
    @GetMapping("/{code}/logs")
    public ResponseEntity<ApiResponse<Void>> loadChallengeLogs(
            @PathVariable Long code) {

        // TODO: 챌린지 존재 여부 확인
        // TODO: 등록·수정·삭제·복구 처리 이력 조회
        // TODO: 처리 관리자·처리 사유·처리 시각 반환
        return notImplemented();
    }

    // 관리자 회원 상세 - 챌린지 인증 탭
    @GetMapping("/members/{memberCode}/proofs")
    public ResponseEntity<ApiResponse<AdminMemberProofsView>> loadMemberProofs(
            @PathVariable Long memberCode,
            @ModelAttribute PageQuery pageQuery,
            HttpSession session) {


    AdminMemberProofsView result =
            adminChallengeService.loadMemberProofs(memberCode, pageQuery);

    return ResponseEntity.ok(
            ApiResponse.success("회원 챌린지 인증내역 조회 성공", result));
    }
}

//현재는 501을 반환하고, 나중에 서비스와 응답 DTO를 연결

// //랭킹·인기·최신 조회는 기존 공통 조회 API를 사용
// //비공개·숨김·복구·참여자 조회·처리 이력은 서비스와 DB 지원을 추가

/* 
# 전체 챌린지 
GET /api/admin/challenge

# 진행 예정
GET /api/admin/challenge?progressStatus=UPCOMING

# 진행 중
GET /api/admin/challenge?progressStatus=ONGOING

# 종료
GET /api/admin/challenge?progressStatus=ENDED

# 공개
GET /api/admin/challenge?visibility=PUBLIC

# 비공개
GET /api/admin/challenge?visibility=PRIVATE

# 삭제된 챌린지
GET /api/admin/challenge?deleted=true

# 삭제되지 않은 진행 중 챌린지
GET /api/admin/challenge?progressStatus=ONGOING&deleted=false

# 특정 챌린지 참여자 목록
GET /api/admin/challenge/1/participants

# 처리 이력 조회
GET /api/admin/challenge/1/logs

*/

