package com.ss_dam.global.likes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.global.likes.dao.LikeDao;

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
