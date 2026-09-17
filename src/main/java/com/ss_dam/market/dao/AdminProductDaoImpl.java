package com.ss_dam.market.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.market.model.filter.AdminProductSearchFilter;
import com.ss_dam.market.model.response.AdminProductView;

@Repository
public class AdminProductDaoImpl implements AdminProductDao {

	@Autowired
	private SqlSession sql;

	// 관리자 상품 목록 전체 개수
	@Override
	public int countProducts(AdminProductSearchFilter filter) {
		return sql.selectOne("adminProductView.countProducts", filter);
	}

	// 관리자 상품 목록 조회
	@Override
	public List<AdminProductView> loadProducts(AdminProductSearchFilter filter) {

		return sql.selectList("adminProductView.loadProducts", filter);
	}

	// 관리자 상품 상세 조회
	@Override
	public ProductDetail loadProduct(Long prodCode) {
		return sql.selectOne("adminProductView.loadProduct", prodCode);
	}

	// 관리자 - 상품 선택 삭제
	// 상품 단건 삭제
	// 상품 논리 삭제
	@Override
	public int deleteProduct(Long prodCode) {
		return sql.update("adminProductView.deleteProduct", prodCode);
	}

	// 삭제 로그 저장
	@Override
	public int insertDeleteLog(Map<String, Object> params) {
		return sql.insert("adminProductView.insertDeleteLog", params);
	}

	

    @Override
    public List<AdminActivity> loadProductLogs(Long prodCode) {
        return sql.selectList(
                "adminProductView.loadProductLogs",
                Map.of("prodCode", prodCode));
    }
}

//prodCode는 XML의 #{prodCode}와 명확하게 연결되도록 Map에 담음