package com.ss_dam.auth.admin.service;

import com.ss_dam.auth.admin.dao.AdminAccountDao;
import com.ss_dam.auth.admin.model.filter.AdminAccountSearchFilter;
import com.ss_dam.auth.admin.model.response.AdminAccountDetail;
import com.ss_dam.auth.admin.model.response.AdminAccountView;
import com.ss_dam.common.pager.PageResult;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminAccountServiceImpl implements AdminAccountService {

  private final AdminAccountDao adminAccountDao;

  public AdminAccountServiceImpl(AdminAccountDao adminAccountDao) {
    this.adminAccountDao = adminAccountDao;
  }

  @Override
  public PageResult<AdminAccountView> loadAdminAccounts(AdminAccountSearchFilter filter) {
    Map<String, Object> params = new HashMap<>();

    // 페이지네이션
    params.put("offset", filter.getOffset());
    params.put("perPage", filter.getPerPage());

    // 검색용 필터
    params.put("keyword", filter.getKeyword());
    params.put("role", filter.getRole());
    params.put("dept", filter.getDept());
    params.put("deleted", filter.isDeleted());
    params.put("fromDate", filter.getFromDate());
    params.put("toDate", filter.getToDate());

    List<AdminAccountView> adminAccounts = adminAccountDao.loadAdminAccounts(params);
    float total = adminAccountDao.loadAdminAccountTotalCount(filter);

    return PageResult.of(adminAccounts, filter, total);
  }

  @Override
  public AdminAccountDetail findAdminAccountByCode(Long code) {
    return adminAccountDao.findAdminAccountByCode(code);
  }
}
