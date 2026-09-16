package com.ss_dam.auth.member.model.response;

import java.time.LocalDateTime;

//AdminMemberDetailView에는 사진·회원 정보·상단 숫자만 
//피드나 거래 목록을 이 DTO 안에 전부 넣지 않습니다.

//목록 API들은 만든 방식을 재사용
// 상세 정보 한 건 -> ApiResponse<AdminMemberDetailView>
// 각 탭의 목록 -> ApiResponse<PageResult<각탭의응답DTO>>


public class AdminMemberDetailView {


    private Long code;                 // 회원 번호
    private String id;                 // 아이디
    private String name;               // 이름
    private String phone;              // 연락처
    private String address;            // 주소
    private Integer rating;            // 등급
    private Integer point;             // 보유 포인트
    private String status;             // DB 회원 상태
    private LocalDateTime createdAt;   // 가입일
    private LocalDateTime updatedAt;   // 수정일
    private LocalDateTime loggedAt;    // 마지막 로그인
    private Boolean deleteYn;          // 삭제 여부


    // IMAGES 테이블에서 조회한 프로필 사진 경로
    private String path;

    //완료한 챌린지 수
    private Long completedChallengeCount;

    /*상단 통계 부분 (신고 누적 수, 피드 활동, 거래 활동, 로그인 횟수)*/

    //상단 통계 - 신고 누적 수
    private Long receivedReportCount;


    //상단 통계 - 피드 활동 (회원이 작성한 피드 수)
    private Long feedCount;

    //상단 통계 - 거래 활동 (회원이 작성한 거래 수) 
    private Long tradeCount;

    //상단 통계 - 로그인 횟수 
    public Long loginCount;
    


    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getLoggedAt() {
        return loggedAt;
    }

    public void setLoggedAt(LocalDateTime loggedAt) {
        this.loggedAt = loggedAt;
    }

    public Boolean getDeleteYn() {
        return deleteYn;
    }

    public void setDeleteYn(Boolean deleteYn) {
        this.deleteYn = deleteYn;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Long getFeedCount() {
        return feedCount;
    }

    public void setFeedCount(Long feedCount) {
        this.feedCount = feedCount;
    }

    public Long getReceivedReportCount() {
        return receivedReportCount;
    }

    public void setReceivedReportCount(Long receivedReportCount) {
        this.receivedReportCount = receivedReportCount;
    }

    public Long getTradeCount() {
        return tradeCount;
    }

    public void setTradeCount(Long tradeCount) {
        this.tradeCount = tradeCount;
    }

    public Long getLoginCount() {
    return loginCount;
    }

    public void setLoginCount(Long loginCount) {
        this.loginCount = loginCount;
    }

    public Long getCompletedChallengeCount() {
        return completedChallengeCount;
    }

    public void setCompletedChallengeCount(Long completedChallengeCount) {
        this.completedChallengeCount = completedChallengeCount;
    }
            
}