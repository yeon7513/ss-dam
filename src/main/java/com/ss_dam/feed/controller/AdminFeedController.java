package com.ss_dam.feed.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/feeds")
public class AdminFeedController {

/*
// 전체 피드 조회
// GET /api/admin/feeds
// 정상 피드 조회
// GET /api/admin/feeds?status=ACTIVE
// 비공개 피드 조회
// GET /api/admin/feeds?status=PRIVATE
// 숨김 피드 조회
// GET /api/admin/feeds?status=BLINDED
// 신고된 피드 조회
// GET /api/admin/feeds?status=REPORTED
// 삭제된 피드 조회
// GET /api/admin/feeds?status=DELETED
// 위 필터는 같은 @GetMapping에서 @RequestParam으로 받음
@GetMapping

// 피드 상세 조회 (비공개·숨김·삭제 상태 포함)
@GetMapping("/{feedCode}")

// 피드 숨김
@PatchMapping("/{feedCode}/hide")

// 피드 숨김 해제
@PatchMapping("/{feedCode}/unhide")

// 피드 삭제
@DeleteMapping("/{feedCode}")

// 삭제된 피드 복구
@PatchMapping("/{feedCode}/restore")
*/

//비공개는 현재 enum에서 일반 사용자용 설정으로 정의되어 있어서 관리자에게는 조회 기능만
//숨김 해제·삭제 복구 시 원래 비공개 상태를 유지하려면 이전 상태를 저장하는 처리도 필요
  
}
