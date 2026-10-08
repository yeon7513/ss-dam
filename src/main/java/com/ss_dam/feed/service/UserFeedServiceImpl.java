package com.ss_dam.feed.service;

import com.ss_dam.auth.login.model.response.AuthProfile;
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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class UserFeedServiceImpl implements UserFeedService {

  private final UserFeedDao userFeedDao;
  private final UserCommentService userCommentService;
  private final ImageService imageService;
  private final ChallengeWriteGuard challengeWriteGuard;
  private final UserChallengeDao userChallengeDao;

  public UserFeedServiceImpl(UserFeedDao userFeedDao, UserCommentService userCommentService,
      ImageService imageService, ChallengeWriteGuard challengeWriteGuard,
      UserChallengeDao userChallengeDao) {
    this.userFeedDao = userFeedDao;
    this.userCommentService = userCommentService;
    this.imageService = imageService;
    this.challengeWriteGuard = challengeWriteGuard;
    this.userChallengeDao = userChallengeDao;
  }

  // 피드 목록 조회
  @Override
  public PageResult<UserFeedView> loadFeeds(UserFeedSearchFilter filter, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("memCode", memberCode);
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
  @Transactional
  @Override
  public FeedDetail findFeedDetailByFeedCode(Long feedCode, AuthProfile loginUser) {

    boolean isMember = loginUser != null && "MEMBER".equalsIgnoreCase(loginUser.getRole());
    Long memberCode = (isMember) ? loginUser.getCode() : null;

    Map<String, Object> params = new HashMap<>();
    params.put("memCode", memberCode);
    params.put("feedCode", feedCode);

    FeedDetail feedDetail = userFeedDao.findFeedDetailByFeedCode(params);

    // 존재하지 않으면 아래 코드는 실행되지 않도록
    // 바로 null을 반환함.
    if (feedDetail == null) {
      return null;
    }

    // 작성자가 아닌 다른 사람이 맞는지 판별
    // -> 내가 본 글의 조회수는 제외하기 위해
    // --> isOther == true : 타인이기 때문에 조회수 증가 O
    // --> isOther == false : 글을 올린 장본인이기 때문에 조회수 증가 X
    boolean isOther = !Objects.equals(feedDetail.getMemberProfile().getCode(), memberCode);
    // Objects.equals() ??
    // -> Objects.equals(a, b)는 주소 비교(==)를 먼저 실행해서 최적화한 뒤,
    // -> 주소가 다르면 Null 안전성(a != null)을 챙기면서
    // -> 내부 equals()를 통해 최종적으로 "값 비교"를 수행해 주는 가장 안전한 메서드라고 함.
    // -->  인텔리제이가 이렇게 바꾸라고 난리쳐서 찾아봄..
    // ---> 비로그인 사용자라면, memberCode가 null이니 예외가 발생할 수 있어서 그런가봄~

    // 조회 로그 추가
    // -> 단, 관리자 및 비회원, 글 작성자는 제외
    if (isMember && isOther) {
      userFeedDao.registerFeedHitcountLog(params);
    }

    return feedDetail;
  }


  // 피드 등록
  @Transactional(isolation = Isolation.READ_COMMITTED)
  @Override
  public Long registerFeed(FeedCreate feedCreate, AuthProfile loginUser) {

    feedCreate.setMemCode(loginUser.getCode());
    feedCreate.setCreatedBy(loginUser.getId());

    // 2. 챌린지 상태·기간 검사 및 행 잠금
    challengeWriteGuard.checkAndLock(feedCreate.getChalCode());

    // 3. 해당 챌린지에 참여 중인지 확인
    boolean joined = userChallengeDao.hasActiveParticipation(
        Map.of("code", feedCreate.getChalCode(), "memCode", feedCreate.getMemCode()));

    if (!joined) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "참여 중인 챌린지에만 인증할 수 있습니다.");
    }

    // 4. 피드 등록
    Long newFeedCode = userFeedDao.registerFeed(feedCreate);

    if (newFeedCode == null || newFeedCode <= 0) {
      throw new IllegalStateException("피드 등록에 실패했습니다.");
    }

    // 이미지 등록
    if (feedCreate.getImages() == null || feedCreate.getImages().isEmpty()) {
      imageService.uploadImages(feedCreate.getImages(), "feed", newFeedCode);
    }

    // 해시태그 등록
    if (feedCreate.getHashtags() == null || feedCreate.getHashtags().isEmpty()) {
      registerHashtags(feedCreate.getHashtags(), newFeedCode);
    }

    return newFeedCode;
  }


  // 수정할 피드 조회 -> 사용자가 작성한 피드만 조회
  @Override
  public FeedEditView findFeedDetailForEdit(Long feedCode, Long memberCode) {
    Map<String, Long> params = new HashMap<>();
    params.put("feedCode", feedCode);
    params.put("memCode", memberCode);

    return userFeedDao.findFeedDetailForEdit(params);
  }


  // 피드 수정 -> 피드 포함, 해시태그, 이미지
  @Transactional
  @Override
  public void updateFeed(FeedUpdate feedUpdate, AuthProfile loginUser) {
    feedUpdate.setUpdatedBy(loginUser.getId());

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
  public void deleteFeed(Long feedCode, AuthProfile loginUser) {
    String updatedBy = loginUser.getId();

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


  @Override
  public int getProofCount(int chalCode, int memCode) {

    return userFeedDao.countFeedsByChallenge(chalCode, memCode);
  }

}
