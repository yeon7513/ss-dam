package com.ss_dam.point.service;

import com.ss_dam.point.dao.UserPointDao;
import com.ss_dam.point.model.PaymentPoint;
import com.ss_dam.point.model.Point;
import com.ss_dam.point.model.PointLog;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserPointServiceImpl implements UserPointService {

	private final UserPointDao pointDao;

	public UserPointServiceImpl(UserPointDao pointDao) {
		this.pointDao = pointDao;
	}

	// 보유하고 있는 포인트 조회
	@Override
	public int getPointBalance(Long code) {
		return pointDao.getPointBalance(code);
	}

	// 포인트 충전 로직
	@Transactional
	@Override
	public boolean chargePoint(Point point) {
		int beforePoint = pointDao.getPointBalance(point.getCode()); // 먼저 기존의 포인트를 조회해서 담아두고
		int afterPoint = beforePoint + point.getPoint(); // 사용자가 충전한 금액과 기존의 포인트를 더함

		// 포인트 로그를 남기기 위해서 로그 세팅
		PointLog pointLog = new PointLog();
		pointLog.setMemCode(point.getCode());
		pointLog.setType("SAVED");
		pointLog.setAmount(point.getPoint());
		pointLog.setReason("CHARGING");

		point.setPoint(afterPoint);

		int result = pointDao.chargePoint(point);
		if (result == 1) {
			pointDao.chargePointLog(pointLog);

			return true;
		}
		return false;
	}

	@Transactional
	@Override
	public boolean paymentPoint(PaymentPoint paymentPoint) {
		int payAmount = paymentPoint.getPoint();
		Long buyerCode = paymentPoint.getBuyer_code();
		int buyBeforePoint = pointDao.getPointBalance(buyerCode);

		if (buyBeforePoint < payAmount) {
			throw new RuntimeException("구매자의 포인트 잔액이 부족합니다.");
		}
		int buyAfterPoint = buyBeforePoint - payAmount;

		Point buyerPointObj = new Point();
		buyerPointObj.setCode(buyerCode);
		buyerPointObj.setPoint(buyAfterPoint);

		int result1 = pointDao.chargePoint(buyerPointObj);
		if (result1 != 1) {
			return false;
		}

		// 구매자 포인트 로그 기록
		PointLog buyerLog = new PointLog();
		buyerLog.setMemCode(buyerCode);
		buyerLog.setType("USED");
		buyerLog.setAmount(payAmount);
		buyerLog.setReason("MARKET_PURCHASE");
		pointDao.chargePointLog(buyerLog);

		Long sellerCode = paymentPoint.getSeller_code();
		int sellBeforePoint = pointDao.getPointBalance(sellerCode);

		// 적립 후 잔액 = 기존 잔액 + 적립 금액
		int sellAfterPoint = sellBeforePoint + payAmount;

		Point sellerPointObj = new Point();
		sellerPointObj.setCode(sellerCode);
		sellerPointObj.setPoint(sellAfterPoint);

		int result2 = pointDao.chargePoint(sellerPointObj);
		if (result2 != 1) {
			throw new RuntimeException("판매자 포인트 적립에 실패했습니다.");
		}

		// 판매자 포인트 로그 기록
		PointLog sellerLog = new PointLog();
		sellerLog.setMemCode(sellerCode);
		sellerLog.setType("SAVED");
		sellerLog.setAmount(payAmount);
		sellerLog.setReason("MARKET_SALES");
		pointDao.chargePointLog(sellerLog);

		return true;
	}

	@Transactional
	@Override
	public boolean exchangePoint(Point point) {
		int beforePoint = pointDao.getPointBalance(point.getCode());

		PointLog pointLog = new PointLog();
		pointLog.setMemCode(point.getCode());
		pointLog.setType("USED");
		pointLog.setAmount(point.getPoint());
		pointLog.setReason("EXCHANGE");

		if (beforePoint >= point.getPoint()) {
			int afterPoint = beforePoint - point.getPoint();
			point.setPoint(afterPoint);
			int result = pointDao.exchangePoint(point);
			if (result == 1) {
				pointDao.chargePointLog(pointLog);

				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	@Override
	public boolean rewardPoint(Long memCode, int amount, String reason) {

		int beforePoint = pointDao.getPointBalance(memCode);
		int afterPoint = beforePoint + amount;

		Point pointObj = new Point();

		pointObj.setCode(memCode);
		pointObj.setPoint(afterPoint);

		int result = pointDao.chargePoint(pointObj);

		if (result == 1) {

			PointLog pointLog = new PointLog();

			pointLog.setMemCode(memCode);
			pointLog.setType("SAVED");
			pointLog.setAmount(amount);
			pointLog.setReason(reason);

			pointDao.chargePointLog(pointLog);

			return true;
		}

		return false;
	}

	@Transactional
	@Override
	public boolean deductPoint(Long memCode, int amount, String reason) {
		int beforePoint = pointDao.getPointBalance(memCode);

		if (beforePoint < amount) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "INSUFFICIENT_POINT");
		}

		int afterPoint = beforePoint - amount;

		Point pointObj = new Point();

		pointObj.setCode(memCode);
		pointObj.setPoint(afterPoint);

		int result = pointDao.chargePoint(pointObj);

		if (result == 1) {
			PointLog pointLog = new PointLog();

			pointLog.setMemCode(memCode);
			pointLog.setType("USED");
			pointLog.setAmount(amount);
			pointLog.setReason(reason);

			pointDao.chargePointLog(pointLog);

			return true;
		}
		return false;
	}
}
