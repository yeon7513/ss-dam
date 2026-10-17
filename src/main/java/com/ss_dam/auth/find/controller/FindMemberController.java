package com.ss_dam.auth.find.controller;

import com.ss_dam.auth.find.model.ChangePassword;
import com.ss_dam.auth.find.model.FindMember;
import com.ss_dam.auth.find.service.FindMemberService;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.validator.auth.AuthValidator;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/find")
public class FindMemberController {

  private final AuthValidator authValidator;
  private final FindMemberService findMemberService;

  public FindMemberController(AuthValidator authValidator, FindMemberService findMemberService) {
    this.authValidator = authValidator;
    this.findMemberService = findMemberService;
  }

  @PostMapping("/id")
  public ResponseEntity<ApiResponse<String>> findMemberId(FindMember findMember) {
    MemberProfile resultMember = findMemberService.findMemberId(findMember);

    if (resultMember == null)
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.fail("아이디 조회 실패"));

    String resultId = resultMember.getId();

    return ResponseEntity.ok(ApiResponse.success("검색하신 아이디", resultId));
  }

  @PostMapping("/password")
  public ResponseEntity<ApiResponse<Long>> findMemberPassword(FindMember findMember) {
    Long memberCode = findMemberService.findMemberPw(findMember);
    if (memberCode == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("비밀번호 조회 실패"));

    return ResponseEntity.ok(ApiResponse.success("조회 성공", memberCode));
  }

  @PostMapping("/changepassword")
  public ResponseEntity<ApiResponse<Boolean>> changePassword(ChangePassword changePassword) {
    boolean changePw = findMemberService.changePw(changePassword);

    if (!changePw) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("비밀번호 변경 실패"));
    }

    return ResponseEntity.ok(ApiResponse.success("비밀번호 변경 성공", null));
  }

  // 포인트 송금 시 필요한 비밀번호 조회
  @PostMapping("/password-check")
  public ResponseEntity<Boolean> checkPassword(HttpSession session, @RequestBody String password) {
    AuthProfile loginUser = authValidator.requireLogin(session);

    System.out.println("password: " + password);

    boolean isCheckedPassword = findMemberService.checkPassword(loginUser.getCode(), password);

    System.out.println("isCheckedPassword: " + isCheckedPassword);

    return ResponseEntity.ok(isCheckedPassword);
  }


}
