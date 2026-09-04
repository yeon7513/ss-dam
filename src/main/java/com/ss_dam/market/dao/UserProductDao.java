package com.ss_dam.market.dao;

import com.ss_dam.market.model.request.ProductUpdate;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.ProductEditView;
import com.ss_dam.market.model.response.UserProductView;

import java.util.List;
import java.util.Map;

public interface UserProductDao {
  List<UserProductView> loadProducts(Map<String, Object> params);

  ProductDetail findProductDetailByProdCode(Map<String, Object> params);

  ProductEditView findProductDetailForEdit(Map<String, Object> params);

  void updateProductPost(ProductUpdate productUpdate);

  void deleteProductPost(Map<String, Object> params);
}
