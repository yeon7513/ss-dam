package com.ss_dam.auth.member.model.response;

import com.ss_dam.common.pager.PageResult;

// 거래내역 탭 전체 응답
public class AdminMemberTradesView {

    private Long totalTradeCount;
    private Long purchaseCount;
    private Long saleCount;

    private PageResult<AdminMemberTradeView> trades;

    // getter, setter

    public Long getTotalTradeCount() {
      return totalTradeCount;
    }

    public void setTotalTradeCount(Long totalTradeCount) {
      this.totalTradeCount = totalTradeCount;
    }

    public Long getPurchaseCount() {
      return purchaseCount;
    }

    public void setPurchaseCount(Long purchaseCount) {
      this.purchaseCount = purchaseCount;
    }

    public Long getSaleCount() {
      return saleCount;
    }

    public void setSaleCount(Long saleCount) {
      this.saleCount = saleCount;
    }

    public PageResult<AdminMemberTradeView> getTrades() {
      return trades;
    }

    public void setTrades(PageResult<AdminMemberTradeView> trades) {
      this.trades = trades;
    }

  
    
}

