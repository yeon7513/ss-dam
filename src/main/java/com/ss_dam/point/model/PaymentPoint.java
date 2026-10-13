package com.ss_dam.point.model;

public class PaymentPoint {
    private int point;
    private Long seller_code;
    private Long buyer_code;

    public int getPoint() {
        return point;
    }

    public void setPoint(int point) {
        this.point = point;
    }

    public Long getSeller_code() {
        return seller_code;
    }

    public void setSeller_code(Long seller_code) {
        this.seller_code = seller_code;
    }

    public Long getBuyer_code() {
        return buyer_code;
    }

    public void setBuyer_code(Long buyer_code) {
        this.buyer_code = buyer_code;
    }
}
