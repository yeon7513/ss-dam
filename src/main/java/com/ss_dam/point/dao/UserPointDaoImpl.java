package com.ss_dam.point.dao;

import com.ss_dam.point.model.Point;
import com.ss_dam.point.model.PointLog;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class UserPointDaoImpl implements UserPointDao{

    private final SqlSession sql;

    public UserPointDaoImpl(SqlSession sql) {
        this.sql = sql;
    }

    @Override
    public int getPointBalance(Long code) {
        return sql.selectOne("userPoint.getPointBalance", code);
    }

    @Override
    public int chargePoint(Point point) {
        return sql.update("userPoint.chargePoint", point);
    }

    @Override
    public void chargePointLog(PointLog pointLog) {
        sql.insert("userPoint.chargePointLog", pointLog);
    }
}
