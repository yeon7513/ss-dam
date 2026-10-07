package com.ss_dam.admin.stats.dao;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.stats.model.response.ChallengeRanking;
import com.ss_dam.admin.stats.model.response.ChallengeStatistics;
import com.ss_dam.admin.stats.model.response.MemberStatistics;
import com.ss_dam.admin.stats.model.response.RegionStatistics;
import com.ss_dam.admin.stats.model.response.SellerRanking;

@Repository //DAO 구현 클래스를 Spring Bean으로 등록
public class StatsDaoImpl implements StatsDao {
    
   @Autowired 
   private SqlSession sql;

   @Override 
   public long countTotalMembers(LocalDateTime end) {
    Map<String, Object> params = new HashMap<>();
    params.put("end", end);

    return sql.selectOne("stats.countTotalMembers", params);
   
    }

   @Override 
   public long countNewMembers(LocalDateTime start, LocalDateTime end) {
    
    return sql.selectOne("stats.countNewMembers", createPeriodParams(start, end));

   }

   @Override 
   public List<MemberStatistics> findMemberStatistics(
        LocalDateTime start, LocalDateTime end) {

            return sql.selectList(
                "stats.findMemberStatistics",
                createPeriodParams(start, end)
            );
        }

    @Override
    public ChallengeStatistics findChallengeStatistics(
        LocalDateTime start, LocalDateTime end) {

        return sql.selectOne("stats.findChallengeStatistics", createPeriodParams(start, end));
        
        }
    
    @Override
    public List<ChallengeRanking> findChallengeRanking(
        LocalDateTime start, LocalDateTime end) {
        
        return sql.selectList("stats.findChallengeRanking", createPeriodParams(start, end));
        
        }

    @Override
    public List<RegionStatistics> findRegionStatistics(
        LocalDateTime start, LocalDateTime end) {

        return sql.selectList("stats.findRegionStatistics", createPeriodParams(start, end));
        }

    @Override
    public List<SellerRanking> findSellerRanking(
        LocalDateTime start, LocalDateTime end) {
        
        return sql.selectList(
            "stats.findSellerRanking",
            createPeriodParams(start, end)
        );
    }
    
   @Override 
   public long countNewFeeds(LocalDateTime start, LocalDateTime end) {
    
    return sql.selectOne("stats.countNewFeeds", createPeriodParams(start, end));
   
    }

    @Override 
    public long countNewTrades(LocalDateTime start, LocalDateTime end) {

     return sql.selectOne("stats.countNewTrades", createPeriodParams(start, end));

    }

    //기간 조회에 사용할 공통 파라미터 생성
    private Map<String, Object> createPeriodParams(
        LocalDateTime start, LocalDateTime end) {

        Map<String, Object> params = new HashMap<>();
        params.put("start", start);
        params.put("end", end);

        return params;

        }

}


    

