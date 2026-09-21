package com.ss_dam.market.model.response;

import java.time.LocalDateTime;

public class AdminMemberTradeView {

    private Long code;                // 거래 이력 번호
    private Long productCode;         // 상품 번호
    private Integer tradePrice;       // 실제 거래 금액
    private LocalDateTime tradedAt;   // 거래일
    private String tradeType;         // 구매 / 판매 구분


    // getter, setter

    public Long getCode() {
      return code;
    }

    public void setCode(Long code) {
      this.code = code;
    }

    public Integer getTradePrice() {
      return tradePrice;
    }

    public void setTradePrice(Integer tradePrice) {
      this.tradePrice = tradePrice;
    }

    public LocalDateTime getTradedAt() {
      return tradedAt;
    }

    public void setTradedAt(LocalDateTime tradedAt) {
      this.tradedAt = tradedAt;
    }

    public String getTradeType() {
      return tradeType;
    }

    public void setTradeType(String tradeType) {
      this.tradeType = tradeType;
    }

    public Long getProductCode() {
      return productCode;
    }

    public void setProductCode(Long productCode) {
      this.productCode = productCode;
    }
}
