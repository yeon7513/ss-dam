package com.ss_dam.market.dao;

import com.ss_dam.market.model.request.ProductUpdate;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.ProductEditView;
import com.ss_dam.market.model.response.UserProductView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserProductDaoImpl implements UserProductDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<UserProductView> loadProducts(Map<String, Object> params) {
    return sql.selectList("userProductView.loadProducts", params);
  }

  @Override
  public ProductDetail findProductDetailByProdCode(Map<String, Object> params) {
    return sql.selectOne("userProductView.findProductDetailByProdCode", params);
  }

  @Override
  public ProductEditView findProductDetailForEdit(Map<String, Object> params) {
    return sql.selectOne("userProductView.findProductDetailForEdit", params);
  }

  @Override
  public void updateProductPost(ProductUpdate productUpdate) {
    sql.update("productCommand.updateProductPost", productUpdate);
  }

  @Override
  public void deleteProductPost(Map<String, Object> params) {
    sql.update("productCommand.deleteProductPost", params);
  }

}
