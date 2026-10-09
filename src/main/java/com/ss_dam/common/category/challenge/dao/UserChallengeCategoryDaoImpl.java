package com.ss_dam.common.category.challenge.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.common.category.challenge.model.response.UserChallengeCategoryView;

@Repository
public class UserChallengeCategoryDaoImpl implements UserChallengeCategoryDao {

  private final SqlSession sql;

  public UserChallengeCategoryDaoImpl (SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public List<UserChallengeCategoryView> loadActiveChallengeCategories() {
    return sql.selectList("categoryChallengeView.loadActiveChallengeCategories");
  }
}
