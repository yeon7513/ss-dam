package com.ss_dam.auth.member.mypage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.mypage.dao.UserMypageDao;
import com.ss_dam.auth.member.mypage.model.filter.MypageChallengeSearchFilter;
import com.ss_dam.auth.member.mypage.model.response.MyChallengeProgressView;
import com.ss_dam.auth.member.mypage.model.response.MyRankingView;
import com.ss_dam.auth.member.mypage.model.response.MypageChallengeView;
import com.ss_dam.auth.member.mypage.model.response.MypageProfileView;
import com.ss_dam.auth.member.rating.enums.MemberRating;
import com.ss_dam.auth.member.rating.service.MemberRatingService;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

@Service
@Transactional(readOnly = true)
public class UserMypageServiceImpl implements UserMypageService {

  @Override
  public PageResult<Map<String, Object>> getMyPurchases(PageQuery query, Long memberCode) {
    query.setPage(Math.max(1, query.getPage()));
    query.setPerPage(Math.max(1, Math.min(100, query.getPerPage())));
    query.setPerGroup(Math.max(1, Math.min(10, query.getPerGroup())));

    Map<String, Object> params = new HashMap<>();
    params.put("memberCode", memberCode);
    params.put("keyword", query.getKeyword() == null ? "" : query.getKeyword().trim());
    long total = mypageDao.countMyPurchases(params);
    long lastPage = Math.max(1L, (total + query.getPerPage() - 1) / query.getPerPage());
    query.setPage((int) Math.min(query.getPage(), lastPage));
    params.put("offset", query.getOffset());
    params.put("perPage", query.getPerPage());
    return PageResult.of(mypageDao.searchMyPurchases(params), query, (float) total);
  }

  @Override
  public Map<String, Object> getMyPurchasesSummary(Long memberCode) {
    return mypageDao.searchMyPurchasesSummary(Map.of("memberCode", memberCode));
  }

  private final UserMypageDao mypageDao;
  private final MemberRatingService memberRatingService;

  public UserMypageServiceImpl(
      UserMypageDao mypageDao,
      MemberRatingService memberRatingService
  ) {
    this.mypageDao = mypageDao;
    this.memberRatingService = memberRatingService;
  }

