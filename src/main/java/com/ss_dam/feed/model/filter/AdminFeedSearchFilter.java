package com.ss_dam.feed.model.filter;

import com.ss_dam.common.pager.PageQuery;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class AdminFeedSearchFilter extends PageQuery{
	private String status;
	private String startDate;
	private String endDate;
	private String category;
	private String likeCount;
	private String keyword;
	private String region;
	
	public List<String> getRegionList(){
		if(region == null || region.trim().isEmpty()) {
			return Collections.emptyList();
		}
		
		return Arrays.stream(region.split(","))
				.map(String::trim)
				.filter(s -> !s.isEmpty())
				.toList();
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getLikeCount() {
		return likeCount;
	}

	public void setLikeCount(String likeCount) {
		this.likeCount = likeCount;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}
	
	
}
