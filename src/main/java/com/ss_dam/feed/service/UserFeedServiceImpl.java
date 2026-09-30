package com.ss_dam.feed.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.challenge.dao.UserChallengeDao;
import com.ss_dam.challenge.service.ChallengeWriteGuard;
import com.ss_dam.comment.service.UserCommentService;
import com.ss_dam.common.image.service.ImageService;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.feed.dao.UserFeedDao;
import com.ss_dam.feed.model.core.FeedHashtag;
import com.ss_dam.feed.model.filter.UserFeedSearchFilter;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.request.FeedUpdate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.FeedEditView;
import com.ss_dam.feed.model.response.UserFeedView;

@Service
public class UserFeedServiceImpl implements UserFeedService {

  @Autowired
  UserFeedDao userFeedDao;

  @Autowired
  UserCommentService userCommentService;

  @Autowired
  ImageService imageService;

  @Autowired
  private ChallengeWriteGuard challengeWriteGuard;

  @Autowired
  private UserChallengeDao userChallengeDao;


  // 피드 목록 조회
  @Override
  public PageResult<UserFeedView> loadFeeds(UserFeedSearchFilter filter, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("offset", filter.getOffset());
    params.put("perPage", filter.getPerPage());
    params.put("chalCode", filter.getChalCode());
    params.put("keyword", filter.getKeyword());
    params.put("sortTarget", filter.getSortTarget());

    List<UserFeedView> feeds = userFeedDao.loadFeeds(params);
    float total = userFeedDao.loadFeedsTotalCount(filter);

    return PageResult.of(feeds, filter, total);
  }


  // 피드 단일 상세 조회 -> 아무나 볼 수 있는 단순 게시글
  @Override
  public FeedDetail findFeedDetailByFeedCode(Long FeedCode, Long memberCode) {

    Map<String, Object> params = new HashMap<>();
    params.put("memberCode", memberCode);
    params.put("feedCode", FeedCode);

    FeedDetail feedDetail = userFeedDao.findFeedDetailByFeedCode(params);

    return feedDetail;
  }


  // 피드 등록
  @Transactional(isolation = Isolation.READ_COMMITTED)
  @Override
  public Long registerFeed(FeedCreate feedCreate) {

      // 1. 회원 정보 확인
      if (feedCreate.getMemCode() == null
              || feedCreate.getMemCode() < 1) {

          throw new ResponseStatusException(
                  HttpStatus.UNAUTHORIZED,
                  "로그인이 필요합니다.");
      }

      // 2. 챌린지 상태·기간 검사 및 행 잠금
      challengeWriteGuard.checkAndLock(feedCreate.getChalCode());

      // 3. 해당 챌린지에 참여 중인지 확인
      boolean joined =
              userChallengeDao.hasActiveParticipation(
                      Map.of(
                              "code", feedCreate.getChalCode(),
                              "memCode", feedCreate.getMemCode()));

      if (!joined) {
          throw new ResponseStatusException(
                  HttpStatus.CONFLICT,
                  "참여 중인 챌린지에만 인증할 수 있습니다.");
      }

      // 4. 피드 등록
      Long newFeedCode = userFeedDao.registerFeed(feedCreate);

      if (newFeedCode == null || newFeedCode <= 0) {
          throw new IllegalStateException(
                  "피드 등록에 실패했습니다.");
      }

      // 이미지 등록
      imageService.uploadImages(
              feedCreate.getImages(), "feed", newFeedCode);

      // 해시태그 등록
      registerHashtags(
              feedCreate.getHashtags(), newFeedCode);

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

  // 피드 삭제 요청 메소드
  @Override
  public void deleteFeed(Long feedCode, String updatedBy) {
    Map<String, Object> params = new HashMap<>();
    params.put("feedCode", feedCode);
    params.put("updatedBy", updatedBy);

    userFeedDao.deleteFeed(params);

    // 26.09.04
    // 마켓쪽 삭제 구현하다 깨달음.
    // 삭제 시에도 피드에 종속된 이미지, 해시태그를 지워야 하지 않나..?
  }

  // ========================================================

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
