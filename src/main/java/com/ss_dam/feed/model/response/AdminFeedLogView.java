package com.ss_dam.feed.model.response;

public class AdminFeedLogView {
	private Long logCode;
	private Long feedCode;
	private Long adminCode;
	private String adminId;
	private String actionType;
	private String reason;
	private String createdAt;
	public Long getLogCode() {
		return logCode;
	}
	public void setLogCode(Long logCode) {
		this.logCode = logCode;
	}
	public Long getFeedCode() {
		return feedCode;
	}
	public void setFeedCode(Long feedCode) {
		this.feedCode = feedCode;
	}
	public Long getAdminCode() {
		return adminCode;
	}
	public void setAdminCode(Long adminCode) {
		this.adminCode = adminCode;
	}
	public String getAdminId() {
		return adminId;
	}
	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}
	public String getActionType() {
		return actionType;
	}
	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	
	
}
