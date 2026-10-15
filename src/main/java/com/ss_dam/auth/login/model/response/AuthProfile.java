package com.ss_dam.auth.login.model.response;

import com.ss_dam.auth.login.enums.AuthRole;

public interface AuthProfile {
  Long getCode();

  String getId();

  AuthRole getRole();

  String getName();
}
