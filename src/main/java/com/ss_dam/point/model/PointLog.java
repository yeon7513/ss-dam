package com.ss_dam.point.model;

public class PointLog {
    private Long code;
    private Long mem_code;
    private String type;
    private int amount;
    private String reason;
    private String created_at;

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public Long getMem_code() {
        return mem_code;
    }

    public void setMem_code(Long mem_code) {
        this.mem_code = mem_code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }
}
