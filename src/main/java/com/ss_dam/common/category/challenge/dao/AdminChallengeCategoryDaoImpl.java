package com.ss_dam.common.category.challenge.dao;

import com.ss_dam.common.category.challenge.model.response.AdminChallengeCategoryView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminChallengeCategoryDaoImpl implements AdminChallengeCategoryDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<AdminChallengeCategoryView> loadAllChallengeCategories() {
    return sql.selectList("categoryChallengeView.loadAllChallengeCategories");
  }
}
