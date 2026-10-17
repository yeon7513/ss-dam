package com.ss_dam.point.service;

import com.ss_dam.auth.member.rating.service.MemberRatingService;
import com.ss_dam.point.dao.UserPointDao;
import com.ss_dam.point.enums.PointReason;
import com.ss_dam.point.enums.PointType;
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
  private final MemberRatingService memberRatingService;

  public UserPointServiceImpl(UserPointDao pointDao, MemberRatingService memberRatingService) {
    this.pointDao = pointDao;
    this.memberRatingService = memberRatingService;
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
    pointLog.setType(PointType.SAVED);
    pointLog.setAmount(point.getPoint());
    pointLog.setReason(PointReason.CHARGING);

    point.setPoint(afterPoint);

    int result = pointDao.chargePoint(point);
    if (result == 1) {
      pointDao.chargePointLog(pointLog);

      return true;
    }
    return false;
  }

  // 포인트 송금 - 결제 시
  @Transactional
  @Override
  public boolean paymentPoint(PaymentPoint paymentPoint) {
    int payAmount = paymentPoint.getPoint();
    Long buyerCode = paymentPoint.getBuyerCode();
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
    buyerLog.setType(PointType.USED);
    buyerLog.setAmount(payAmount);
    buyerLog.setReason(PointReason.MARKET_PURCHASE);
    pointDao.chargePointLog(buyerLog);

    Long sellerCode = paymentPoint.getSellerCode();
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
    sellerLog.setType(PointType.SAVED);
    sellerLog.setAmount(payAmount);
    sellerLog.setReason(PointReason.MARKET_SALES);
    pointDao.chargePointLog(sellerLog);

    return true;
  }

  // 포인트 환전
  @Transactional
  @Override
  public boolean exchangePoint(Point point) {
    int beforePoint = pointDao.getPointBalance(point.getCode());

    PointLog pointLog = new PointLog();
    pointLog.setMemCode(point.getCode());
    pointLog.setType(PointType.USED);
    pointLog.setAmount(point.getPoint());
    pointLog.setReason(PointReason.EXCHANGE);

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

  // 포인트 지급 - 챌린지 리워드
  @Transactional
  @Override
  public boolean rewardPoint(Long memCode, int amount, PointReason reason, Long prodCode) {

    int beforePoint = pointDao.getPointBalance(memCode);
    int afterPoint = beforePoint + amount;

    Point pointObj = new Point();

    pointObj.setCode(memCode);
    pointObj.setPoint(afterPoint);

    int result = pointDao.chargePoint(pointObj);

    if (result == 1) {
      PointLog pointLog = new PointLog();

      pointLog.setMemCode(memCode);
      pointLog.setType(PointType.SAVED);
      pointLog.setAmount(amount);
      pointLog.setReason(PointReason.CHALLENGE_REWARD);
      pointLog.setProdCode(prodCode);

      pointDao.chargePointLog(pointLog);

      return true;
    }

    return false;
  }

  @Transactional
  @Override
  public boolean deductPoint(Long memCode, int amount, PointReason reason, Long prodCode) {
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
      pointLog.setType(PointType.USED);
      pointLog.setAmount(amount);
      pointLog.setReason(PointReason.POINT_ESCROW);
      pointLog.setProdCode(prodCode);

      pointDao.chargePointLog(pointLog);

      return true;
    }
    return false;
  }

  @Override
  public boolean rewardPoint(Long memCode, int amount, PointReason reason) {

    return rewardPoint(memCode, amount, reason, null);
  }

  @Override
  public boolean deductPoint(Long buyerCode, int price, PointReason reason) {

    return deductPoint(buyerCode, price, reason, null);
  }
}
