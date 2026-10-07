package com.ss_dam.challenge.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.request.AdminChallengeWriteRequest;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.service.AdminChallengeService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.model.request.AdminProcessRequest;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.validator.auth.AdminAuthValidator;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;


//- AdminChallengController -> 챌린지 목록 조회, 등록·수정·삭제, 숨김·복구 등 운영 기능

//AdminChallengeDetailController -> 챌린지 상세 조회, 참여자 조회, 랭킹 조회, 통계
//common/category/challenge 폴더 → 피드 작성 시 선택할 챌린지 목록 조회


@RestController
@RequestMapping("/api/admin/challenge")
public class AdminChallengeController {

	private final AdminChallengeService adminChallengeService;
	private final AdminAuthValidator adminAuthValidator;

	public AdminChallengeController(
					AdminChallengeService adminChallengeService,
					AdminAuthValidator adminAuthValidator) {

	this.adminChallengeService = adminChallengeService;
	this.adminAuthValidator = adminAuthValidator;
	}

    // 관리자 챌린지 진행현황 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<PageResult<AdminChallengeListView>>> loadChallenges(
            @ModelAttribute AdminChallengeSearch search,
            HttpSession session) {

        adminAuthValidator.requireAdmin(session);

        PageResult<AdminChallengeListView> result =
                adminChallengeService.loadChallenges(search);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 진행현황 조회 성공", result));
    }

// 관리자 챌린지 등록 + 이미지 업로드
@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<ApiResponse<Long>> registerChallenge(
        @RequestPart("request") AdminChallengeWriteRequest request,
        @RequestPart(value = "files", required = false)
        List<MultipartFile> files,
        HttpSession session){

	// 세 관리자 권한 모두 등록 허용
	AuthProfile admin = adminAuthValidator.requireAdmin(session);

	Long code = adminChallengeService.registerChallenge(
					request,
					files,
					admin.getCode(),
					admin.getId());

	return ResponseEntity.status(HttpStatus.CREATED)
					.body(ApiResponse.success("챌린지 등록 성공", code));
	}

// 관리자 챌린지 수정
@PutMapping(value = "/{code}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<ApiResponse<Void>> updateChallenge(
        @PathVariable Long code,
        @RequestPart("request") AdminChallengeWriteRequest request,
        @RequestPart(value = "files", required = false)
        List<MultipartFile> files,
        @RequestParam(defaultValue = "false") boolean replaceImages,
        HttpSession session) {

    AuthProfile admin = adminAuthValidator.requireAdmin(session);

    adminChallengeService.updateChallenge(
            code,
            request,
            files,
            replaceImages,
            admin.getCode(),
            admin.getId());

    return ResponseEntity.ok(
            ApiResponse.success("챌린지 수정 성공", null));
}
    // 관리자 챌린지 논리 삭제
	// 참여 이력이나 인증글이 없는 챌린지만 삭제 가능
    @DeleteMapping("/{code}")
    public ResponseEntity<ApiResponse<Void>> deleteChallenge(
            @PathVariable Long code,
            HttpSession session) {

        AuthProfile admin = adminAuthValidator.requireAdmin(session);

        adminChallengeService.deleteChallenge(
                code,
                admin.getCode(),
                admin.getId());

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 삭제 성공", null));
    }


    // 관리자 챌린지 조기 완료 (상태 변경 : PROGRESS_STATUS -> ENDED)
    // 진행 중이고 참여자가 있는 챌린지는 삭제를 제한하고, 조기 완료 기능으로 종료하도록 함
    // 조기 완료 상태 변경은 구현, 종료 후 참여·인증 차단 까지
		// 달성률, 보상안 처리 방식 정하기
    @PatchMapping("/{code}/end")
    public ResponseEntity<ApiResponse<Void>> endChallenge(
            @PathVariable Long code,
            HttpSession session) {

        AuthProfile admin = adminAuthValidator.requireAdmin(session);

        adminChallengeService.endChallenge(
                code,
                admin.getCode(),
                admin.getId());

        return ResponseEntity.ok(
                ApiResponse.success("챌린지가 조기 완료되었습니다.", null));
    }


    // 삭제된 챌린지 복구
    @PatchMapping("/{code}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreChallenge(
            @PathVariable Long code,
            @Valid @RequestBody AdminProcessRequest request,
            HttpSession session) {

        AuthProfile admin = adminAuthValidator.requireAdmin(session);

        adminChallengeService.restoreChallenge(
                code,
                request.getReason(),
                admin.getCode(),
                admin.getId());

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 복구 성공", null));
    }

}

