package com.ss_dam.market.dao;

import com.ss_dam.market.model.MarketProduct;

import java.util.List;

public interface MarketProductDao {

  List<MarketProduct> searchProducts();

  MarketProduct searchProductByCode(Long code);

}
