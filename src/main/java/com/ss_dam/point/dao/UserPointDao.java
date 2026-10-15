package com.ss_dam.point.dao;

import com.ss_dam.point.model.Point;
import com.ss_dam.point.model.PointLog;

public interface UserPointDao {
    int getPointBalance(Long code);

    int chargePoint(Point point);

    void chargePointLog(PointLog pointLog);

    int exchangePoint(Point point);
	
}
