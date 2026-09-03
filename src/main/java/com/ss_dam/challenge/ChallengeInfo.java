package com.ss_dam.challenge;

public class ChallengeInfo {
	private int code;
	private String startDate;
	private String endDate;
	private int daysLeft;
	private int participantCount;
	private String goal;
	private int proofCount;
	private int totalProofCount;
	private int pointEarn;
	private boolean isJoined;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public int getDaysLeft() {
		return daysLeft;
	}

	public void setDaysLeft(int daysLeft) {
		this.daysLeft = daysLeft;
	}

	public int getParticipantCount() {
		return participantCount;
	}

	public void setParticipantCount(int participantCount) {
		this.participantCount = participantCount;
	}

	public String getGoal() {
		return goal;
	}

	public void setGoal(String goal) {
		this.goal = goal;
	}

	public int getProofCount() {
		return proofCount;
	}

	public void setProofCount(int proofCount) {
		this.proofCount = proofCount;
	}

	public int getTotalProofCount() {
		return totalProofCount;
	}

	public void setTotalProofCount(int totalProofCount) {
		this.totalProofCount = totalProofCount;
	}

	public int getPointEarn() {
		return pointEarn;
	}

	public void setPointEarn(int pointEarn) {
		this.pointEarn = pointEarn;
	}

	public boolean isJoined() {
		return isJoined;
	}

	public void setJoined(boolean isJoined) {
		this.isJoined = isJoined;
	}

}
