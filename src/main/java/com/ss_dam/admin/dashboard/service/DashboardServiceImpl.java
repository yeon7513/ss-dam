package com.ss_dam.admin.dashboard.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.dashboard.dao.DashboardDao;
import com.ss_dam.admin.dashboard.model.response.ChallengeRanking;
import com.ss_dam.admin.dashboard.model.response.ChallengeStatistics;
import com.ss_dam.admin.dashboard.model.response.DashboardSummary;
import com.ss_dam.admin.dashboard.model.response.MemberStatistics;
import com.ss_dam.admin.dashboard.model.response.RegionStatistics;
import com.ss_dam.admin.dashboard.model.response.SellerRanking;

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

        //1. 날짜 필수값과 순서 검증 (validateDateRange 밑에 정리해둔 거 가져다 씀)
        validateDateRange(from, to);

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

        //1. 날짜 필수값과 순서 검증 (validateDateRange 밑에 정리해둔 거 가져다 씀)
        validateDateRange(from, to);

        //3.시작일 00:00 이상 ~ 종료일 다음 날 00:00 미만
        LocalDateTime start = from.atStartOfDay();
        LocalDateTime end = to.plusDays(1).atStartOfDay();

        //4.월별 신규 가입 회원 수 조회
        return dashboardDao.findMemberStatistics(start, end);
    }

    // 종료된 챌린지의 참여 건수와 달성률 조회
    @Override
    public ChallengeStatistics getChallengeStatistics(
        LocalDate from, LocalDate to) {

        //1. 날짜 필수값과 순서 검증 (validateDateRange 밑에 정리해둔 거 가져다 씀)
        validateDateRange(from, to);

        //2. 조회 기간 설정
        LocalDateTime start = from.atStartOfDay();
        LocalDateTime end  = to.plusDays(1).atStartOfDay();

        //3.전체 참여 건수와 달성 건수 조회
        ChallengeStatistics result = 
            dashboardDao.findChallengeStatistics(start, end);

        long total = result.getTotalParticipationCount();
        long completed = result.getCompletedParticipationCount();

        //4.미달성 건수 계산
        result.setIncompleteParticipationCount(total - completed);

        //5.달성률 계산
        if (total == 0) {
            result.setCompletionRate(null);
        } else {
            double rate = completed * 100.0 / total;

            //소수점 첫째 자리까지 반올림
            result.setCompletionRate(
                Math.round(rate * 10.0) / 10.0
            );
        }

        return result;

        }
    
    //조회 기간의 참여자 수 기준 챌린지 인기 순위
    @Override
    public List<ChallengeRanking> getChallengeRanking(
        LocalDate from, LocalDate to) {

        //1. 공통 날짜 검증
        validateDateRange(from, to);

        //2. 조회 기간 설정
        LocalDateTime start = from.atStartOfDay();
        LocalDateTime end = to.plusDays(1).atStartOfDay();

        //3. 참여자 수 내림차순으로 조회
        List<ChallengeRanking> rankings = 
            dashboardDao.findChallengeRanking(start, end);

        //4. 동일 참여자 수는 공동 순위로 설정
        int rank = 0;
        long previousCount = -1;

        for (int i = 0; i < rankings.size(); i++) {
        ChallengeRanking item = rankings.get(i);

        if (item.getParticipantCount() != previousCount) {
            rank = i + 1;
        }

        item.setRank(rank);
        previousCount = item.getParticipantCount();
        }

        return rankings;
    
        }

    //조회 기간의 지역별 챌린지 참여 건수와 비율 조회
    @Override
    public List<RegionStatistics> getRegionStatistics(
        LocalDate from, LocalDate to) {

        //1. 공통 날짜 검증
        validateDateRange(from, to);

        //2. 조회 기간 설정
        LocalDateTime start = from.atStartOfDay();
        LocalDateTime end = to.plusDays(1).atStartOfDay();

        //3. 지역별 참여 건수 조회
        List<RegionStatistics> regions = 
            dashboardDao.findRegionStatistics(start, end);
        
        //4. 전체 참여 건수 계산
        long totalCount = 0;

        for (RegionStatistics region : regions) {
            totalCount += region.getParticipationCount();
        }

        //5. 지역별 참여 비율 계산
        for (RegionStatistics region : regions) {
            
            if (totalCount == 0) {
                region.setParticipationRate(null);
                //setParticipationRate()는 계산해서 넣을 비율
            } else {
                double rate = 
                    region.getParticipationCount() * 100.0 / totalCount;
                    //getParticipationCount()는 DB에서 조회한 참여 건수
                    //지역 참여 건수 ÷ 전체 참여 건수 × 100으로 계산
                
                //소수점 첫째 자리까지 반올림
                region.setParticipationRate(
                    Math.round(rate * 10.0) / 10.0
                );
            }
        }
        
        return regions;
    }

   @Override
   public List<SellerRanking> getSellerRanking(
        LocalDate from, LocalDate to) {
        
        //1. 공통 날짜 검증
        validateDateRange(from, to);

        //2. 이번 기간 설정
        long days = ChronoUnit.DAYS.between(from, to) + 1;

        LocalDateTime start = from.atStartOfDay();
        LocalDateTime end = to.plusDays(1).atStartOfDay();

        //3. 바로 앞의 동일한 일수로 이전 기간 설정
        LocalDateTime previousStart = 
            from.minusDays(days).atStartOfDay();
        LocalDateTime previousEnd = start;

        //4. 이번 기간과 이전 기간의 판매 실적 조회
        List<SellerRanking> rankings = 
            dashboardDao.findSellerRanking(start, end);
        
        List<SellerRanking> previousRankings =
            dashboardDao.findSellerRanking(previousStart, previousEnd);
        
        //5. 판매자 아이디별 이전 판매 금액 저장
        Map<String, Long> previousSales = new HashMap<>();

        for (SellerRanking seller : previousRankings) {
            previousSales.put(
                seller.getMemberProfile().getId(),
                seller.getTotalSalesAmount()
            );
        }

        //6. 순위와 이전 기간 대비 증감률 계산
        int rank = 0;
        long previousAmount = 0;

        for (int i = 0; i < rankings.size(); i++) {
            SellerRanking seller = rankings.get(i);
            long currentAmount = seller.getTotalSalesAmount();

            //금액이 같으면 공동 순위: 1위, 1위, 3위
            if (i == 0 || currentAmount != previousAmount) {
                rank = i + 1;
            }

            seller.setRank(rank);
            previousAmount = currentAmount;
            
            String sellerId = seller.getMemberProfile().getId();
            long previousSalesAmount =
                previousSales.getOrDefault(sellerId, 0L);
            
            //기존 증감률 계산 매서드 재사용
            seller.setSalesChangeRate(
                calculateChangeRate(currentAmount, previousSalesAmount)
            );
        }

        return rankings;
    }
   

    


    /* 공통 로직 코드 (반복되는 것들 만들어 놓음) */

    // 날짜 검증은 validateDateRange(),
    // 날짜 전달은 createPeriodParams(),
    // 증감률 계산은 calculateChangeRate() 

    //날짜 필수값과 순서를 공통으로 검증
    private void validateDateRange(LocalDate from, LocalDate to) {

        if (from == null || to == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "시작일과 종료일은 필수입니다"
            );
        }

        if (from.isAfter(to)) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "시작일은 종료일보다 늦을 수 없습니다"
            );
        }
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

