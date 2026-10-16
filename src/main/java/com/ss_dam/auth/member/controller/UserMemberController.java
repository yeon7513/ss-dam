package com.ss_dam.auth.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.model.request.MemberUpdateRequest;
import com.ss_dam.auth.member.service.MemberService;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.validator.auth.AuthValidator;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/member")
public class UserMemberController {

  private final MemberService memberService;
  private final AuthValidator authValidator;

  public UserMemberController(
      MemberService memberService,
      AuthValidator authValidator
  ) {
    this.memberService = memberService;
    this.authValidator = authValidator;
  }

  @GetMapping("/{memCode}")
  public ResponseEntity<ApiResponse<MemberProfile>> searchProfileByMemberCode(
      @PathVariable Long memCode) {

    MemberProfile profile = memberService.searchProfileByMemberCode(memCode);

    if (profile == null) {
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
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.fail("회원 등록에 실패했습니다"));
    }

  }

  // 아이디 중복 확인
  @GetMapping("/check-id")
  public ResponseEntity<ApiResponse<Boolean>> checkId(@RequestParam("id") String id) {

    boolean isDuplicated = memberService.isIdDuplicated(id);

    if (isDuplicated) {
      return ResponseEntity.ok(ApiResponse.success("이미 사용 중인 아이디입니다", true));
    }

    return ResponseEntity.ok(ApiResponse.success("사용 가능한 아이디입니다", false));
  }

  // 회원 정보 수정
  // PATCH /api/member/update
  @PatchMapping("/update")
  public ResponseEntity<ApiResponse<Void>> updateMember(
      @ModelAttribute MemberUpdateRequest request,
      HttpSession session
  ) {
    AuthProfile loginUser = authValidator.requireMember(session);

    // 수정할 회원번호는 로그인 세션에서 가져옴
    memberService.updateMember(loginUser.getCode(), request);

    return ResponseEntity.ok(
        ApiResponse.success("회원 정보가 수정되었습니다.", null)
    );
  }

  // 회원 탈퇴
  // DELETE /api/member/delete
  @DeleteMapping("/delete")
  public ResponseEntity<ApiResponse<Void>> deleteMember(
      HttpSession session
  ) {
    AuthProfile loginUser = authValidator.requireMember(session);

    memberService.deleteMember(loginUser.getCode());

    // 탈퇴 처리에 성공한 뒤 로그아웃
    session.invalidate();

    return ResponseEntity.ok(
        ApiResponse.success("회원 탈퇴가 완료되었습니다.", null)
    );
  }
}
