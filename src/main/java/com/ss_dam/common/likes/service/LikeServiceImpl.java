package com.ss_dam.common.likes.service;

import com.ss_dam.common.likes.dao.LikeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {

  @Autowired
  LikeDao likeDao;

  @Override
  public int countFeedLike(Long feedCode) {
    return likeDao.countFeedLike(feedCode);
  }

  @Override
  public int countCommentLike(Long cmtCode) {
    return likeDao.countCommentLike(cmtCode);
  }

}
