package com.ss_dam.challenge.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.Login;
import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.ChallengeInfo;
import com.ss_dam.challenge.service.UserChallengeService;
import com.ss_dam.common.ApiResponse;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/challenge")
public class UserChallengeController {

	//UserChallengController : 목록·상세·인기·최신·랭킹 조회, 챌린지 참여, 내 참여 정보

	@Autowired
	UserChallengeService userChallengeService;

	
	// 전체 챌린지 조회
	@GetMapping
	public ResponseEntity<ApiResponse<List<Challenge>>> searchChallenges(
			@RequestParam(required = false) String progressStatus) {
		List<Challenge> challenges = userChallengeService.searchChallenges(progressStatus);

		return ResponseEntity.ok(ApiResponse.success("전체 챌린지 조회에 성공했습니다", challenges));
	}
	
	// 사용자 랭킹 조회
	@GetMapping("/ranking")
	public ResponseEntity<ApiResponse<List<Map<String, Object>>>> searchTopRankings(){
		List<Map<String, Object>> rankings = userChallengeService.searchTopRankings();
		
		return ResponseEntity.ok(ApiResponse.success("랭킹 목록 조회에 성공했습니다", rankings));
	}

	// 챌린지 상세 조회
	@GetMapping("/{code}")
	public ResponseEntity<ApiResponse<Challenge>> searchChallengeByCode(@PathVariable int code) {
		Challenge challenge = userChallengeService.searchChallengeByCode(code);

		if (challenge == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.fail("존재하지 않는 챌린지입니다"));
		}

		return ResponseEntity.ok(ApiResponse.success("챌린지 상세 조회에 성공했습니다", challenge));
	}

	// 인기 챌린지 TOP 3
	@GetMapping("/popular")
	public ResponseEntity<ApiResponse<List<Challenge>>> searchPopularChallenges() {
		List<Challenge> challenges = userChallengeService.searchPopularChallenges();

		return ResponseEntity.ok(ApiResponse.success("인기 챌린지 조회에 성공했습니다", challenges));
	}

	// 최신 등록 챌린지 1개
	@GetMapping("/latest")
	public ResponseEntity<ApiResponse<Challenge>> searchLatestChallenge() {
		Challenge challenge = userChallengeService.searchLatestChallenge();
		if (challenge == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.fail("최신 등록된 챌린지가 없습니다"));
		}

		return ResponseEntity.ok(ApiResponse.success("최신 등록 챌린지 조회에 성공했습니다", challenge));
	}

	// 챌린지 등록
	@PostMapping
	public ResponseEntity<ApiResponse<Void>> registerChallenge(@RequestBody Challenge challenge) {
		userChallengeService.registerChallenge(challenge);

		return ResponseEntity.ok(ApiResponse.success("챌린지가 성공적으로 등록되었습니다", null));
	}

	// 챌린지 수정
	@PutMapping("/{code}")
	public ResponseEntity<ApiResponse<Void>> updateChallenge(@PathVariable int code, @RequestBody Challenge challenge) {

		challenge.setCode(code);
		userChallengeService.updateChallenge(challenge);

		return ResponseEntity.ok(ApiResponse.success("챌린지가 성공적으로 수정되었습니다", null));
	}

	// 챌린지 삭제
	@DeleteMapping("/{code}")
	public ResponseEntity<ApiResponse<Void>> deleteChallenge(@PathVariable int code) {
		userChallengeService.deleteChallenge(code);

		return ResponseEntity.ok(ApiResponse.success("챌린지가 성공적으로 삭제되었습니다", null));
	}

	@GetMapping("/{code}/info")
	public ResponseEntity<ApiResponse<ChallengeInfo>> searchChallengeInfoByCode(
			@PathVariable int code, 
			HttpSession session){
		
		Login loginUser = (Login) session.getAttribute("loginUser");
		
		int memCode = (loginUser != null) ? loginUser.getCode().intValue() : 0;
		
		ChallengeInfo challengeInfo = userChallengeService.searchChallengeInfoByCode(code, memCode);
		
		if(challengeInfo == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.fail("존재하지 않는 챌린지입니다."));
		}
		
		return ResponseEntity.ok(ApiResponse.success("챌린지 정보 조회 성공", challengeInfo));
	}
	
	@PostMapping("/{code}/join")
	public ResponseEntity<ApiResponse<Void>> joinChallenge(
			@PathVariable int code,
			HttpSession session){
		
		Login loginUser = (Login) session.getAttribute("loginUser");
		
		if(loginUser == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(ApiResponse.fail("로그인이 필요한 페이지입니다."));
		}
		
		int memCode = loginUser.getCode().intValue();
		
		boolean isJoined = userChallengeService.joinChallenge(code, memCode);
		
		if(!isJoined) {
			return ResponseEntity.badRequest()
					.body(ApiResponse.fail("이미 참여중인 챌린지입니다."));
		}		
		
		return ResponseEntity.ok(ApiResponse.success("챌린지 참여 성공", null));
		
	}
	
	
}
