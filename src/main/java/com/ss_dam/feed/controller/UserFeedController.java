package com.ss_dam.feed.controller;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.response.UserFeedView;
import com.ss_dam.feed.service.UserFeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


// @RestController 어노테이션 붙이면
// 각 메소드에 @ResponseBody 안붙여도 됩니다! (자동으로 JSON 변환)
@RestController
@RequestMapping("/api/feed") // 26.06.30 엔드포인트 수정 -> 일반 사용자용(비회원, 회원)은 /user 안붙임
// 또한 RESTful 방식이니, 엔드포인트는 하나만 해놔도 작동합니다~
// RESTful API란?
// -> 사용자가 요청하는 HTTP 메소드(GET, POST, PUT, DELETE 등)에 따라
// 각 일치하는 어노테이션이 붙은 메소드를 실행~!
public class UserFeedController {

  @Autowired
  UserFeedService userFeedService;

  List<UserFeedView> searchFeeds(Pager pager) {
    
    return userFeedService.searchFeeds(pager);
  }


}
