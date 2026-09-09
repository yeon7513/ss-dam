package com.ss_dam.market.service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.request.ProductUpdate;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.ProductEditView;
import com.ss_dam.market.model.response.UserProductView;

import java.util.List;

public interface UserProductService {
  List<UserProductView> loadProducts(Pager pager, Long memberCode);

  ProductDetail findProductDetailByProdCode(Long prodCode, Long memberCode);

  ProductEditView findProductDetailForEdit(Long prodCode, Long memberCode);

  void updateProductPost(ProductUpdate productUpdate);

  void deleteProductPost(Long prodCode, String updatedBy);
}
