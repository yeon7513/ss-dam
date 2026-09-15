package com.ss_dam.challenge.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping ("/api/admin/challenge")
public class AdminChallengeController {

  //AdminChallengController : 등록·수정·삭제, 관리자용 목록·상세 조회, 숨김·복구 등 운영 기능
  

  /* 

// 전체 챌린지 조회
// GET /api/admin/challenge
// 진행 예정 챌린지 조회
// GET /api/admin/challenge?progressStatus=UPCOMING
// 진행 중 챌린지 조회
// GET /api/admin/challenge?progressStatus=ONGOING
// 종료된 챌린지 조회
// GET /api/admin/challenge?progressStatus=ENDED

// 공개 챌린지 조회
// GET /api/admin/challenge?visibility=PUBLIC
// 비공개 챌린지 조회
// GET /api/admin/challenge?visibility=PRIVATE
// 숨김 챌린지 조회
// GET /api/admin/challenge?hidden=true
// 삭제된 챌린지 조회
// GET /api/admin/challenge?deleted=true

// 필터 조합: 진행 중인 비공개 챌린지
// GET /api/admin/challenge?progressStatus=ONGOING&visibility=PRIVATE
// 위 필터는 같은 @GetMapping에서 @RequestParam으로 받음
@GetMapping

// 챌린지 상세 조회 (비공개·숨김·삭제 상태 포함)
@GetMapping("/{code}")

// 챌린지 등록
@PostMapping

// 챌린지 수정
@PutMapping("/{code}")

// 공개·비공개 변경
// 요청 본문: {"visibility": "PRIVATE"} 또는 {"visibility": "PUBLIC"}
@PatchMapping("/{code}/visibility")

// 챌린지 숨김
@PatchMapping("/{code}/hide")

// 챌린지 숨김 해제
@PatchMapping("/{code}/unhide")

// 챌린지 삭제
@DeleteMapping("/{code}")

// 삭제된 챌린지 복구
@PatchMapping("/{code}/restore")

// 챌린지 참여자 목록 조회
@GetMapping("/{code}/participants")

// 챌린지 관리 처리 이력 조회
@GetMapping("/{code}/logs")
*/

//랭킹·인기·최신 조회는 기존 공통 조회 API를 사용
//비공개·숨김·복구·참여자 조회·처리 이력은 서비스와 DB 지원을 추가
}
