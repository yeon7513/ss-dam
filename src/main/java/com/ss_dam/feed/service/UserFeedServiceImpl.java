package com.ss_dam.feed.service;

import com.ss_dam.comment.model.response.UserCommentView;
import com.ss_dam.comment.service.UserCommentService;
import com.ss_dam.common.image.service.ImageService;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.dao.UserFeedDao;
import com.ss_dam.feed.model.core.FeedHashtag;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.request.FeedUpdate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.FeedEditView;
import com.ss_dam.feed.model.response.UserFeedView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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

  // 피드 목록 조회
  @Override
  public List<UserFeedView> loadFeeds(Pager pager, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return userFeedDao.loadFeeds(params);
  }

  // 피드 단일 상세 조회 -> 아무나 볼 수 있는 단순 게시글
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

  // 피드 등록
  @Transactional
  @Override
  public Long registerFeed(FeedCreate feedCreate) {

    Long newFeedCode = userFeedDao.registerFeed(feedCreate);

    // 2차 방어..
    if (newFeedCode != null) {
      // 이미지 등록
      imageService.uploadImages(feedCreate.getImages(), "feed", newFeedCode);

      // 해시태그 등록
      registerHashtags(feedCreate.getHashtags(), newFeedCode);
    }

    return newFeedCode;
  }

  // 수정할 피드 조회 -> 사용자가 작성한 피드만 조회
  @Override
  public FeedEditView findFeedDetailForEdit(Long feedCode, Long memberCode) {
    Map<String, Long> params = new HashMap<>();
    params.put("feedCode", feedCode);
    params.put("memberCode", memberCode);

    return userFeedDao.findFeedDetailForEdit(params);
  }

  // 피드 수정 -> 피드 포함, 해시태그, 이미지
  @Transactional
  @Override
  public void updateFeed(FeedUpdate feedUpdate) {
    // 피드 수정 실행
    userFeedDao.updateFeed(feedUpdate);

    Long feedCode = feedUpdate.getCode();
    List<MultipartFile> images = feedUpdate.getImages();
    List<Integer> newImageOrders = feedUpdate.getNewImageOrders();

    // 기존 이미지 경로 문자열 & 순서 배열
    List<String> imagePaths = feedUpdate.getImagePaths();
    List<Integer> oldImageOrders = feedUpdate.getOldImageOrders();

    // [ 삭제를 먼저하고, 새로 등록하는 이유? ]
    // -> 글 수정 시 해시태그를 전부 삭제했을 경우를 고려함.

    // 해시태그 삭제 및 재삽입
    deleteHashtags(feedUpdate.getCode());
    List<String> hashtags = feedUpdate.getHashtags();

    if (hashtags != null && !hashtags.isEmpty()) {
      // 새로 등록된 해시태그 삽입
      registerHashtags(hashtags, feedUpdate.getCode());
    }

    // 이미지 수정
    imageService.updateImages(feedCode, "feed", images, newImageOrders, imagePaths, oldImageOrders);

  }


  // 해시태그 등록 메소드
  private void registerHashtags(List<String> hashtags, Long feedCode) {
    if (hashtags == null || hashtags.isEmpty()) {
      return;
    }

    List<FeedHashtag> feedHashtags = new ArrayList<>();

    for (String tagName : hashtags) {
      FeedHashtag feedHashtag = new FeedHashtag();
      feedHashtag.setFeedCode(feedCode);
      feedHashtag.setTagName(tagName);

      feedHashtags.add(feedHashtag);
    }

    userFeedDao.registerHashtags(feedHashtags);
  }

  // 해시태그 삭제 메소드
  private void deleteHashtags(Long feedCode) {
    userFeedDao.deleteHashtags(feedCode);
  }

}
