package com.ss_dam.market.model.filter;

import com.ss_dam.common.pager.PageQuery;

public class AdminProductSearchFilter extends PageQuery {

	private String sortTarget;
	private Long prodCode;
	private String tagName;
	private String search;
	private String searchCode;
	private String keyword;
	private String status;
	private String deleteYn;
	private String dealStatus;

	// 공통 SearchFilterBar 필터
	private String fromDate; // 등록일 시작 (yyyy-MM-dd)
	private String toDate;   // 등록일 종료 (yyyy-MM-dd)
	private Long cateCode;   // 마켓 카테고리 (대분류 or 소분류 코드)
	private String region;   // 작성자 지역 (시·도 약칭: 서울, 경기, 충북 ...)

	public String getSortTarget() {
		return sortTarget;
	}

	public void setSortTarget(String sortTarget) {
		this.sortTarget = sortTarget;
	}

	public Long getProdCode() {
		return prodCode;
	}

	public void setProdCode(Long prodCode) {
		this.prodCode = prodCode;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getSearchCode() {
		return searchCode;
	}

	public void setSearchCode(String searchCode) {
		this.searchCode = searchCode;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDeleteYn() {
		return deleteYn;
	}

	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}

	public String getDealStatus() {
		return dealStatus;
	}

	public void setDealStatus(String dealStatus) {
		this.dealStatus = dealStatus;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public Long getCateCode() {
		return cateCode;
	}

	public void setCateCode(Long cateCode) {
		this.cateCode = cateCode;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

}