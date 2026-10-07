package com.ss_dam.challenge.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.challenge.dao.AdminChallengeDetailDao;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeHourlyCount;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView.HourPoint;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView.Metric;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.common.validator.PageQueryValidator;
import com.ss_dam.common.validator.challenge.AdminChallengeValidator;

@Service
@Transactional(readOnly = true)
public class AdminChallengeDetailServiceImpl
        implements AdminChallengeDetailService {

	private final AdminChallengeDetailDao adminChallengeDetailDao;
	private final AdminChallengeValidator adminChallengeValidator;
	private final PageQueryValidator pageQueryValidator;

	public AdminChallengeDetailServiceImpl (
		AdminChallengeDetailDao adminChallengeDetailDao,
		AdminChallengeValidator adminChallengeValidator,
		PageQueryValidator pageQueryValidator) {

		this.adminChallengeDetailDao = adminChallengeDetailDao;
		this.adminChallengeValidator = adminChallengeValidator;
		this.pageQueryValidator = pageQueryValidator;
		}

    // 챌린지 상세 조회
    @Override
    public AdminChallengeDetailView loadChallenge(Long code) {

        adminChallengeValidator.validateCode(code);

        AdminChallengeDetailView result =
                adminChallengeDetailDao.loadChallenge(code);

        if (result == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 챌린지입니다.");
        }

        return result;
    }

    // 참여자 목록 조회
    @Override
    public PageResult<AdminChallengeParticipantView> loadParticipants(
            Long code, PageQuery pageQuery) {

        adminChallengeValidator.validateCode(code);
        pageQueryValidator.validate(pageQuery);
        requireChallengeExists(code);

        Map<String, Object> params =
                createPageParams(code, pageQuery);

        long total =
                adminChallengeDetailDao.countParticipants(params);

        List<AdminChallengeParticipantView> content =
                adminChallengeDetailDao.loadParticipants(params);

        return PageResult.of(content, new Pager(pageQuery, total));
    }

    // 참여 순위 조회
    @Override
    public PageResult<AdminChallengeRankingView> loadChallengeRanking(
            Long code, PageQuery pageQuery) {

        adminChallengeValidator.validateCode(code);
        pageQueryValidator.validate(pageQuery);
        requireChallengeExists(code);

        Map<String, Object> params =
                createPageParams(code, pageQuery);

        params.put(
                "now",
                LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        long total =
                adminChallengeDetailDao.countParticipants(params);

        List<AdminChallengeRankingView> content =
                adminChallengeDetailDao.loadChallengeRanking(params);

        return PageResult.of(content, new Pager(pageQuery, total));
    }

    // 상세 통계 조회
    @Override
    public AdminChallengeStatisticsView loadChallengeStatistics(Long code) {

        adminChallengeValidator.validateCode(code);
        requireChallengeExists(code);

        // 모든 통계에서 같은 기준 시각 사용
        LocalDateTime now =
                LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                        .withNano(0);

        LocalDateTime todayStart =
                now.toLocalDate().atStartOfDay();

        LocalDateTime yesterdayStart =
                todayStart.minusDays(1);

        LocalDateTime yesterdaySameTime =
                now.minusDays(1);

        Map<String, Object> todayParams = Map.of(
                "code", code,
                "start", todayStart,
                "end", now);

        Map<String, Object> yesterdayParams = Map.of(
                "code", code,
                "start", yesterdayStart,
                "end", yesterdaySameTime);

        // 오늘·어제 같은 시각까지의 신규 인증글 수
        long todayProofs =
                adminChallengeDetailDao.countNewChallengeProofs(todayParams);

        long yesterdayProofs =
                adminChallengeDetailDao.countNewChallengeProofs(yesterdayParams);

        // 오늘·어제 같은 시각까지의 신규 참여자 수
        long todayParticipants =
                adminChallengeDetailDao.countNewChallengeParticipants(todayParams);

        long yesterdayParticipants =
                adminChallengeDetailDao.countNewChallengeParticipants(
                        yesterdayParams);

        // 어제 하루와 오늘 현재까지의 시간별 참여자 수
        Map<String, Object> graphParams = Map.of(
                "code", code,
                "yesterdayStart", yesterdayStart,
                "todayStart", todayStart,
                "now", now);

        List<AdminChallengeHourlyCount> rows =
                adminChallengeDetailDao.loadChallengeHourlyParticipants(
                        graphParams);

        long[] todayCounts = new long[24];
        long[] yesterdayCounts = new long[24];

        for (AdminChallengeHourlyCount row : rows) {
            if ("TODAY".equals(row.getDayType())) {
                todayCounts[row.getHour()] = row.getParticipantCount();
            } else {
                yesterdayCounts[row.getHour()] = row.getParticipantCount();
            }
        }

        List<HourPoint> graph = new ArrayList<>();

        for (int hour = 0; hour < 24; hour++) {

            // 미래 시간은 0이 아닌 미집계 상태
            Long todayCount =
                    hour <= now.getHour()
                            ? Long.valueOf(todayCounts[hour])
                            : null;

            graph.add(new HourPoint(
                    hour,
                    todayCount,
                    yesterdayCounts[hour]));
        }

        return new AdminChallengeStatisticsView(
                now,
                new Metric(
                        todayProofs,
                        yesterdayProofs,
                        calculateChangeRate(todayProofs, yesterdayProofs)),
                new Metric(
                        todayParticipants,
                        yesterdayParticipants,
                        calculateChangeRate(
                                todayParticipants, yesterdayParticipants)),
                graph);
    }

    // 삭제된 챌린지도 포함해 존재 여부 확인
    private void requireChallengeExists(Long code) {

        if (!adminChallengeDetailDao.existsChallengeIncludingDeleted(code)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 챌린지입니다.");
        }
    }

    // 참여자 목록·순위 조회용 파라미터 구성
    private Map<String, Object> createPageParams(
            Long code, PageQuery pageQuery) {

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pageQuery.getPerPage());

        return params;
    }

    // 이전 기간 대비 증감률 계산
    private BigDecimal calculateChangeRate(long current, long previous) {

        if (previous == 0 && current == 0) {
            return BigDecimal.ZERO;
        }

        // 이전 값이 0이면 증감률 계산 불가
        if (previous == 0) {
            return null;
        }

        return BigDecimal.valueOf(current)
                .subtract(BigDecimal.valueOf(previous))
                .multiply(BigDecimal.valueOf(100))
                .divide(
                        BigDecimal.valueOf(previous),
                        1,
                        RoundingMode.HALF_UP);
    }
}