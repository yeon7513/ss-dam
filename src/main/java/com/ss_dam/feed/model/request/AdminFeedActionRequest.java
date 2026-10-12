package com.ss_dam.feed.model.request;

public class AdminFeedActionRequest {
	private String reason;
	
	public AdminFeedActionRequest() {}
	
	public AdminFeedActionRequest(String reason) {
		this.reason = reason;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
	
	
}
