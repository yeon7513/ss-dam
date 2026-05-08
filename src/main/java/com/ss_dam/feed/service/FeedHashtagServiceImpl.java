package com.ss_dam.feed.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.feed.FeedHashtag;
import com.ss_dam.feed.dao.FeedHashtagDao;

@Service
public class FeedHashtagServiceImpl implements FeedHashtagService {

  @Autowired
  FeedHashtagDao feedHashtagDao;

  @Override
  public List<FeedHashtag> seacrchHashtagByFeedCode(Long feedCode) {
    return feedHashtagDao.seacrchHashtagByFeedCode(feedCode);
  }

}
