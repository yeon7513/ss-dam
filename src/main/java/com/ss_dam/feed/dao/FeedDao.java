package com.ss_dam.feed.dao;

import java.util.List;
import com.ss_dam.feed.Feed;

public interface FeedDao {

  List<Feed> searchAllFeeds();

  Feed searchDetail(Long code);

}
