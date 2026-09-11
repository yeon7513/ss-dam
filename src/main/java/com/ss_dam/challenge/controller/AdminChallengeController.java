// package com.ss_dam.challenge.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PatchMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.ss_dam.common.ApiResponse;


// //AdminChallengController : 등록·수정·삭제, 관리자용 목록·상세 조회, 숨김·복구 등 운영 기능

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;

//- AdminChallengeController - 챌린지 목록·상세, 등록·수정, 삭제·복구, 참여자 목록

@RestController
@RequestMapping("/api/admin/challenge")
public class AdminChallengeController {

    // 관리자 챌린지 목록 조회
    // 조건 생략 시 해당 조건으로 제한하지 않음
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> loadChallenges(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String progressStatus,
            @RequestParam(required = false) String visibility,
            @RequestParam(required = false) Boolean deleted) {

        // TODO: 검색·페이지네이션 연결
        // TODO: 진행 상태·공개 범위·삭제 여부 필터 연결
        return notImplemented();
    }

    // 관리자 챌린지 상세 조회
    // 비공개·삭제된 챌린지 포함
    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<Void>> loadChallenge(
            @PathVariable Long code) {

        return notImplemented();
    }

    // 챌린지 등록
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createChallenge() {

        // TODO: 등록 요청 DTO와 입력값 검증 연결
        // TODO: 인증된 관리자 정보 연결
        return notImplemented();
    }

    // 챌린지 수정
    @PutMapping("/{code}")
    public ResponseEntity<ApiResponse<Void>> updateChallenge(
            @PathVariable Long code) {

        // TODO: 수정 요청 DTO와 입력값 검증 연결
        // TODO: 진행 상태에 따른 수정 가능 항목 검증
        return notImplemented();
    }

    // 챌린지 논리 삭제
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

