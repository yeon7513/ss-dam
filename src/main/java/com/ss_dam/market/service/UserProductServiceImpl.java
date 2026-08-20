package com.ss_dam.market.service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.dao.UserProductDao;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.UserProductView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserProductServiceImpl implements UserProductService {

  @Autowired
  UserProductDao userProductDao;

  @Override
  public List<UserProductView> loadProducts(Pager pager, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return userProductDao.loadProducts(params);
  }

  @Override
  public ProductDetail findProductDetailByProdCode(Long prodCode, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("prodCode", prodCode);
    params.put("memberCode", memberCode);

    return userProductDao.findProductDetailByProdCode(params);
  }
}
