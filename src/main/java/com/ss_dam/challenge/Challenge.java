package com.ss_dam.challenge;

public class Challenge {
	private int code; // 챌린지 번호
	private int admCode; // 관리자 아이디
	private String title; // 제목
	private String content; // 내용
	private String startDate; // 시작일
	private String endDate; // 마감일
	private String postStatus;
	private String progressStatus;
	private String createdBy;
	private String createdAt; // 등록일
	private String updatedBy; // 수정일
	private String updatedAt; // 수정일
	private boolean deleteYn; // 삭제 여부
	private int participantCount; // 참여자 수

	public int getAdmCode() {
		return admCode;
	}

	public void setAdmCode(int admCode) {
		this.admCode = admCode;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public String getPostStatus() {
		return postStatus;
	}

	public void setPostStatus(String postStatus) {
		this.postStatus = postStatus;
	}

	public String getProgressStatus() {
		return progressStatus;
	}

	public void setProgressStatus(String progressStatus) {
		this.progressStatus = progressStatus;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public boolean isDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(boolean deleteYn) {
		this.deleteYn = deleteYn;
	}

	public int getParticipantCount() {
		return participantCount;
	}

	public void setParticipantCount(int participantCount) {
		this.participantCount = participantCount;
	}

}