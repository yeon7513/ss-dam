package com.ss_dam.common.category.challenge.dao;

import com.ss_dam.common.category.core.Category;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserCategoryDaoImpl implements UserCategoryDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<Category> loadAllChallengeCategories() {
    return sql.selectList("category.loadAllChallengeCategories");
  }

  @Override
  public List<Category> loadActiveChallengeCategories() {
    return sql.selectList("category.loadActiveChallengeCategories");
  }
}
