package com.ss_dam.market.service;

import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.market.model.request.ProductUpdate;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.ProductEditView;
import com.ss_dam.market.model.response.UserProductView;

public interface UserProductService {
  PageResult<UserProductView> loadProducts(PageQuery pageQuery, Long memberCode);

  ProductDetail findProductDetailByProdCode(Long prodCode, Long memberCode);

  ProductEditView findProductDetailForEdit(Long prodCode, Long memberCode);

  void updateProductPost(ProductUpdate productUpdate);

  void deleteProductPost(Long prodCode, String updatedBy);
}
