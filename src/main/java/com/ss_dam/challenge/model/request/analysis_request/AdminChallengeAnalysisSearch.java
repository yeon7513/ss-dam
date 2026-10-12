package com.ss_dam.challenge.model.request.analysis_request;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.ss_dam.common.pager.PageQuery;

// 종료 챌린지 데이터 분석- 목록 검색 조건

public class AdminChallengeAnalysisSearch extends PageQuery {

    // 조회 기간과 챌린지 진행 기간이 겹치는 항목 조회
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fromDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate toDate;

    // null: 전체 카테고리
    private Long categoryCode;

    // null: 전체, true: 지급 완료, false: 지급 미완료
    private Boolean rewardPaid;

    // LATEST
    // PARTICIPANTS_DESC, PARTICIPANTS_ASC
    // ACHIEVEMENT_DESC, ACHIEVEMENT_ASC
    private String sort = "LATEST";

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public Long getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(Long categoryCode) {
        this.categoryCode = categoryCode;
    }

    public Boolean getRewardPaid() {
        return rewardPaid;
    }

    public void setRewardPaid(Boolean rewardPaid) {
        this.rewardPaid = rewardPaid;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }
}