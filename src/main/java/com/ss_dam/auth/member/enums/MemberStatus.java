package com.ss_dam.auth.member.enums;

import com.fasterxml.jackson.annotation.JsonValue;

// 회원에서 사용하는 status 값들의 집합
public enum MemberStatus {
    NORMAL("일반"),      // STATUS = 'ACTIVE', DELETE_YN = 0
    SUSPENDED("정지"),   // STATUS = 'SUSPENDED', DELETE_YN = 0
    SLEEP("휴면"),       // STATUS = 'SLEEP', DELETE_YN = 0
    WITHDRAWN("탈퇴");   // DELETE_YN = 1

    private final String label;

    MemberStatus(String label) {
        this.label = label;
    }

		@JsonValue 
    public String getLabel() {
        return label;
    }
}

