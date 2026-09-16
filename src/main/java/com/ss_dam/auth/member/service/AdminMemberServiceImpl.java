package com.ss_dam.auth.member.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.auth.member.model.filter.AdminMemberSearchFilter;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;

@Service
public class AdminMemberServiceImpl implements AdminMemberService{

  @Autowired 
  private AdminMemberDao adminMemberDao;

  //관리자 회원 목록 조회 및 검색
  @Override 
  @Transactional(readOnly = true)
  public PageResult<AdminMemberView> loadMembers(
          AdminMemberSearchFilter filter) {

      Map<String, Object> params = new HashMap<>();

      //검색 조건 전체
      params.put("filter", filter);

      //검색 조건에 해당하는 전체 회원 수
      int total = adminMemberDao.countMembers(params);

      // 기존 Pager 활용: 페이지 번호·이전·다음·마지막 페이지 계산
      Pager pager = new Pager(filter, total);

          //목록 조회 범위
          params.put("filter", filter);
          params.put("offset", filter.getOffset());
          params.put("perPage", pager.getPerPage());

          List<AdminMemberView> members =
                adminMemberDao.loadMembers(params);
          
          //회원 목록 + 페이지 정보 반환
          return PageResult.of(members, pager);
           
        }

    // 관리자 회원 상세 조회 — 기본 정보 및 프로필 사진
    @Override
    @Transactional(readOnly = true)
    public AdminMemberDetailView loadMember(Long memberCode) {

        AdminMemberDetailView member =
                adminMemberDao.loadMember(memberCode);

        if (member == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 회원입니다.");
        }


        //상단 통계 - 신고 누적 수
        long receivedReportCount =
                adminMemberDao.countReceivedReports(memberCode);
        member.setReceivedReportCount(receivedReportCount);

    

        //상단 통계 - 피드 활동 수
        long feedCount = adminMemberDao.countMemberFeeds(memberCode);
        member.setFeedCount(feedCount);

        //상단 통계 - 거래 활동 수
        long tradeCount = adminMemberDao.countMemberTrades(memberCode);
        member.setTradeCount(tradeCount);

        //상단 통계 - 로그인 횟수
        long loginCount = adminMemberDao.countMemberLogins(memberCode);
        member.setLoginCount(loginCount);

        return member;

        }

        
}
