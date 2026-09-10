package com.ss_dam.common.likes.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MarketProductPickDaoImpl implements MarketProductPickDao {

  @Autowired
  SqlSession sql;

  @Override
  public void upsertProductPick(long prodCode, long memCode) {
	  Map<String, Object> params = new HashMap<>();
	  
	  params.put("prodCode", prodCode);
	  params.put("memCode", memCode);
	  
	  sql.insert("pick.upsertProdPick", params);
	
  }

  @Override
  public boolean selectIsProductPick(long prodCode, long memCode) {	  
	  Map<String, Object> params = new HashMap<>();
	  
	  params.put("prodCode", prodCode);
	  params.put("memCode", memCode);
	  
	  Boolean isLiked = sql.selectOne("pick.selectedIsPicked", params);
	
	return Boolean.TRUE.equals(isLiked);
  } 

}
