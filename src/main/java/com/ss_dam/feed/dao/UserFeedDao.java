package com.ss_dam.feed.dao;

import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.UserFeedView;

import java.util.List;
import java.util.Map;

public interface UserFeedDao {
  List<UserFeedView> loadFeeds(Map<String, Object> params);

  FeedDetail findFeedDetailByFeedCode(Map<String, Object> params);

  Long registerFeed(FeedCreate feedCreate);
}
