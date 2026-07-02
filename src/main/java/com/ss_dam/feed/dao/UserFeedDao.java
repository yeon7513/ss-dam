package com.ss_dam.feed.dao;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.response.UserFeedView;

import java.util.List;

public interface UserFeedDao {
  List<UserFeedView> searchFeeds(Pager pager);
}
