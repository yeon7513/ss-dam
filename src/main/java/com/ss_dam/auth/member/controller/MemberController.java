package com.ss_dam.auth.member.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.auth.member.service.MemberService;

@RestController
@RequestMapping("/member")
public class MemberController {

  @Autowired
  MemberService memberService;

  @GetMapping("/{memCode}")
  List<MemberProfile> searchProfileByMemberCode(@PathVariable Long memCode) {
    return memberService.searchProfileByMemberCode(memCode);
  }

  // @PostMapping
  // ResponseEntity<?> registerMember() {
  //
  // }

}
