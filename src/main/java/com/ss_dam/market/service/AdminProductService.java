package com.ss_dam.market.service;

import java.util.List;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.market.model.filter.AdminProductSearchFilter;
import com.ss_dam.market.model.response.AdminMemberTradesView;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

public interface AdminProductService {

    PageResult<AdminProductView> loadProducts(AdminProductSearchFilter filter);

    AdminProductDetail loadProduct(Long prodCode);

    void deleteProduct(
            Long prodCode, String reason, Long admCode);

    void restoreProduct(
            Long prodCode, String reason, Long admCode);

    List<AdminActivity> loadProductLogs(Long prodCode);

    //관리자 회원 상세 - 회원 거래 통계와 페이지 목록
    AdminMemberTradesView loadMemberTrades(
        Long memberCode, PageQuery pageQuery);
	
}
