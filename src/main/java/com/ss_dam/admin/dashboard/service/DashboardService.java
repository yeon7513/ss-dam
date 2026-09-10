package com.ss_dam.admin.dashboard.service;

import java.time.LocalDate;
import java.util.List;

import com.ss_dam.admin.dashboard.model.response.DashboardSummary;
import com.ss_dam.admin.dashboard.model.response.MemberStatistics;

public interface DashboardService {

    //조회 기간에 해당하는 대시보드 통계 반환
    DashboardSummary getDashboardSummary(LocalDate from, LocalDate to);

    //조회 기간의 월별 신규 가입 회원 수
    List<MemberStatistics> getMemberStatistics(LocalDate from, LocalDate to);
    
}