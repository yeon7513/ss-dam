package com.ss_dam.feed.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.login.model.response.AdminProfile;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.feed.model.filter.AdminFeedSearchFilter;
import com.ss_dam.feed.model.request.AdminFeedActionRequest;
import com.ss_dam.feed.model.response.AdminFeedLogView;
import com.ss_dam.feed.model.response.AdminFeedView;
import com.ss_dam.feed.model.response.AdminMemberFeedsView;
import com.ss_dam.feed.service.AdminFeedService;

import jakarta.servlet.http.HttpSession;

// - AdminFeedController - 피드 목록·상세, 삭제·복구, 처리 사유·이력

@RestController
@RequestMapping("/api/admin/feeds")
public class AdminFeedController {

  private final AdminFeedService adminFeedService;
  
  public AdminFeedController (AdminFeedService adminFeedService) {
    this.adminFeedService = adminFeedService;
  }
  
    // 관리자 피드 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<PageResult<AdminFeedView>>> loadFeeds(
            @ModelAttribute AdminFeedSearchFilter filter) {
            //status파라미터로 ACTIVE, PRIVATE 상태 구분
            //EX)공개 피드 조회 : GET /api/admin/feeds?status=ACTIVE

        // TODO: 검색·페이지네이션·상태 필터 연결
        PageResult<AdminFeedView> result = adminFeedService.loadFeeds(filter);
        
        return ResponseEntity.ok(
        		ApiResponse.success("관리자 피드 목록 조회 성공", result));
    }

    // 관리자 피드 상세 조회
    // 비공개·삭제된 피드 포함
    @GetMapping("/{feedCode}")
    public ResponseEntity<ApiResponse<AdminFeedView>> loadFeed(
            @PathVariable Long feedCode) {
    	
    	AdminFeedView result = adminFeedService.loadFeed(feedCode);
    	
        return ResponseEntity.ok(
        		ApiResponse.success("관리자 피드 상세 조회 성공", result));
    }

    // 피드 논리 삭제
    @DeleteMapping("/{feedCode}")
    public ResponseEntity<ApiResponse<Void>> deleteFeed(
            @PathVariable Long feedCode,
            @RequestBody AdminFeedActionRequest request,
            HttpSession session) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 삭제와 처리 이력 저장을 같은 트랜잭션으로 처리
    	Long admCode = getLoginAdminCode(session);
    	
    	adminFeedService.deleteFeed(feedCode, request.getReason(), admCode);
    	
    	return ResponseEntity.ok(
    			ApiResponse.success("피드가 비활성화 되었습니다", null));        
    }

    // 삭제된 피드 복구
    @PatchMapping("/{feedCode}/restore")
    public ResponseEntity<ApiResponse<Void>> restoreFeed(
            @PathVariable Long feedCode,
            @RequestBody AdminFeedActionRequest request,
            HttpSession session) {

        // TODO: 처리 사유 요청 DTO와 인증된 관리자 정보 연결
        // TODO: 복구와 처리 이력 저장을 같은 트랜잭션으로 처리
        // 숨김 해제·삭제 복구 시 이전 비공개 상태를 유지하는 처리도 서비스에서 구현
    	
    	Long admCode = getLoginAdminCode(session);
    	
    	adminFeedService.restoreFeed(feedCode, request.getReason(), admCode);
    	
        return ResponseEntity.ok(
        		ApiResponse.success("피드가 복구되었습니다", null));
    }

    // 피드 관리 처리 이력 조회
    @GetMapping("/{feedCode}/logs")
    public ResponseEntity<ApiResponse<List<AdminFeedLogView>>> loadFeedLogs(
            @PathVariable Long feedCode) {
    	
    	List<AdminFeedLogView> result = adminFeedService.loadFeedLogs(feedCode);

        return ResponseEntity.ok(
        		ApiResponse.success("피드 조치 이력 조회 성공", result));
    }

    // 관리자 회원 상세 - 작성 피드 탭
    // 해당 회원의 피드 목록과 전체 등록·좋아요·조회수 통계 반환
    @GetMapping("/members/{memberCode}")
    public ResponseEntity<ApiResponse<AdminMemberFeedsView>> loadMemberFeeds(
            @PathVariable Long memberCode,
            @ModelAttribute PageQuery pageQuery) {


    AdminMemberFeedsView result =
            adminFeedService.loadMemberFeeds(memberCode, pageQuery);

    return ResponseEntity.ok(
            ApiResponse.success("회원 작성 피드 조회 성공", result));
    }
    
    private Long getLoginAdminCode(HttpSession session) {
    	Object adminObj = session.getAttribute("loginUser");
    	
    	if(adminObj instanceof AdminProfile adminProfile) {
    		
    		return adminProfile.getCode();
    	}
    	
    	if(adminObj == null) {
    		throw new ResponseStatusException(
    				HttpStatus.UNAUTHORIZED, "관리자 로그인 세션이 만료되었거나 권한이 없습니다");
    		
    	}
    	
    	throw new ResponseStatusException(
    			HttpStatus.UNAUTHORIZED, "올바른 관리자 계정 정보가 아닙니다");    	
    }

    // 미구현 API 공통 응답
    private ResponseEntity<ApiResponse<Void>> notImplemented() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(ApiResponse.<Void>fail(
                        "아직 구현되지 않은 기능입니다."));
    }
}

/*요청 예시
# 공개 피드 조회
GET /api/admin/feeds?status=ACTIVE

# 비공개 피드 조회
GET /api/admin/feeds?status=PRIVATE

# 전체 피드 조회
GET /api/admin/feeds
 */



