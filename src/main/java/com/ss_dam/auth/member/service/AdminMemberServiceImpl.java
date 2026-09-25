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

// 휴면 전환 -> 기준 기간 정해서 자동, 정지/탈퇴 회원 제외
// 마지막 로그인 기록이 없는 회원은 가입일 기준으로 판단

// 휴면 해제 -> 기준 기간 정해서 자동으로, 재로그인하면 사용자가 본인 확인을 통해 해제


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

}
