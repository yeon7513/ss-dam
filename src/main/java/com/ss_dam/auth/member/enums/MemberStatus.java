package com.ss_dam.auth.member.enums;

public enum MemberStatus {

 // ALL → 상태·삭제 조건 없음

  NORMAL("일반"),
  //NORMAL    → STATUS = 'ACTIVE'    + DELETE_YN = 0

  SUSPENDED("정지"),
  //SUSPENDED → STATUS = 'SUSPENDED' + DELETE_YN = 0

  WITHDRAWN("탈퇴");
  //WITHDRAWN → DELETE_YN = 1

     private final String description;

    MemberStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
  

