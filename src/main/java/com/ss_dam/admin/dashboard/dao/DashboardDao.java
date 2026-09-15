package com.ss_dam.admin.dashboard.dao;

import java.time.LocalDateTime;
import java.util.List;

import com.ss_dam.admin.dashboard.model.response.ChallengeRanking;
import com.ss_dam.admin.dashboard.model.response.ChallengeStatistics;
import com.ss_dam.admin.dashboard.model.response.MemberStatistics;
import com.ss_dam.admin.dashboard.model.response.RegionStatistics;
import com.ss_dam.admin.dashboard.model.response.SellerRanking;

public interface DashboardDao {

  //종료 시점 이전까지 가입한 누적 회원 수
  long countTotalMembers(LocalDateTime end);

    //조회 기간에 등록된 신규 피드 수
    long countNewFeeds(LocalDateTime start, LocalDateTime end);

    //조회 기간에 등록된 신규 거래 수
    long countNewTrades(LocalDateTime start, LocalDateTime end);
    
    //조회 기간의 월별 신규 가입 회원 수
    long countNewMembers(LocalDateTime start, LocalDateTime end);

  // 조회 기간에 가입한 회원 수를 월별 집계
  List<MemberStatistics> findMemberStatistics(
    LocalDateTime start, LocalDateTime end
  );

  //종료된 챌린지의 전체 참여 건수와 달성 건수
  ChallengeStatistics findChallengeStatistics(
    LocalDateTime start, LocalDateTime end
  );

  //조회 기간의 참여자 수 기준 챌린지 인기 순위
  List<ChallengeRanking> findChallengeRanking(
    LocalDateTime start, LocalDateTime end
  );

  //조회 기간의 지역별 챌린지 참여 건수와 비율 조회
  List<RegionStatistics> findRegionStatistics(
    LocalDateTime start, LocalDateTime end
  );

  //기간 내 판매자별 거래 건수와 거래 금액 조회
  List<SellerRanking> findSellerRanking(
    LocalDateTime start, LocalDateTime end
  );


    
} 
