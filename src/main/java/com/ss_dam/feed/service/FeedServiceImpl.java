package com.ss_dam.feed.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.feed.Feed;
import com.ss_dam.feed.dao.FeedDao;

@Service
public class FeedServiceImpl implements FeedService {

  @Autowired
  FeedDao feedDao;

  @Override
  public List<Feed> searchAllFeeds() {
    return feedDao.searchAllFeeds();
  }

}
