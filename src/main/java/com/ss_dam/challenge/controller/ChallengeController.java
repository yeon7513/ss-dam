package com.ss_dam.challenge.controller;

import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.service.ChallengeService;
import com.ss_dam.common.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/challenge")
public class ChallengeController {

	@Autowired
	ChallengeService challengeService;

	// 전체 챌린지 조회
	@GetMapping
	public ResponseEntity<ApiResponse<List<Challenge>>> searchChallenges() {
		List<Challenge> challenges = challengeService.searchChallenges();

		return ResponseEntity.ok(ApiResponse.success("전체 챌린지 조회에 성공했습니다", challenges));
	}

	// 챌린지 상세 조회
	@GetMapping("/{code}")
	public ResponseEntity<ApiResponse<Challenge>> searchChallengeByCode(@PathVariable int code) {
		Challenge challenge = challengeService.searchChallengeByCode(code);
		
		if(challenge == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.fail("존재하지 않는 챌린지입니다"));
		}

		return ResponseEntity.ok(ApiResponse.success("챌린지 상세 조회에 성공했습니다", challenge));
	}

	// 인기 챌린지 TOP 3
	@GetMapping("/popular")
	public ResponseEntity<ApiResponse<List<Challenge>>> searchPopularChallenges() {
		List<Challenge> challenges = challengeService.searchPopularChallenges();

		return ResponseEntity.ok(ApiResponse.success("인기 챌린지 조회에 성공했습니다", challenges));
	}

	// 최신 등록 챌린지 1개
	@GetMapping("/latest")
	public ResponseEntity<ApiResponse<Challenge>> searchLatestChallenge() {
		Challenge challenge = challengeService.searchLatestChallenge();
		if(challenge == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.fail("최신 등록된 챌린지가 없습니다"));
		}

		return ResponseEntity.ok(ApiResponse.success("최신 등록 챌린지 조회에 성공했습니다", challenge));
	}

	// 챌린지 등록
	@PostMapping
	public ResponseEntity<ApiResponse<Void>> registerChallenge(@RequestBody Challenge challenge) {
		challengeService.registerChallenge(challenge);

		return ResponseEntity.ok(ApiResponse.success("챌린지가 성공적으로 등록되었습니다", null));
	}

	// 챌린지 수정
	@PutMapping("/{code}")
	public ResponseEntity<ApiResponse<Void>> updateChallenge(@PathVariable int code, @RequestBody Challenge challenge) {

		challenge.setCode(code);
		challengeService.updateChallenge(challenge);

		return ResponseEntity.ok(ApiResponse.success("챌린지가 성공적으로 수정되었습니다", null));
	}

	// 챌린지 삭제
	@DeleteMapping("/{code}")
	public ResponseEntity<ApiResponse<Void>> deleteChallenge(@PathVariable int code) {
		challengeService.deleteChallenge(code);

		return ResponseEntity.ok(ApiResponse.success("챌린지가 성공적으로 삭제되었습니다", null));
	}
}
