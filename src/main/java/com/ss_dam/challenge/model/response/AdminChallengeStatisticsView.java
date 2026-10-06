package com.ss_dam.challenge.model.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

// 관리자 챌린지 상세 통계 응답
//이 DTO는 서비스에서 생성자로 값을 넣고 응답으로만 사용하므로 setter가 필요 없습니다.
public class AdminChallengeStatisticsView {

    private final LocalDateTime asOf;
    private final Metric newProofs;
    private final Metric newParticipants;
    private final List<HourPoint> participationByHour;

    public AdminChallengeStatisticsView(
            LocalDateTime asOf,
            Metric newProofs,
            Metric newParticipants,
            List<HourPoint> participationByHour) {

        this.asOf = asOf;
        this.newProofs = newProofs;
        this.newParticipants = newParticipants;
        this.participationByHour = participationByHour;
    }

    public LocalDateTime getAsOf() {
        return asOf;
    }

    public Metric getNewProofs() {
        return newProofs;
    }

    public Metric getNewParticipants() {
        return newParticipants;
    }

    public List<HourPoint> getParticipationByHour() {
        return participationByHour;
    }

    // 통계 카드 한 개의 데이터
    public static class Metric {

        private final long todayCount;
        private final long yesterdaySameTimeCount;
        private final BigDecimal changeRate;

        public Metric(
                long todayCount,
                long yesterdaySameTimeCount,
                BigDecimal changeRate) {

            this.todayCount = todayCount;
            this.yesterdaySameTimeCount = yesterdaySameTimeCount;
            this.changeRate = changeRate;
        }

        public long getTodayCount() {
            return todayCount;
        }

        public long getYesterdaySameTimeCount() {
            return yesterdaySameTimeCount;
        }

        public BigDecimal getChangeRate() {
            return changeRate;
        }
    }

    // 시간별 신규 참여자 그래프 데이터
    public static class HourPoint {

        private final int hour;

        // 오늘 아직 도달하지 않은 시간은 null
        private final Long todayCount;

        private final long yesterdayCount;

        public HourPoint(
                int hour,
                Long todayCount,
                long yesterdayCount) {

            this.hour = hour;
            this.todayCount = todayCount;
            this.yesterdayCount = yesterdayCount;
        }

        public int getHour() {
            return hour;
        }

        public Long getTodayCount() {
            return todayCount;
        }

        public long getYesterdayCount() {
            return yesterdayCount;
        }
    }
}