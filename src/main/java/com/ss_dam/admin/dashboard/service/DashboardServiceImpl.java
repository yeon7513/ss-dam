package com.ss_dam.admin.dashboard.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.dashboard.dao.DashboardDao;
import com.ss_dam.admin.dashboard.model.response.DashboardSummary;
import com.ss_dam.admin.dashboard.model.response.MemberStatistics;

@Service //구현 클래스를 Spring Bean으로 등록
@Transactional(readOnly = true) //조회용 트랜잭션 적용
public class DashboardServiceImpl implements DashboardService {

    //Spring이 DashboardDaoImpl 객체를 찾아 주입
    @Autowired 
    private DashboardDao dashboardDao;

    //조회 기간에 해당하는 대시보드 통계 반환
    @Override 
    public DashboardSummary getDashboardSummary(
        LocalDate from,
        LocalDate to) {

        //1. 날짜 검증
        if (from == null || to == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "시작일과 종료일은 필수입니다"
            );
        }

        //날짜 시작일과 종료일 순서 검증
        if (from.isAfter(to)) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "시작일은 종료일보다 늦을 수 없습니다"
            );
        }

        //2. 조회 기간 계산
        //EX) 9/1 ~ 9/9 -> 양 끝 날짜를 포함하여 9일
        long days = ChronoUnit.DAYS.between(from, to) + 1;

        //이번 기간 : 시작일 00:00 이상 ~ 종료일 다음 날 00:00 미만
        LocalDateTime start = from.atStartOfDay();
        LocalDateTime end = to.plusDays(1).atStartOfDay();

        //이전 기간: 이번 기간 바로 앞의 동일한 일수
        //예: 이번 9/1 ~ 9/9 -> 이전 8/23 ~ 8/31
        LocalDateTime previousStart = from.minusDays(days).atStartOfDay();
        LocalDateTime previousEnd = start;

        //3. 각 기간 종료 시점의 누적 회원 수
        long totalMemberCount = dashboardDao.countTotalMembers(end);
        long previousTotalMemberCount = dashboardDao.countTotalMembers(previousEnd);

        //4. 각 기간에 가입한 신규 회원 수
        long newMemberCount = dashboardDao.countNewMembers(start, end);
        long previousNewMemberCount = dashboardDao.countNewMembers(previousStart, previousEnd);

        //5. 각 기간에 등록된 신규 피드 수
        long newFeedCount = dashboardDao.countNewFeeds(start, end);
        long previousNewFeedCount = dashboardDao.countNewFeeds(previousStart, previousEnd);

        //6. 각 기간에 등록된 신규 거래 수
        long newTradeCount = dashboardDao.countNewTrades(start, end);
        long previousNewTradeCount = dashboardDao.countNewTrades(previousStart, previousEnd);

        //7. 조회한 건수를 DTO에 설정
        DashboardSummary summary = new DashboardSummary();

        summary.setTotalMemberCount(totalMemberCount);
        summary.setNewMemberCount(newMemberCount);
        summary.setNewFeedCount(newFeedCount);
        summary.setNewTradeCount(newTradeCount);

        //8. 이전 기간 대비 증감률을 계산하여 DTO에 설정
        summary.setTotalMemberChangeRate(
            calculateChangeRate(
                totalMemberCount, previousTotalMemberCount));

        summary.setNewMemberChangeRate(
            calculateChangeRate(
                newMemberCount, previousNewMemberCount));

        summary.setNewFeedChangeRate(
            calculateChangeRate(
                newFeedCount, previousNewFeedCount));
        
        summary.setNewTradeChageRate(
            calculateChangeRate(
                newTradeCount, previousNewTradeCount));

        return summary;

    }

    //조회 기간의 월별 신규 가입 회원 수
    @Override 
    public List<MemberStatistics> getMemberStatistics(
        LocalDate from, LocalDate to) {

        //1.날짜 필수값 검증
        if (from == null || to == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "시작일과 종료일은 필수입니다"
            );
        }
        
        //2.날짜 순서 검증
        if (from.isAfter(to)) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "시작일은 종료일보다 늦을 수 없습니다"
            );
        }

        //3.시작일 00:00 이상 ~ 종료일 다음 날 00:00 미만
        LocalDateTime start = from.atStartOfDay();
        LocalDateTime end = to.plusDays(1).atStartOfDay();

        //4.월별 신규 가입 회원 수 조회
        return dashboardDao.findMemberStatistics(start, end);
    }



    //증감률 계산은 DB 조회가 아닌 비즈니스 로직이므로,
    //DAO가 아닌 ServiceImpl에서 처리
    private Double calculateChangeRate(long current, long previous) {
        
        //이전 기간 값이 0이면 계산할 수 없으므로 null 반환
        if(previous == 0) {
            return null;
        }

        //증감률(%) = (이번 값 - 이전 값) / 이전 값 * 100
        double rate = (current - previous) * 100.0 / previous;

        //소수점 첫째 자리까지 반올림
        //EX)12.345... -> 12.3
        return Math.round(rate*10.0) / 10.0;
    }
}

