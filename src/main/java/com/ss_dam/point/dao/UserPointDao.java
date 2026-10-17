package com.ss_dam.point.dao;

import com.ss_dam.point.model.Point;
import com.ss_dam.point.model.PointLog;

import java.util.List;

public interface UserPointDao {
  int getPointBalance(Long code);

  int chargePoint(Point point);

  void chargePointLog(PointLog pointLog);

  int exchangePoint(Point point);

  Long findSellerCodeByProdCode(Long prodCode);

  List<PointLog> loadPointHistory(Long memCode);
}
