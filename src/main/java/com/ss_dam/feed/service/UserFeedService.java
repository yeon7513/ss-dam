package com.ss_dam.feed.service;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.feed.model.filter.UserFeedSearchFilter;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.request.FeedUpdate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.FeedEditView;
import com.ss_dam.feed.model.response.UserFeedView;

public interface UserFeedService {
  PageResult<UserFeedView> loadFeeds(UserFeedSearchFilter filter, Long memberCode);

  FeedDetail findFeedDetailByFeedCode(Long feedCode, AuthProfile loginUser);

  Long registerFeed(FeedCreate feedCreate, AuthProfile loginUser);

  FeedEditView findFeedDetailForEdit(Long feedCode, Long memberCode);

  void updateFeed(FeedUpdate feedUpdate, AuthProfile loginUser);

  void deleteFeed(Long feedCode, AuthProfile loginUser);

  int getProofCount(int chalCode, int memCode);
}
