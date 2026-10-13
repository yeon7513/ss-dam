package com.ss_dam.auth.member.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

// @JsonFormat(shape = JsonFormat.Shape.OBJECT)
// -> enum을 객체형태로 변환
// ex)
// { status :
//    { code: "", label: "" }
// } <-- 형태로


// 회원에서 사용하는 status 값들의 집합
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum MemberStatus {
  ACTIVE("ACTIVE", "활성"),      // STATUS = 'ACTIVE', DELETE_YN = 0
  SUSPENDED("SUSPENDED", "정지"),   // STATUS = 'SUSPENDED', DELETE_YN = 0
  SLEEP("SLEEP", "휴면"),       // STATUS = 'SLEEP', DELETE_YN = 0
  WITHDRAW("WITHDRAW", "탈퇴");   // DELETE_YN = 1

  private final String code;
  private final String label;


  MemberStatus(String code, String label) {
    this.code = code;
    this.label = label;
  }

  public String getCode() {
    return code;
  }

  public String getLabel() {
    return label;
  }

}

