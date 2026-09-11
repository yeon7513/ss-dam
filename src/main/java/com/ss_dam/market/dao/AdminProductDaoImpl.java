package com.ss_dam.market.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

@Repository
public class AdminProductDaoImpl implements AdminProductDao {

    @Autowired
    private SqlSession sql;

    @Override
    public int countProducts(Map<String, Object> params) {
        return sql.selectOne(
                "adminProductView.countProducts", params);
    }

    @Override
    public List<AdminProductView> loadProducts(
            Map<String, Object> params) {

        return sql.selectList(
                "adminProductView.loadProducts", params);
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
}

//prodCode는 XML의 #{prodCode}와 명확하게 연결되도록 Map에 담음