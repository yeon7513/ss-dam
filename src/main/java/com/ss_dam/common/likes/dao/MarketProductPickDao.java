package com.ss_dam.common.likes.dao;

public interface MarketProductPickDao {  

  void upsertProductPick(long prodCode, long memCode);

  boolean selectIsProductPick(long prodCode, long memCode);

}
