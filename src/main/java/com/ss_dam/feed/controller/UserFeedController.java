package com.ss_dam.feed.controller;



import com.ss_dam.auth.login.Login;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.UserFeedView;
import com.ss_dam.feed.service.UserFeedService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// @RestController 어노테이션 붙이면
// 각 메소드에 @ResponseBody 안붙여도 됩니다! (자동으로 JSON 변환)
// 또한 RESTful 방식이니, 엔드포인트는 하나만 해놔도 작동합니다~
// RESTful API란?
// -> 사용자가 요청하는 HTTP 메소드(GET, POST, PUT, DELETE 등)에 따라
// 각 일치하는 어노테이션이 붙은 메소드를 실행~!
@RestController
@RequestMapping("/api/feeds") // 26.06.30 엔드포인트 수정 -> 일반 사용자용(비회원, 회원)은 /user 안붙임
public class UserFeedController {

  @Autowired
  UserFeedService userFeedService;

  // 전체 피드 목록 조회
  @GetMapping
  List<UserFeedView> loadFeeds(Pager pager, HttpSession session) {

    //    System.out.println("=== 세션 디버깅 시작 ===");
    //    // 1. 현재 세션의 고유 ID 확인
    //    System.out.println("Session ID: " + session.getId());
    //
    //    // 2. 세션에 저장된 모든 속성의 이름(Key)과 값(Value) 확인
    //    java.util.Enumeration<String> attributeNames = session.getAttributeNames();
    //    while (attributeNames.hasMoreElements()) {
    //      String name = attributeNames.nextElement();
    //      System.out.println("Session Key: " + name + " / Value: " + session.getAttribute(name));
    //    }
    //    System.out.println("=== 세션 디버깅 끝 ===");

    // 로그인한 사용자의 좋아요 여부를 받아오기 위해 세션에서 정보를 꺼내옴.
    Login loginUser = (Login) session.getAttribute("loginUser");
    // NullException을 방지하기 위해 삼항연산자로 분기 처리함.
    // -> 로그인 했을 경우, 해당 사용자의 고유 번호를 넘겨줌
    // -> 로그인하지 않았을 경우는 처음부터 null을 넘겨 무조건 false가 나오게 처리
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    System.out.println("memberCode: " + memberCode);

    return userFeedService.loadFeeds(pager, memberCode);
  }

  // 단일 피드 조회
  @GetMapping("/{feedCode}")
  FeedDetail findFeedDetailByFeedCode(@PathVariable Long feedCode, HttpSession session,
      Pager pager) {
    // 단일 조회지만 Pager를 받아온 이유?
    // -> 댓글 부분에 사용하기 위해..

    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    return userFeedService.findFeedDetailByFeedCode(feedCode, pager, memberCode);
  }

  // 피드 등록
  @PostMapping
  Long registerFeed(FeedCreate feedCreate, HttpSession session) {

    //    Login loginUser = (Login) session.getAttribute("loginUser");
    //    feedCreate.setMemCode(loginUser.getCode());
    //    feedCreate.setCreatedBy(loginUser.getMemberId());

    // 임시로 회원 번호 1로...
    feedCreate.setMemCode(1L);
    feedCreate.setCreatedBy("user01");

    Long newFeedCode = userFeedService.registerFeed(feedCreate);

    return newFeedCode;

  }


}
