package com.ss_dam.auth.member.model.request;

import org.springframework.web.multipart.MultipartFile;

public class MemberUpdateRequest {

  private String password;
  private String phone;
  private String address;
  private MultipartFile file;

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public MultipartFile getFile() {
    return file;
  }

  public void setFile(MultipartFile file) {
    this.file = file;
  }
}