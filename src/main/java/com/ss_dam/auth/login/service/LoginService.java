package com.ss_dam.auth.login.service;

import com.ss_dam.auth.login.model.request.Login;
import com.ss_dam.auth.login.model.response.AuthProfile;

public interface LoginService {

  AuthProfile login(Login loginForm, String clientIp);

}
