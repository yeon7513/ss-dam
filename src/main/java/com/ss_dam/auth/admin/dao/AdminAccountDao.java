package com.ss_dam.auth.admin.dao;

import com.ss_dam.auth.admin.model.filter.AdminAccountSearchFilter;
import com.ss_dam.auth.admin.model.request.AdminAccountCreate;
import com.ss_dam.auth.admin.model.request.AdminAccountUpdate;
import com.ss_dam.auth.admin.model.response.AdminAccountDetail;
import com.ss_dam.auth.admin.model.response.AdminAccountView;

import java.util.List;
import java.util.Map;

public interface AdminAccountDao {
  List<AdminAccountView> loadAdminAccounts(Map<String, Object> params);

  float loadAdminAccountTotalCount(AdminAccountSearchFilter filter);

  AdminAccountDetail findAdminAccountByCode(Long code);

  void registerAdminAccount(AdminAccountCreate adminAccountCreate);

  void updateMyAccount(AdminAccountUpdate adminAccountUpdate);
}
