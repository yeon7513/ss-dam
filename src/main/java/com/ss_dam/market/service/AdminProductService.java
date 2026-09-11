package com.ss_dam.market.service;

import java.util.List;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

public interface AdminProductService {

    List<AdminProductView> loadProducts(
            Pager pager, String status, String dealStatus);

    AdminProductDetail loadProduct(Long prodCode);

    void deleteProduct(
            Long prodCode, String reason, Long admCode);

    void restoreProduct(
            Long prodCode, String reason, Long admCode);

    List<AdminActivity> loadProductLogs(Long prodCode);
}
