package com.ss_dam.feed.service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.dao.UserFeedDao;
import com.ss_dam.feed.model.response.UserFeedView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserFeedServiceImpl implements UserFeedService {

  @Autowired
  UserFeedDao userFeedDao;


  @Override
  public List<UserFeedView> searchFeeds(Pager pager) {

    return userFeedDao.searchFeeds(pager);
  }
}
