package com.ss_dam.market.service;

import com.ss_dam.common.pager.PageResult;
import com.ss_dam.market.model.filter.AdminProductSearchFilter;
import com.ss_dam.market.model.response.AdminProductView;
import com.ss_dam.market.model.response.ProductDetail;

public interface AdminProductService {

	// 관리자 - 상품 목록 조회
	PageResult<AdminProductView> loadProducts(AdminProductSearchFilter filter);

	// 관리자 - 상품 목록 삭제
	ProductDetail loadProduct(Long prodCode);

	// 관리자 - 상품 선택 삭제
	// 관리자 - 상품 단건 삭제 + 처리 사유 + 로그에 남길 관리자 번호
	void deleteProduct(Long prodCode, String reason, Long admCode);

}
