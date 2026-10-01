package com.ss_dam.challenge.model.response;

// 시간별 참여자 집계 조회 결과
public class AdminChallengeHourlyCount {

    // TODAY 또는 YESTERDAY
    private String dayType;

    // 0~23
    private int hour;

    private long participantCount;

    public String getDayType() {
        return dayType;
    }

    public void setDayType(String dayType) {
        this.dayType = dayType;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public long getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(long participantCount) {
        this.participantCount = participantCount;
    }
}