package com.ss_dam.feed.service;

import java.util.List;
import com.ss_dam.feed.Feed;

public interface FeedService {

  List<Feed> searchFeeds();

  Feed searchDetail(Long code);

}