  @Override
  public MypageProfileView getProfile(Long memberCode) {

    // 회원 정보 조회
    Member member = mypageDao.searchProfile(memberCode);

    if (member == null) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "회원 정보를 찾을 수 없습니다."
      );
    }

    // 완료한 챌린지 수 조회
    long completedCount =
        mypageDao.countCompletedChallenges(memberCode);

    // 완료 수 기준으로 전체 회원 중 내 순위 조회
    Long challengeRanking =
        mypageDao.searchChallengeRanking(memberCode);

    // 누적 등급 점수 조회
    // 챌린지 보상 합계 + 판매 대금 합계의 10%
    long score = memberRatingService.getRatingScore(memberCode);

    // 누적 점수로 현재 등급과 다음 등급 계산
    MemberRating rating = MemberRating.fromScore(score);
    MemberRating nextRating = rating.getNextRating();

    // 조회 결과를 응답 DTO에 담기
    MypageProfileView profile = new MypageProfileView();

    profile.setName(member.getName());
    profile.setUserId(member.getId());
    profile.setProfileImage(member.getPath());
    profile.setJoinedAt(member.getCreatedAt());
    profile.setPoint(member.getPoint());
    profile.setTotalEarnedPoint(mypageDao.searchTotalEarnedPoint(memberCode));
    profile.setChallengeRanking(challengeRanking);
    profile.setCompletedChallengeCount(completedCount);

    // 조회 시 계산한 등급 정보
    profile.setRating(rating.getRating());
    profile.setRatingName(rating.getLabel());
    profile.setRatingScore(score);

    if (nextRating == null) {
      // 최고 등급: 나무
      profile.setNextRatingName(null);
      profile.setRemainingScore(0);
      profile.setRatingProgress(100);
      profile.setMaxRating(true);

    } else {
      // 현재 등급과 다음 등급의 최소 누적 점수
      long currentMinScore = rating.getMinScore();
      long nextMinScore = nextRating.getMinScore();

      // 현재 등급 구간에서 쌓은 점수
      long earnedScore = score - currentMinScore;

      // 현재 등급에서 다음 등급까지 필요한 점수
      long requiredScore = nextMinScore - currentMinScore;

      // 현재 등급 구간 진행률
      int progress = (int) Math.floor(
          earnedScore * 100.0 / requiredScore
      );

      profile.setNextRatingName(nextRating.getLabel());
      profile.setRemainingScore(nextMinScore - score);
      profile.setRatingProgress(
          Math.max(0, Math.min(100, progress))
      );
      profile.setMaxRating(false);
    }

    return profile;
  }

    // 허용하는 참여 상태 탭 값
  private static final Set<String> ENTRY_STATUSES =
      Set.of("JOINED", "COMPLETED", "CANCELED");

  // 참여한 챌린지 목록
  @Override
  public PageResult<MypageChallengeView> getMyChallenges(
      MypageChallengeSearchFilter filter,
      Long memberCode
  ) {
    // 클라이언트가 보낸 memCode는 무시하고 세션 값으로 덮어씀
    filter.setMemCode(memberCode);

    // 정해진 상태값이 아니면 전체 조회로 처리
    if (filter.getStatus() == null || !ENTRY_STATUSES.contains(filter.getStatus())) {
      filter.setStatus(null);
    }

    List<MypageChallengeView> challenges = mypageDao.searchMyChallenges(filter);
    float total = mypageDao.countMyChallenges(filter);

    return PageResult.of(challenges, filter, total);
  }

  // 참여한 챌린지 요약
  @Override
  public Map<String, Object> getMyChallengeSummary(Long memberCode) {
    return mypageDao.searchMyChallengeSummary(memberCode);
  }
  @Override
  public PageResult<Map<String, Object>> getMySales(PageQuery query, Long memberCode) {
    query.setPage(Math.max(1, query.getPage()));
    query.setPerPage(Math.max(1, Math.min(100, query.getPerPage())));
    Map<String, Object> params = new HashMap<>();
    params.put("memberCode", memberCode);
    params.put("keyword", query.getKeyword());
    params.put("offset", query.getOffset());
    params.put("perPage", query.getPerPage());
    return PageResult.of(mypageDao.searchMySales(params), query, mypageDao.countMySales(params));
  }

  @Override
  public Map<String, Object> getMySalesSummary(Long memberCode) {
    return mypageDao.searchMySalesSummary(memberCode);
  }

  @Override
  public Map<String, Object> getLikedFeedSummary(Long memberCode) {
    return mypageDao.searchLikedFeedSummary(memberCode);
  }

  // 챌린지 - 내 랭킹 조회
  @Override
  public List<MyChallengeProgressView> getRecentChallengeProgress(
      Long memberCode
  ) {
    return mypageDao.searchRecentChallengeProgress(memberCode);
  }

  @Override
  public MyRankingView getMyScoreRanking(Long memberCode) {
    MyRankingView ranking =
        mypageDao.searchMyScoreRanking(memberCode);

    if (ranking == null) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "회원 랭킹 정보를 찾을 수 없습니다."
      );
    }

    setRankingRatingName(ranking);

    return ranking;
  }

  @Override
  public PageResult<MyRankingView> getScoreRankings(
      PageQuery query,
      Long memberCode
  ) {
    // 페이지 요청값 제한
    query.setPage(Math.max(1, query.getPage()));
    query.setPerPage(Math.max(1, Math.min(100, query.getPerPage())));
    query.setPerGroup(Math.max(1, Math.min(10, query.getPerGroup())));

    long total = mypageDao.countRankingMembers();

    // 마지막 페이지를 초과하면 마지막 페이지로 보정
    long lastPage = Math.max(
        1L,
        (total + query.getPerPage() - 1) / query.getPerPage()
    );

    query.setPage((int) Math.min(query.getPage(), lastPage));

    Map<String, Object> params = new HashMap<>();
    params.put("memberCode", memberCode);
    params.put("offset", query.getOffset());
    params.put("perPage", query.getPerPage());

    List<MyRankingView> rankings =
        mypageDao.searchScoreRankings(params);

    rankings.forEach(this::setRankingRatingName);

    // 기존 공통 PageResult의 total 매개변수 타입에 맞춤
    return PageResult.of(rankings, query, (float) total);
  }

  private void setRankingRatingName(MyRankingView ranking) {
    MemberRating rating =
        MemberRating.fromScore(ranking.getRatingScore());

    ranking.setRatingName(rating.getLabel());
  }

  // 마이페이지 - 댓글
  @Override
  public PageResult<Map<String, Object>> getMyComments(
      PageQuery query,
      Long memberCode
  ) {
    query.setPage(Math.max(1, query.getPage()));
    query.setPerPage(Math.max(1, Math.min(100, query.getPerPage())));
    query.setPerGroup(Math.max(1, Math.min(10, query.getPerGroup())));

    Map<String, Object> params = new HashMap<>();

    // 회원 번호는 로그인 세션에서 전달받은 값만 사용
    params.put("memberCode", memberCode);
    params.put(
        "keyword",
        query.getKeyword() == null ? "" : query.getKeyword().trim()
    );

    long total = mypageDao.countMyComments(params);

    // 존재하지 않는 페이지 요청 시 마지막 페이지로 보정
    long lastPage = Math.max(
        1L,
        (total + query.getPerPage() - 1) / query.getPerPage()
    );
    query.setPage((int) Math.min(query.getPage(), lastPage));

    params.put("offset", query.getOffset());
    params.put("perPage", query.getPerPage());

    List<Map<String, Object>> comments =
        mypageDao.searchMyComments(params);

    return PageResult.of(comments, query, (float) total);
  }

}
