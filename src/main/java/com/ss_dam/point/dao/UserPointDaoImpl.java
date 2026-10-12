package com.ss_dam.point.dao;

import org.apache.ibatis.session.SqlSession;

public class UserPointDaoImpl extends UserPointDao{

    private final SqlSession sql;

    public UserPointDaoImpl(SqlSession sql) {
        this.sql = sql;
    }

    @Override
    public int getPointBalance(Long code) {
        return sql.selectOne("userPoint.getPointBalance", code);
    }
}
