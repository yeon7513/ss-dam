package com.ss_dam.market.model.filter;

import com.ss_dam.common.pager.PageQuery;

public class AdminProductSearchFilter extends PageQuery {

	private String sortTarget;
	private Long prodCode;
	private String tagName;
	private String search;
	private String status;
	private String deleteYn;

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

	
}
