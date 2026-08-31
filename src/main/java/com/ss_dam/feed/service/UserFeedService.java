package com.ss_dam.feed.service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.FeedEditView;
import com.ss_dam.feed.model.response.UserFeedView;

import java.util.List;

public interface UserFeedService {
  List<UserFeedView> loadFeeds(Pager pager, Long memberCode);

  FeedDetail findFeedDetailByFeedCode(Long FeedCode, Pager pager, Long memberCode);

  Long registerFeed(FeedCreate feedCreate);

  FeedEditView findFeedDetailForEdit(Long feedCode, Long memberCode);
}
