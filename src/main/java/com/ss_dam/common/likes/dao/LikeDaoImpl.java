package com.ss_dam.common.likes.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LikeDaoImpl implements LikeDao {

  @Autowired
  SqlSession sql;

  @Override
  public int countFeedLike(Long feedCode) {
    return sql.selectOne("likes.countFeedLike", feedCode);
  }

  @Override
  public int countCommentLike(Long cmtCode) {
    return sql.selectOne("likes.countCommentLike", cmtCode);
  }

}
