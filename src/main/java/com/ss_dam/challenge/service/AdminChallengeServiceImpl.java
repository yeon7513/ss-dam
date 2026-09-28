package com.ss_dam.challenge.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.challenge.dao.AdminChallengeDao;
import com.ss_dam.challenge.model.request.AdminChallengeCreateRequest;
import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.response.UserFeedView;

@Service
public class AdminChallengeServiceImpl implements AdminChallengeService {

    @Autowired
    private AdminChallengeDao adminChallengeDao;

    @Autowired
    private AdminMemberDao adminMemberDao;

    // 관리자 챌린지 진행현황 목록 조회
    @Override 
    @Transactional(readOnly = true)
    public PageResult<AdminChallengeListView> loadChallenges(
            AdminChallengeSearch search) {
				
				// 1.페이지 입력값 검증
				if (search.getPage() < 1
							|| search.getPerPage() < 1
							|| search.getPerPage() > 100
							|| search.getPerGroup() < 1
							|| search.getPerGroup() > 10) {

								throw new ResponseStatusException(
												HttpStatus.BAD_REQUEST,
												"page는 1 이상, perPage는 1~100," 
												+ "perGroup은 1~10이어야 합니다.");
							}

				  // 공통 PageQuery의 offset이 int이므로 범위 확인
					long offset =
									((long) search.getPage() - 1) * search.getPerPage();

					if (offset > Integer.MAX_VALUE) {
							throw new ResponseStatusException(
											HttpStatus.BAD_REQUEST,
											"조회 가능한 페이지 범위를 초과했습니다.");
					}

					// 2. 전체 대상 건수
					// countChallenges() → 페이지 버튼 계산에 필요한 전체 건수
					long total = adminChallengeDao.countChallenges(search);

					// 3. 현재 페이지 목록
					// loadChallenges() → 현재 페이지에 표시할 카드 목록
					List<AdminChallengeListView> content =
									adminChallengeDao.loadChallenges(search);

					// 4. 목록과 페이지 정보 반환
					Pager pager = new Pager(search, total);

					return PageResult.of(content, pager);

          }

		//관리자 챌린지 인증현황 상세 조회
		@Override 
		@Transactional(readOnly = true)
		public AdminChallengeDetailView loadChallenge(Long code) {

			if (code == null || code < 1) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"챌린지 번호는 1 이상이어야 합니다");
			}

    AdminChallengeDetailView result =
            adminChallengeDao.loadChallenge(code);

    if (result == null) {
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "존재하지 않는 챌린지입니다.");
    }

    return result;
}

		// 관리자 챌린지 등록
		@Override
		@Transactional
		public Long createChallenge(
						AdminChallengeCreateRequest request,
						Long adminCode,
						String adminId) {

				// 1. 제목 검증
				if (request.getTitle() == null
								|| request.getTitle().isBlank()
								|| request.getTitle().length() > 255) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"제목은 1~255자로 입력해주세요.");
				}

				// 2. 내용 검증
				if (request.getContent() == null
								|| request.getContent().isBlank()
								|| request.getContent().length() > 4000) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"내용은 1~4000자로 입력해주세요.");
				}

				// 3. 기간 검증
				if (request.getStartDate() == null
								|| request.getEndDate() == null
								|| !request.getEndDate().isAfter(request.getStartDate())) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"종료일시는 시작일시보다 뒤여야 합니다.");
				}

				// 4. 공개 상태 검증
				if (!"ACTIVE".equals(request.getPostStatus())
								&& !"PRIVATE".equals(request.getPostStatus())) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"공개 상태는 ACTIVE 또는 PRIVATE여야 합니다.");
				}

				// 5. 보상 포인트 검증
				if (request.getPointEarned() == null
								|| request.getPointEarned() < 0) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"보상 포인트는 0 이상이어야 합니다.");
				}

				// 6. 등록 시점의 진행 상태 계산
				// 요청한 시작일시와 종료일시는 한국 시간으로 취급
				LocalDateTime now =
								LocalDateTime.now(ZoneId.of("Asia/Seoul"));

				String progressStatus;

				if (now.isBefore(request.getStartDate())) {
						progressStatus = "WAITING";
				} else if (!now.isBefore(request.getEndDate())) {
						progressStatus = "ENDED";
				} else {
						progressStatus = "IN_PROGRESS";
				}

				// 목표 검증 (추가)
				if (request.getGoal() == null
								|| request.getGoal().isBlank()
								|| request.getGoal().length() > 255) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"챌린지 목표는 1~255자로 입력해주세요.");
				}

				// 7. DB 저장값 구성
				Map<String, Object> params = new HashMap<>();

				params.put("adminCode", adminCode);
				params.put("adminId", adminId);
				params.put("title", request.getTitle().trim());
				params.put("content", request.getContent());
				params.put("startDate", request.getStartDate());
				params.put("endDate", request.getEndDate());
				params.put("postStatus", request.getPostStatus());
				params.put("progressStatus", progressStatus);
				params.put("pointEarned", request.getPointEarned());
				params.put("createdAt", now);
				params.put("goal", request.getGoal().trim());

				// 8. 등록
				int inserted = adminChallengeDao.createChallenge(params);

				if (inserted != 1 || params.get("code") == null) {
						throw new IllegalStateException(
										"챌린지 등록에 실패했습니다.");
				}

				// 9. DB에서 생성된 챌린지 번호 반환
				return ((Number) params.get("code")).longValue();
		}

				







        //관리자 회원 상세 - 회원 인증글 통계와 페이지 목록
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
                adminChallengeDao.loadMemberProofSummary(params);

        // 4. 공통 페이지 계산 기능 재사용
        Pager pager = new Pager(
                pageQuery, result.getTotalProofCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 5. 현재 페이지 인증글 목록
        List<UserFeedView> proofs =
                adminChallengeDao.loadMemberProofs(params);

        // 6. 통계 + 목록 + 페이지 정보 반환
        result.setProofs(PageResult.of(proofs, pager));

        return result;
        }

}