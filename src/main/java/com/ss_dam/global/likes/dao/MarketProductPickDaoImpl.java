package com.ss_dam.global.likes.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MarketProductPickDaoImpl implements MarketProductPickDao {

  @Autowired
  SqlSession sql;

  @Override
  public int countProductPick(Long prodCode) {
    return sql.selectOne("pick.countProductPick", prodCode);
  }

}
