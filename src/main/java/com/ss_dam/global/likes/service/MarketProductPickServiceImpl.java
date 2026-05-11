package com.ss_dam.global.likes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.global.likes.dao.MarketProductPickDao;

@Service
public class MarketProductPickServiceImpl implements MarketProductPickService {

  @Autowired
  MarketProductPickDao pickDao;

  @Override
  public int countProductPick(Long prodCode) {
    return pickDao.countProductPick(prodCode);
  }

}
