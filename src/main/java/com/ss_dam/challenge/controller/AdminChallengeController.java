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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.controller.AdminActivityLogController;
import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.request.AdminChallengeWriteRequest;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView;
import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.challenge.service.AdminChallengeService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.model.request.AdminProcessRequest;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;


//- AdminChallengController - 등록·수정·삭제, 관리자용 목록·상세 조회, 숨김·복구 등 운영 기능

//challenge 폴더 → 관리자 챌린지 등록·목록·상세·수정·삭제
//common/category/challenge 폴더 → 피드 작성 시 선택할 챌린지 목록 조회


@RestController
@RequestMapping("/api/admin/challenge")
public class AdminChallengeController {

    private final AdminActivityLogController adminActivityLogController;

    @Autowired
    private AdminChallengeService adminChallengeService;

    public AdminChallengeController(
            AdminActivityLogController adminActivityLogController) {
        this.adminActivityLogController = adminActivityLogController;
    }

    // 관리자 챌린지 진행현황 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<PageResult<AdminChallengeListView>>> loadChallenges(
            @ModelAttribute AdminChallengeSearch search,
            HttpSession session) {

        requireAdmin(session);

        PageResult<AdminChallengeListView> result =
                adminChallengeService.loadChallenges(search);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 진행현황 조회 성공", result));
    }

    // @ModelAttribute가 다음 요청 값을 DTO에 담아 줌
    // ?page=1&perPage=10&perGroup=5


    // 관리자 챌린지 진행현황 상세 조회
    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<AdminChallengeDetailView>> loadChallenge(
            @PathVariable Long code,
            HttpSession session) {

        requireAdmin(session);

        AdminChallengeDetailView result =
                adminChallengeService.loadChallenge(code);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 상세 조회 성공", result));
    }

    // 관리자 챌린지 등록
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Long>> createChallenge(
            @RequestPart("request") AdminChallengeWriteRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image,
            HttpSession session) {

        // 여기서는 세 관리자 권한 모두 등록 허용
        AuthProfile admin = requireAdmin(session);

        Long code = adminChallengeService.createChallenge(
                request,
                image,
                admin.getCode(),
                admin.getId());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("챌린지 등록 성공", code));
    }


    // 관리자 챌린지 수정
    @PutMapping(
            value = "/{code}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Void>> updateChallenge(
            @PathVariable Long code,
            @RequestPart("request") AdminChallengeWriteRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestParam(defaultValue = "false") boolean removeImage,
            HttpSession session) {

        AuthProfile admin = requireAdmin(session);

        adminChallengeService.updateChallenge(
                code,
                request,
                image,
                removeImage,
                admin.getCode(),
                admin.getId());

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 수정 성공", null));
    }
    // 관리자 챌린지 논리 삭제 (잘못 등록한 챌린지 논리 삭제)
    // 관리자 챌린지 논리 삭제
    @DeleteMapping("/{code}")
    public ResponseEntity<ApiResponse<Void>> deleteChallenge(
            @PathVariable Long code,
            HttpSession session) {

        AuthProfile admin = requireAdmin(session);

        adminChallengeService.deleteChallenge(
                code,
                admin.getCode(),
                admin.getId());

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 삭제 성공", null));
    }


    // 관리자 챌린지 조기 완료 (상태 변경 : PROGRESS_STATUS -> ENDED)
    // 진행 중이고 참여자가 있는 챌린지는 삭제를 제한하고, 조기 완료 기능으로 종료하도록 함
    // 참여자 전원을 달성 완료로 바꾸거나 보상을 자동 지급하는 처리는 별개
    // “조기 완료 상태 변경은 구현됐지만, 종료 후 참여·인증 차단은 아직 미완성"
    @PatchMapping("/{code}/end")
    public ResponseEntity<ApiResponse<Void>> endChallenge(
            @PathVariable Long code,
            HttpSession session) {

        AuthProfile admin = requireAdmin(session);

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

        AuthProfile admin = requireAdmin(session);

        adminChallengeService.restoreChallenge(
                code,
                request.getReason(),
                admin.getCode(),
                admin.getId());

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 복구 성공", null));
    }

    // 챌린지 참여자 목록 조회
    // challenge/entry의 참여자 조회 기능 -> 참여 승인·실격 등 기능이 많아질 때 AdminChallengeEntryController로 분리

    @GetMapping("/{code}/participants")
    public ResponseEntity<ApiResponse<PageResult<AdminChallengeParticipantView>>>
            loadParticipants(
                    @PathVariable Long code,
                    @ModelAttribute PageQuery pageQuery,
                    HttpSession session) {

        requireAdmin(session);

        PageResult<AdminChallengeParticipantView> result =
                adminChallengeService.loadParticipants(code, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 참여자 조회 성공", result));
    }

    // 챌린지 관리 처리 이력 조회
    @GetMapping("/{code}/logs")
    public ResponseEntity<ApiResponse<PageResult<AdminActivity>>>
            loadChallengeLogs(
                    @PathVariable Long code,
                    @ModelAttribute PageQuery pageQuery,
                    HttpSession session) {

        requireAdmin(session);

        PageResult<AdminActivity> result =
                adminChallengeService.loadChallengeLogs(code, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 처리 이력 조회 성공", result));
    }

    // 관리자 챌린지 상세 - 통계 조회
    @GetMapping("/{code}/statistics")
    public ResponseEntity<ApiResponse<AdminChallengeStatisticsView>>
            loadChallengeStatistics(
                    @PathVariable Long code,
                    HttpSession session) {

        requireAdmin(session);

        AdminChallengeStatisticsView result =
                adminChallengeService.loadChallengeStatistics(code);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 상세 통계 조회 성공", result));
    }

    // 관리자 챌린지 참여 순위 조회
    @GetMapping("/{code}/ranking")
    public ResponseEntity<ApiResponse<PageResult<AdminChallengeRankingView>>>
            loadChallengeRanking(
                    @PathVariable Long code,
                    @ModelAttribute PageQuery pageQuery,
                    HttpSession session) {

        requireAdmin(session);

        PageResult<AdminChallengeRankingView> result =
                adminChallengeService.loadChallengeRanking(code, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("챌린지 참여 순위 조회 성공", result));
    }


    // 관리자 회원 상세 - 챌린지 인증 탭
    @GetMapping("/members/{memberCode}/proofs")
    public ResponseEntity<ApiResponse<AdminMemberProofsView>> loadMemberProofs(
            @PathVariable Long memberCode,
            @ModelAttribute PageQuery pageQuery,
            HttpSession session) {

        requireAdmin(session);

        AdminMemberProofsView result =
                adminChallengeService.loadMemberProofs(memberCode, pageQuery);

        return ResponseEntity.ok(
                ApiResponse.success("회원 챌린지 인증내역 조회 성공", result));
    }

    // 공통 로그인·관리자 권한 검사
    // 검사에 통과하면 로그인한 관리자 정보를 반환
    private AuthProfile requireAdmin(HttpSession session) {

        AuthProfile loginUser =
                (AuthProfile) session.getAttribute("loginUser");

        if (loginUser == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "로그인이 필요합니다.");
        }

        String role = loginUser.getRole();

        if (!"ROLE_SUPER".equals(role)
                && !"ROLE_MANAGER".equals(role)
                && !"ROLE_STAFF".equals(role)) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "관리자만 사용할 수 있습니다.");
        }

        return loginUser;
    }
}

//현재는 501을 반환하고, 나중에 서비스와 응답 DTO를 연결

// //랭킹·인기·최신 조회는 기존 공통 조회 API를 사용
// //비공개·숨김·복구·참여자 조회·처리 이력은 서비스와 DB 지원을 추가


