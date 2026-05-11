package com.ss_dam.market.dao;

import java.util.List;
import com.ss_dam.market.MarketProduct;

public interface MarketProductDao {

  List<MarketProduct> searchProducts();

  MarketProduct searchProductByCode(Long code);

}
