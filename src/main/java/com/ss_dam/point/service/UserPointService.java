package com.ss_dam.point.service;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.point.enums.PointReason;
import com.ss_dam.point.model.PaymentPoint;
import com.ss_dam.point.model.Point;
import com.ss_dam.point.model.PointLog;

import java.util.List;

public interface UserPointService {

  int getPointBalance(Long code);

  boolean chargePoint(Point point);

  boolean paymentPoint(PaymentPoint point);

  boolean exchangePoint(Point point);

  boolean rewardPoint(Long memCode, int amount, PointReason reason, Long prodCode);

  boolean deductPoint(Long memCode, int amount, PointReason reason, Long prodCode);

  default boolean rewardPoint(Long memCode, int amount, PointReason reason) {
    return rewardPoint(memCode, amount, reason);
  }

  default boolean deductPoint(Long memCode, int amount, PointReason reason) {
    return deductPoint(memCode, amount, reason);
  }

  List<PointLog> loadPointHistory(AuthProfile loginUser);
}
