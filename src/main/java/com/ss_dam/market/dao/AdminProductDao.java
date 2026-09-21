package com.ss_dam.market.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.market.model.filter.AdminProductSearchFilter;
import com.ss_dam.market.model.response.AdminMemberTradeView;
import com.ss_dam.market.model.response.AdminMemberTradesView;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

public interface AdminProductDao {

	// 검색 조건에 해당하는 상품 수
	int countProducts(AdminProductSearchFilter filter);

	// 상품 목록
	List<AdminProductView> loadProducts(AdminProductSearchFilter filter);

	// 상품 상세
	AdminProductDetail loadProduct(Long prodCode);

	// 논리 삭제
	int deleteProduct(Long prodCode);

	// 삭제 복구
	int restoreProduct(Long prodCode);

	// 관리자 처리 이력 저장
	int insertActivityLog(Map<String, Object> params);

	// 상품별 관리자 처리 이력 조회
	List<AdminActivity> loadProductLogs(Long prodCode);

	//관리자 회원 상세 - 회원 전체 거래 / 구매 / 판매 통계
	AdminMemberTradesView loadMemberTradeSummary(
					Map<String, Object> params);
	
	//관리자 회원 상세 - 회원 거래 페이지 목록
	List<AdminMemberTradeView> loadMemberTrades(
					Map<String, Object> params);
}