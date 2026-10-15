package com.ss_dam.auth.admin.service;

import com.ss_dam.auth.admin.model.filter.AdminAccountSearchFilter;
import com.ss_dam.auth.admin.model.request.AdminAccountCreate;
import com.ss_dam.auth.admin.model.request.AdminAccountUpdate;
import com.ss_dam.auth.admin.model.response.AdminAccountDetail;
import com.ss_dam.auth.admin.model.response.AdminAccountView;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.common.pager.PageResult;

public interface AdminAccountService {
  PageResult<AdminAccountView> loadAdminAccounts(AdminAccountSearchFilter filter);

  AdminAccountDetail findAdminAccountByCode(Long code);

  Long registerAdminAccount(AdminAccountCreate adminAccountCreate, AuthProfile loginAdmin);

  void updateMyAccount(AdminAccountUpdate adminAccountUpdate, AuthProfile loginAdmin);
}
