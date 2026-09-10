package com.ss_dam.feed.service;

import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.request.FeedUpdate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.FeedEditView;
import com.ss_dam.feed.model.response.UserFeedView;

public interface UserFeedService {
  PageResult<UserFeedView> loadFeeds(PageQuery pageQuery, Long memberCode);

  FeedDetail findFeedDetailByFeedCode(Long FeedCode, Long memberCode);

  Long registerFeed(FeedCreate feedCreate);

  FeedEditView findFeedDetailForEdit(Long feedCode, Long memberCode);

  void updateFeed(FeedUpdate feedUpdate);

  void deleteFeed(Long feedCode, String updatedBy);
}
