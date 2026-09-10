package com.ss_dam.common.likes;

public class MarketProductPick {

  private Long prodCode;  
  private Long memCode;
  private String createdAt;
  private boolean deleteYn;
  
  public Long getProdCode() {
	return prodCode;
  }
  public void setProdCode(Long prodCode) {
	this.prodCode = prodCode;
  }
  public Long getMemCode() {
	return memCode;
  }
  public void setMemCode(Long memCode) {
	this.memCode = memCode;
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
  
  

}