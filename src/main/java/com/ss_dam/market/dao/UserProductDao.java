package com.ss_dam.market.dao;

import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.UserProductView;

import java.util.List;
import java.util.Map;

public interface UserProductDao {
  List<UserProductView> loadProducts(Map<String, Object> params);

  ProductDetail findProductDetailByProdCode(Map<String, Object> params);
}
