package com.ss_dam.auth.member.model.response;

import java.time.LocalDateTime;

/*관리자에게 많은 정보를 보여주더라도 Member(Member.java)를 그대로 반환하기보다는, 필요한 정보를 담은 AdminMemberView를 사용하는 게 좋습니다.
- 목록: 회원번호, 아이디, 이름, 등급, 랭킹, 상태, 가입일, 탈퇴 여부
- 상세: 연락처, 주소, 포인트, 마지막 로그인 등 추가 정보
- 응답 제외: password, 업로드 처리용 MultipartFile file

*/

//관리자라도 비밀번호나 비밀번호 해시는 조회 응답에 포함X
//비밀번호 관련 지원은 초기화·재설정 기능으로 처리

//phone, point 제외 -> 상세조회에서 확인
//수정일, 마지막 로그인 도 제외 -> 상세조회

public class AdminMemberView {

    private Long code;                // 회원 번호
    private String id;                // 아이디
    private String name;              // 이름
    private String address;           // 주소
    private String status;            // DB 회원 상태
    private Integer rating;           // 등급
    private Integer ranking;          // 랭킹
    private LocalDateTime createdAt;   // 가입일
    private Boolean deleteYn;         // 삭제 여부

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getDeleteYn() {
        return deleteYn;
    }

    public void setDeleteYn(Boolean deleteYn) {
        this.deleteYn = deleteYn;
    }
}