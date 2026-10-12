package com.ss_dam.auth.admin.dao;

import com.ss_dam.auth.admin.model.filter.AdminAccountSearchFilter;
import com.ss_dam.auth.admin.model.response.AdminAccountDetail;
import com.ss_dam.auth.admin.model.response.AdminAccountView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AdminAccountDaoImpl implements AdminAccountDao {

  private final SqlSession sql;

  public AdminAccountDaoImpl(SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public List<AdminAccountView> loadAdminAccounts(Map<String, Object> params) {
    return sql.selectList("adminAccount.loadAdminAccounts", params);
  }

  @Override
  public float loadAdminAccountTotalCount(AdminAccountSearchFilter filter) {
    return sql.selectOne("adminAccount.loadAdminAccountTotalCount", filter);
  }

  @Override
  public AdminAccountDetail findAdminAccountByCode(Long code) {
    return sql.selectOne("adminAccount.findAdminAccountByCode", code);
  }
}
