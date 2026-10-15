package com.ss_dam.admin.stats.model.response;

public class PopularChallenge {

    private int challengeCode;
    private String title;
    private long participantCount;
    private double averageProgressRate;
    private long proofCount;

    public int getChallengeCode() {
        return challengeCode;
    }

    public void setChallengeCode(int challengeCode) {
        this.challengeCode = challengeCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(long participantCount) {
        this.participantCount = participantCount;
    }

    public double getAverageProgressRate() {
        return averageProgressRate;
    }

    public void setAverageProgressRate(double averageProgressRate) {
        this.averageProgressRate = averageProgressRate;
    }

    public long getProofCount() {
        return proofCount;
    }

    public void setProofCount(long proofCount) {
        this.proofCount = proofCount;
    }
}