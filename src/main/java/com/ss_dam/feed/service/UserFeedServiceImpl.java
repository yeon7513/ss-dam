package com.ss_dam.feed.service;

import com.ss_dam.comment.model.response.UserCommentView;
import com.ss_dam.comment.service.UserCommentService;
import com.ss_dam.common.image.service.ImageService;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.dao.UserFeedDao;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.UserFeedView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserFeedServiceImpl implements UserFeedService {

  @Autowired
  UserFeedDao userFeedDao;

  @Autowired
  UserCommentService userCommentService;

  @Autowired
  ImageService imageService;


  @Override
  public List<UserFeedView> loadFeeds(Pager pager, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return userFeedDao.loadFeeds(params);
  }

  @Override
  public FeedDetail findFeedDetailByFeedCode(Long FeedCode, Pager pager, Long memberCode) {

    Map<String, Object> params = new HashMap<>();
    params.put("memberCode", memberCode);
    params.put("feedCode", FeedCode);

    FeedDetail feedDetail = userFeedDao.findFeedDetailByFeedCode(params);
    List<UserCommentView> comments =
        userCommentService.findCommentsByFeedCode(FeedCode, pager, memberCode);

    feedDetail.setComments(comments);

    return feedDetail;
  }

  @Override
  public Long registerFeed(FeedCreate feedCreate) {

    Long newFeedCode = userFeedDao.registerFeed(feedCreate);

    imageService.uploadImages(feedCreate.getImages(), "feed", newFeedCode);

    return newFeedCode;
  }
}
