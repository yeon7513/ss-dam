package com.ss_dam.auth.member.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.admin.report.model.response.ReportView;
import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.auth.member.model.filter.AdminMemberSearchFilter;
import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberFeedsView;
import com.ss_dam.auth.member.model.response.AdminMemberProofsView;
import com.ss_dam.auth.member.model.response.AdminMemberReportsView;
import com.ss_dam.auth.member.model.response.AdminMemberTradeView;
import com.ss_dam.auth.member.model.response.AdminMemberTradesView;
import com.ss_dam.auth.member.model.response.AdminMemberView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.response.UserFeedView;

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

    // 관리자 회원 상세 조회 — 기본 정보 및 사진, 통계
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

        // 완료한 챌린지 수
        long completedChallengeCount =
                adminMemberDao.countCompletedChallenges(memberCode);

        member.setCompletedChallengeCount(completedChallengeCount);


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
    
// 회원 이용 제한
@Override
@Transactional
public void restrictMember(
        Long memberCode, String reason, Long adminCode) {

    changeMemberStatus(
            memberCode, reason, adminCode,
            "ACTIVE", "SUSPENDED", "RESTRICT");
}

// 회원 이용 제한 해제
@Override
@Transactional
public void releaseMember(
        Long memberCode, String reason, Long adminCode) {

    changeMemberStatus(
            memberCode, reason, adminCode,
            "SUSPENDED", "ACTIVE", "RELEASE");
}

// 상태 변경 및 관리자 로그 저장
private void changeMemberStatus(
        Long memberCode,
        String reason,
        Long adminCode,
        String beforeStatus,
        String afterStatus,
        String processType) {

    AdminMemberDetailView member =
            adminMemberDao.loadMember(memberCode);

    if (member == null) {
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "존재하지 않는 회원입니다.");
    }

    if (Boolean.TRUE.equals(member.getDeleteYn())) {
        throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "삭제된 회원의 상태는 변경할 수 없습니다.");
    }

    Map<String, Object> params = new HashMap<>();
    params.put("memberCode", memberCode);
    params.put("beforeStatus", beforeStatus);
    params.put("afterStatus", afterStatus);
    params.put("adminCode", adminCode);
    params.put("reason", reason);
    params.put("processType", processType);

    // SQL에서도 기존 상태를 확인하여 중복 변경 방지
    int updated = adminMemberDao.updateMemberStatus(params);

    if (updated != 1) {
        throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "현재 회원 상태에서는 요청한 변경을 할 수 없습니다.");
    }

    int inserted = adminMemberDao.insertMemberStatusLog(params);

    if (inserted != 1) {
        throw new IllegalStateException(
                "회원 상태 변경 이력 저장에 실패했습니다.");
    }
}

    // 회원 정지·해제 로그 조회
    @Override
    @Transactional(readOnly = true)
    public PageResult<AdminActivity> loadMemberLogs(
            Long memberCode, PageQuery pageQuery) {

        // 페이지 입력값 검증
        if (pageQuery.getPage() < 1
                || pageQuery.getPerPage() < 1
                || pageQuery.getPerGroup() < 1) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "페이지 관련 값은 1 이상이어야 합니다.");
        }

        // 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        //해당 회원의 전체 로그 수
        //Pager로 페이지 번호를 표시하려면 필요
        int total = adminMemberDao.countMemberLogs(params);

        Pager pager = new Pager(pageQuery, total);

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        List<AdminActivity> logs =
                adminMemberDao.loadMemberLogs(params);

        return PageResult.of(logs, pager);
    }

    // 관리자 회원 상세 - 작성 피드 탭
    @Override
    @Transactional(readOnly = true)
    public AdminMemberFeedsView loadMemberFeeds(
            Long memberCode, PageQuery pageQuery) {

        // 페이지 입력값 확인
        if (pageQuery.getPage() < 1
                || pageQuery.getPerPage() < 1
                || pageQuery.getPerGroup() < 1) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "페이지 관련 값은 1 이상이어야 합니다.");
        }

        // 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        // 전체 대상 피드의 통계 조회
        AdminMemberFeedsView result =
                adminMemberDao.loadMemberFeedSummary(params);

        // 기존 페이지 계산 기능 사용
        Pager pager = new Pager(pageQuery, result.getTotalFeedCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 현재 페이지의 피드 목록 조회
        List<UserFeedView> feeds =
                adminMemberDao.loadMemberFeeds(params);

        result.setFeeds(PageResult.of(feeds, pager));

        return result;
    }
        //관리자 회원 상세 - 신고내역 탭
        @Override
        @Transactional(readOnly = true)
        public AdminMemberReportsView loadMemberReports(
                Long memberCode, PageQuery pageQuery) {

        // 1. 페이지 입력값 확인
        if (pageQuery.getPage() < 1
                || pageQuery.getPerPage() < 1
                || pageQuery.getPerGroup() < 1) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "페이지 관련 값은 1 이상이어야 합니다.");
        }

        // 2. 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        // 3. 해당 회원이 받은 전체 신고 통계
        AdminMemberReportsView result =
                adminMemberDao.loadMemberReportSummary(params);

        // 4. 전체 신고 수로 페이지 계산
        Pager pager = new Pager(
                pageQuery, result.getTotalReportCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 5. 현재 페이지의 신고 목록 조회
        List<ReportView> reports =
                adminMemberDao.loadMemberReports(params);

        // 6. 통계 DTO에 목록과 페이지 정보 설정
        result.setReports(PageResult.of(reports, pager));

        return result;
        }

        // 회원 거래 통계와 페이지 목록
        @Override
        @Transactional(readOnly = true)
        public AdminMemberTradesView loadMemberTrades(
                Long memberCode, PageQuery pageQuery) {

        // 1. 페이지 입력값 확인
        if (pageQuery.getPage() < 1
                || pageQuery.getPerPage() < 1
                || pageQuery.getPerGroup() < 1) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "페이지 관련 값은 1 이상이어야 합니다.");
        }

        // 2. 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        // 3. 전체 거래 / 구매 / 판매 통계
        AdminMemberTradesView result =
                adminMemberDao.loadMemberTradeSummary(params);

        // 4. 공통 페이지 계산 기능 재사용
        Pager pager = new Pager(
                pageQuery, result.getTotalTradeCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 5. 현재 페이지의 거래 목록
        // 상품 상세 정보는 XML association에서 채움
        List<AdminMemberTradeView> trades =
                adminMemberDao.loadMemberTrades(params);

        // 6. 통계 + 목록 + 페이지 정보 반환
        result.setTrades(PageResult.of(trades, pager));

        return result;
        }

        // 회원 인증글 통계와 페이지 목록
        @Override
        @Transactional(readOnly = true)
        public AdminMemberProofsView loadMemberProofs(
                Long memberCode, PageQuery pageQuery) {

        // 1. 페이지 입력값 확인
        if (pageQuery.getPage() < 1
                || pageQuery.getPerPage() < 1
                || pageQuery.getPerGroup() < 1) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "페이지 관련 값은 1 이상이어야 합니다.");
        }

        // 2. 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        // 3. 해당 회원의 전체 인증글 기준 통계
        AdminMemberProofsView result =
                adminMemberDao.loadMemberProofSummary(params);

        // 4. 공통 페이지 계산 기능 재사용
        Pager pager = new Pager(
                pageQuery, result.getTotalProofCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 5. 현재 페이지 인증글 목록
        List<UserFeedView> proofs =
                adminMemberDao.loadMemberProofs(params);

        // 6. 통계 + 목록 + 페이지 정보 반환
        result.setProofs(PageResult.of(proofs, pager));

        return result;
        }

}
