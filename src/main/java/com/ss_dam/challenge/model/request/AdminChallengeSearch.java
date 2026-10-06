package com.ss_dam.challenge.model.request;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.ss_dam.common.pager.PageQuery;


// 기간은 조회 시작일 0시부터 조회 종료일 다음 날 0시 직전까지
// 예를 들어 fromDate=2026-10-01&toDate=2026-10-31이면, 10월 중 하루라도 진행되는 챌린지를 조회


public class AdminChallengeSearch extends PageQuery {

    // 기본값 false: 삭제되지 않은 챌린지
    // true: 삭제된 챌린지
    private boolean deleted = false;

    // null: 전체
    // WAITING, IN_PROGRESS, ENDED
    private String progressStatus;

    // null: 전체
    // ACTIVE: 공개, PRIVATE: 비공개
    private String postStatus;

    // 조회 기간과 챌린지 진행 기간이 겹치는 항목 조회
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fromDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate toDate;

    // LATEST
    // PARTICIPANTS_DESC, PARTICIPANTS_ASC
    // ACHIEVEMENT_DESC, ACHIEVEMENT_ASC
    private String sort = "LATEST";

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getProgressStatus() {
        return progressStatus;
    }

    public void setProgressStatus(String progressStatus) {
        this.progressStatus = progressStatus;
    }

    public String getPostStatus() {
        return postStatus;
    }

    public void setPostStatus(String postStatus) {
        this.postStatus = postStatus;
    }

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

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }
}