package com.ss_dam.market.service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.UserProductView;

import java.util.List;

public interface UserProductService {
  List<UserProductView> loadProducts(Pager pager, Long memberCode);

  ProductDetail findProductDetailByProdCode(Long prodCode, Long memberCode);
}
