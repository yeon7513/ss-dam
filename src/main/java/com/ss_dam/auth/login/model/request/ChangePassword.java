package com.ss_dam.auth.login.model.request;

//비밀번호 변경용 DTO
public class ChangePassword {
    private Long code;
    private String password;

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
