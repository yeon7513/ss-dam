package com.ss_dam.feed.dao;

import com.ss_dam.feed.model.core.FeedHashtag;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.request.FeedUpdate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.FeedEditView;
import com.ss_dam.feed.model.response.UserFeedView;

import java.util.List;
import java.util.Map;

public interface UserFeedDao {
  List<UserFeedView> loadFeeds(Map<String, Object> params);

  FeedDetail findFeedDetailByFeedCode(Map<String, Object> params);

  Long registerFeed(FeedCreate feedCreate);

  void registerHashtags(List<FeedHashtag> feedHashtags);

  FeedEditView findFeedDetailForEdit(Map<String, Long> params);

  void deleteHashtags(Long feedCode);

  void updateFeed(FeedUpdate feedUpdate);

  void deleteFeed(Map<String, Object> params);
}
