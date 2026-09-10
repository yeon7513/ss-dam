package com.ss_dam.admin.dashboard.service;

import java.time.LocalDate;

import com.ss_dam.admin.dashboard.model.response.DashboardSummary;

public interface DashboardService {

    //조회 기간에 해당하는 대시보드 통계 반환
    DashboardSummary getDashboardSummary(LocalDate from, LocalDate to);
    
}