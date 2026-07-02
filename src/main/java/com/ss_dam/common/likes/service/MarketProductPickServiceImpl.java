package com.ss_dam.common.likes.service;

import com.ss_dam.common.likes.dao.MarketProductPickDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarketProductPickServiceImpl implements MarketProductPickService {

  @Autowired
  MarketProductPickDao pickDao;

  @Override
  public int countProductPick(Long prodCode) {
    return pickDao.countProductPick(prodCode);
  }

}
