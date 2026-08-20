package com.ss_dam.market.service;

import com.ss_dam.market.model.MarketProduct;

import java.util.List;

public interface MarketProductService {

  List<MarketProduct> searchProducts();

  MarketProduct searchProductByCode(Long code);

}
