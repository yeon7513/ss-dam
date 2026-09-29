package com.ss_dam.auth.login.model.response;

public interface AuthProfile {
  Long getCode();

  String getId();

  String getRole();

  String getName();
}
