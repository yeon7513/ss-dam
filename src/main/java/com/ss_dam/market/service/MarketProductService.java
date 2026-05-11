package com.ss_dam.market.service;

import java.util.List;
import com.ss_dam.market.MarketProduct;

public interface MarketProductService {

  List<MarketProduct> searchProducts();

  MarketProduct searchProductByCode(Long code);

}
