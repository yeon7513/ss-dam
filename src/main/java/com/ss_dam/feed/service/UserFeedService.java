package com.ss_dam.feed.service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.response.UserFeedView;

import java.util.List;

public interface UserFeedService {
  List<UserFeedView> searchFeeds(Pager pager);
}
