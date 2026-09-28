package com.ss_dam.market.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.market.model.filter.AdminProductSearchFilter;
import com.ss_dam.market.model.response.AdminMemberTradeView;
import com.ss_dam.market.model.response.AdminMemberTradesView;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

@Repository
public class AdminProductDaoImpl implements AdminProductDao {

    @Autowired
    private SqlSession sql;

    @Override
    public int countProducts(AdminProductSearchFilter filter) {
        return sql.selectOne(
                "adminProductView.countProducts", filter);
    }

    @Override
    public List<AdminProductView> loadProducts(AdminProductSearchFilter filter) {

        return sql.selectList(
                "adminProductView.loadProducts", filter);
    }

    @Override
    public AdminProductDetail loadProduct(Long prodCode) {
        return sql.selectOne(
                "adminProductView.loadProduct",
                Map.of("prodCode", prodCode));
    }

    @Override
    public int deleteProduct(Long prodCode) {
        return sql.update(
                "adminProductView.deleteProduct",
                Map.of("prodCode", prodCode));
    }

    @Override
    public int restoreProduct(Long prodCode) {
        return sql.update(
                "adminProductView.restoreProduct",
                Map.of("prodCode", prodCode));
    }

    @Override
    public int insertActivityLog(Map<String, Object> params) {
        return sql.insert(
                "adminProductView.insertActivityLog", params);
    }

    @Override
    public List<AdminActivity> loadProductLogs(Long prodCode) {
        return sql.selectList(
                "adminProductView.loadProductLogs",
                Map.of("prodCode", prodCode));
    }

    //관리자 회원 상세 - 회원 전체 거래 통계
    @Override
    public AdminMemberTradesView loadMemberTradeSummary(
            Map<String, Object> params) {

        return sql.selectOne(
                "adminProductView.loadMemberTradeSummary", params);
    }

    //관리자 회원 상세 - 회원 거래 페이지 목록
    @Override
    public List<AdminMemberTradeView> loadMemberTrades(
            Map<String, Object> params) {

        return sql.selectList(
                "adminProductView.loadMemberTrades", params);
    }
}

//prodCode는 XML의 #{prodCode}와 명확하게 연결되도록 Map에 담음