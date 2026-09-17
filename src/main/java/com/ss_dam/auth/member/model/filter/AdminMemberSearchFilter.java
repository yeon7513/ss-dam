package com.ss_dam.auth.member.model.filter;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.ss_dam.auth.member.enums.MemberStatus;
import com.ss_dam.common.pager.PageQuery;

public class AdminMemberSearchFilter extends PageQuery{

// 회원 상태: NORMAL, SUSPENDED, WITHDRAWN
    // null이면 상태 조건 없이 전체 조회
    private MemberStatus status;

    // 가입일 검색 시작일
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate joinedFrom;

    // 가입일 검색 종료일
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate joinedTo;

    // 활동 상태
    private String activityStatus;
    //대응하는 DB 컬럼이 없으므로 검색 기준을 정한 뒤 연결

    // 지역
    private String regionCode;
    //대응하는 DB 컬럼이 없으므로 검색 기준을 정한 뒤 연결

    // 등급
    private Integer rating;

    // 랭킹
    private Integer ranking;

    public MemberStatus getStatus() {
        return status;
    }

    public void setStatus(MemberStatus status) {
        this.status = status;
    }

    public LocalDate getJoinedFrom() {
        return joinedFrom;
    }

    public void setJoinedFrom(LocalDate joinedFrom) {
        this.joinedFrom = joinedFrom;
    }

    public LocalDate getJoinedTo() {
        return joinedTo;
    }

    public void setJoinedTo(LocalDate joinedTo) {
        this.joinedTo = joinedTo;
    }

    public String getActivityStatus() {
        return activityStatus;
    }

    public void setActivityStatus(String activityStatus) {
        this.activityStatus = activityStatus;
    }

    public String getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(String regionCode) {
        this.regionCode = regionCode;
    }

    public Integer getRating() {
    return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getRanking() {
        return ranking;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    
}

