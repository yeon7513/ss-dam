package com.ss_dam.feed.controller;



import com.ss_dam.auth.login.Login;
import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.request.FeedUpdate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.FeedEditView;
import com.ss_dam.feed.model.response.UserFeedView;
import com.ss_dam.feed.service.UserFeedService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  ResponseEntity<ApiResponse<List<UserFeedView>>> loadFeeds(Pager pager, HttpSession session) {

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

    List<UserFeedView> feeds = userFeedService.loadFeeds(pager, memberCode);

    return ResponseEntity.ok(ApiResponse.success("피드 정보 조회 성공", feeds));
  }

  // 단일 피드 조회
  @GetMapping("/{feedCode}")
  ResponseEntity<ApiResponse<FeedDetail>> findFeedDetailByFeedCode(@PathVariable Long feedCode,
      HttpSession session, Pager pager) {
    // 단일 조회지만 Pager를 받아온 이유?
    // -> 댓글 부분에 사용하기 위해..

    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    FeedDetail feedDetail = userFeedService.findFeedDetailByFeedCode(feedCode, pager, memberCode);

    if (feedDetail == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(ApiResponse.fail("해당 피드에 대한 정보를 찾을 수 없습니다."));
    }

    return ResponseEntity.ok(ApiResponse.success("피드 상세 조회 성공", feedDetail));
  }

  // 피드 등록
  @PostMapping
  ResponseEntity<ApiResponse<Long>> registerFeed(FeedCreate feedCreate, HttpSession session) {

    //    Login loginUser = (Login) session.getAttribute("loginUser");
    //    feedCreate.setMemCode(loginUser.getCode());
    //    feedCreate.setCreatedBy(loginUser.getMemberId());

    // 임시로 회원 번호 1로...
    feedCreate.setMemCode(1L);
    feedCreate.setCreatedBy("user01");

    Long newFeedCode = userFeedService.registerFeed(feedCreate);

    if (newFeedCode == null || newFeedCode == 0) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.fail("피드 등록에 실패했습니다."));
    }

    return ResponseEntity.ok(ApiResponse.success("피드가 등록되었습니다.", newFeedCode));
  }

  // 수정할 피드 데이터 조회
  @GetMapping("/{feedCode}/edit")
  ResponseEntity<ApiResponse<FeedEditView>> findFeedDetailForEdit(@PathVariable Long feedCode,
      HttpSession session) {

    // 로그인한 사용자가 피드를 작성한 사용자가 맞는지
    //    Login loginUser = (Login) session.getAttribute("loginUser");
    //    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    // 임시로 회원 번호 지정
    Long memberCode = 1L;

    FeedEditView feedDetailForEdit = userFeedService.findFeedDetailForEdit(feedCode, memberCode);

    if (feedDetailForEdit == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(ApiResponse.fail("존재하지 않는 피드 게시글입니다."));
    }

    return ResponseEntity.ok(ApiResponse.success("피드 수정 데이터 조회 성공", feedDetailForEdit));
  }

  // 피드 수정
  @PutMapping("/{feedCode}")
  ResponseEntity<ApiResponse<Void>> updateFeed(@PathVariable Long feedCode, FeedUpdate feedUpdate,
      HttpSession session) {

    return ResponseEntity.ok(ApiResponse.success("피드 수정 완료", null));
  }


}
