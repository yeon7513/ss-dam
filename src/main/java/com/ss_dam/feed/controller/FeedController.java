package com.ss_dam.feed.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ss_dam.feed.Feed;
import com.ss_dam.feed.service.FeedService;


// @RestController 어노테이션 붙이면
// 각 메소드에 @ResponseBody 안붙여도 됩니다! (자동으로 JSON 변환)
@RestController
@RequestMapping("/feed")
// 또한 RESTful 방식이니, 엔드포인트는 하나만 해놔도 작동합니다~
// RESTful API란?
// -> 사용자가 요청하는 HTTP 메소드(GET, POST, PUT, DELETE 등)에 따라
// 각 일치하는 어노테이션이 붙은 메소드를 실행~!
public class FeedController {

  @Autowired
  FeedService feedService;

  // 전체 피드 조회
  @GetMapping
  List<Feed> searchFeeds() {
    return feedService.searchFeeds();
  }

  // 피드 상세 조회
  @GetMapping("/{code}")
  Feed searchDetail(@PathVariable Long code) {
    return feedService.searchDetail(code);
  }



}
