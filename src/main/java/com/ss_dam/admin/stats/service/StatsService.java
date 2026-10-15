package com.ss_dam.admin.stats.service;

import java.time.LocalDate;
import java.util.List;

import com.ss_dam.admin.stats.model.response.ChallengeRanking;
import com.ss_dam.admin.stats.model.response.ChallengeStatistics;
import com.ss_dam.admin.stats.model.response.DashboardSummary;
import com.ss_dam.admin.stats.model.response.MemberStatistics;
import com.ss_dam.admin.stats.model.response.PopularChallenge;
import com.ss_dam.admin.stats.model.response.RegionStatistics;
import com.ss_dam.admin.stats.model.response.SellerRanking;

public interface StatsService {

    //조회 기간에 해당하는 대시보드 통계 반환
    DashboardSummary getDashboardSummary(LocalDate from, LocalDate to);

    //조회 기간의 월별 신규 가입 회원 수
    List<MemberStatistics> getMemberStatistics(LocalDate from, LocalDate to);
    
    // 진행 중인 챌린지 인기 TOP 5 조회
    List<PopularChallenge> getPopularChallenges();

    //종료된 챌린지의 참여 건수와 달성률 조회
    ChallengeStatistics getChallengeStatistics(
        LocalDate from, LocalDate to
    );

    //조회 기간의 참여자 수 기준 챌린지 인기 순위
    List<ChallengeRanking> getChallengeRanking(
        LocalDate from, LocalDate to
    );

    // 전체 챌린지의 지역별 참여 인원과 비율 조회
    List<RegionStatistics> getRegionStatistics();

    //조회 기간의 거래 완료 금액 기준 우수 판매자 순위 조회
    List<SellerRanking> getSellerRanking(
        LocalDate from, LocalDate to
    );

}