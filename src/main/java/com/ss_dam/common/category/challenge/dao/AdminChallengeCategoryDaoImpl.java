package com.ss_dam.common.category.challenge.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.common.category.challenge.model.response.AdminChallengeCategoryView;

@Repository
public class AdminChallengeCategoryDaoImpl implements AdminChallengeCategoryDao {

  private final SqlSession sql;

  public AdminChallengeCategoryDaoImpl (SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public List<AdminChallengeCategoryView> loadAllChallengeCategories() {
    return sql.selectList("categoryChallengeView.loadAllChallengeCategories");
  }
}
