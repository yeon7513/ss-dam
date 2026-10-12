package com.ss_dam.common.likes.service;

import org.springframework.stereotype.Service;

import com.ss_dam.common.likes.dao.MarketProductPickDao;

@Service
public class MarketProductPickServiceImpl implements MarketProductPickService {

  private final MarketProductPickDao pickDao;

  public MarketProductPickServiceImpl (MarketProductPickDao pickDao) {
    this.pickDao = pickDao;
  }

  @Override
  public boolean toggleProdPick(long prodCode, long memCode) {
	  
	  pickDao.upsertProductPick(prodCode, memCode);
	  
	return pickDao.selectIsProductPick(prodCode, memCode);
  }

}
