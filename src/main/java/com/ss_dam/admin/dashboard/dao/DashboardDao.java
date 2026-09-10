package com.ss_dam.admin.dashboard.dao;

import java.time.LocalDateTime;
import java.util.List;

import com.ss_dam.admin.dashboard.model.response.MemberStatistics;

public interface DashboardDao {

  //종료 시점 이전까지 가입한 누적 회원 수
  long countTotalMembers(LocalDateTime end);

  //조회 기간의 월별 신규 가입 회원 수
  long countNewMembers(LocalDateTime start, LocalDateTime end);

  List<MemberStatistics> findMemberStatistics(
    LocalDateTime start, LocalDateTime end
  );

  //조회 기간에 등록된 신규 피드 수
  long countNewFeeds(LocalDateTime start, LocalDateTime end);

  //조회 기간에 등록된 신규 거래 수
  long countNewTrades(LocalDateTime start, LocalDateTime end);
  

    
} 
