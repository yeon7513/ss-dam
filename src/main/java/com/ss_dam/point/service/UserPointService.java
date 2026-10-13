package com.ss_dam.point.service;

import com.ss_dam.point.model.PaymentPoint;
import com.ss_dam.point.model.Point;

public interface UserPointService {

	int getPointBalance(Long code);

	boolean chargePoint(Point point);

	boolean paymentPoint(PaymentPoint point);
}
