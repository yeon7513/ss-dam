package com.ss_dam.common.category.challenge.dao;

import com.ss_dam.common.category.challenge.model.response.UserChallengeCategoryView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserChallengeCategoryDaoImpl implements UserChallengeCategoryDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<UserChallengeCategoryView> loadActiveChallengeCategories() {
    return sql.selectList("categoryChallengeView.loadActiveChallengeCategories");
  }
}
