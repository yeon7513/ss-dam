package com.ss_dam.auth.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.auth.member.service.MemberService;
import com.ss_dam.common.ApiResponse;

@RestController
@RequestMapping("/api/admin/member")
public class MemberController {

	@Autowired
	MemberService memberService;

	@GetMapping("/{memCode}")
	public ResponseEntity<ApiResponse<MemberProfile>> searchProfileByMemberCode(@PathVariable Long memCode) {

		MemberProfile profile = memberService.searchProfileByMemberCode(memCode);
		
		if(profile == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.fail("존재하지 않는 회원 프로필입니다"));
		}
		
		return ResponseEntity.ok(ApiResponse.success("회원 프로필 조회에 성공했습니다", profile)); 
	}

	// @RequestPart? @ModelAttribute? 뭐가 좋은지 모르겠음..
	// 작년에는 RequestPart로 따로 가져왔는데 ModelAttribute는 한번에 되나봄.
	// -> @ModelAttribute가 간단해보여서 사용
	// 참고
	// https://velog.io/@bushyerin/RequestParam-RequestBody-RequestPart
	@PostMapping
	public ResponseEntity<ApiResponse<Member>> registerMember(@ModelAttribute Member member) {

		// INSERT 후 새로 생성된 PK 불러오기
		Long code = memberService.registerMember(member);

		if (code != null) {
			// 회원가입 후 로그인 처리
			Member loginedMember = memberService.searchMemberByCode(code);

			// 세션에 저장 예정
			// 로그인 구현 후 작성할 것
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(ApiResponse.success("회원 등록에 성공했습니다", loginedMember));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.fail("회원 등록에 실패했습니다"));
		}

	}

}
