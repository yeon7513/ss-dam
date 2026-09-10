package com.ss_dam.admin.dashboard.dao;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.dashboard.model.response.MemberStatistics;

@Repository //DAO 구현 클래스를 Spring Bean으로 등록
public class DashboardDaoImpl implements DashboardDao {
    
   @Autowired 
   private SqlSession sql;

   @Override 
   public long countTotalMembers(LocalDateTime end) {
    Map<String, Object> params = new HashMap<>();
    params.put("end", end);

    return sql.selectOne("dashboard.countTotalMembers", params);
   
    }

   @Override 
   public long countNewMembers(LocalDateTime start, LocalDateTime end) {
    
    return sql.selectOne("dashboard.countNewMembers", createPeriodParams(start, end));

   }

   @Override 
   public List<MemberStatistics> findMemberStatistics(
        LocalDateTime start, LocalDateTime end) {

            return sql.selectList(
                "dashboard.findMemberStatistics",
                createPeriodParams(start, end)
            );
        }


   @Override 
   public long countNewFeeds(LocalDateTime start, LocalDateTime end) {
    
    return sql.selectOne("dashboard.countNewFeeds", createPeriodParams(start, end));
   
    }

    @Override 
    public long countNewTrades(LocalDateTime start, LocalDateTime end) {

     return sql.selectOne("dashboard.countNewTrades", createPeriodParams(start, end));

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


    

