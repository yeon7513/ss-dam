package com.ss_dam.feed.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ss_dam.feed.FeedHashtag;
import com.ss_dam.feed.service.FeedHashtagService;

@RestController
@RequestMapping("/hashtag")
public class FeedHashtagController {

  @Autowired
  FeedHashtagService feedHashtagService;

  @GetMapping("/{feedCode}")
  List<FeedHashtag> searchHashtagByFeedCode(@PathVariable Long feedCode) {
    return feedHashtagService.searchHashtagByFeedCode(feedCode);
  }

}
