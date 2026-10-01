package com.ss_dam.challenge.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.dao.AdminActivityLogDao;
import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.challenge.dao.AdminChallengeDao;
import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.request.AdminChallengeWriteRequest;
import com.ss_dam.challenge.model.response.AdminChallengeDetailView;
import com.ss_dam.challenge.model.response.AdminChallengeEditState;
import com.ss_dam.challenge.model.response.AdminChallengeHourlyCount;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.challenge.model.response.AdminChallengeParticipantView;
import com.ss_dam.challenge.model.response.AdminChallengeRankingView;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView.HourPoint;
import com.ss_dam.challenge.model.response.AdminChallengeStatisticsView.Metric;
import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.common.image.service.ImageService;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.response.UserFeedView;

@Service
public class AdminChallengeServiceImpl implements AdminChallengeService {

    @Autowired
    private AdminChallengeDao adminChallengeDao;

		@Autowired
		private ImageService imageService;

    @Autowired
    private AdminMemberDao adminMemberDao;

		@Autowired
		private AdminActivityLogDao adminActivityLogDao; 		// 관리자 처리 이력 저장

	// 관리자 챌린지 목록 검색 조건 검증
	private void validateChallengeSearch(AdminChallengeSearch search) {

			// 빈 문자열은 필터 없음으로 처리
			String progressStatus =
							normalizeChallengeSearchValue(search.getProgressStatus());

			String postStatus =
							normalizeChallengeSearchValue(search.getPostStatus());

			String keyword =
							normalizeChallengeSearchValue(search.getKeyword());

			String sort =
							normalizeChallengeSearchValue(search.getSort());

			// 진행 상태 검증
			if (progressStatus != null
							&& !Set.of(
											"WAITING",
											"IN_PROGRESS",
											"ENDED"
							).contains(progressStatus)) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"진행 상태는 WAITING, IN_PROGRESS, ENDED 중 하나여야 합니다.");
			}

			// 공개 상태 검증
			if (postStatus != null
							&& !Set.of("ACTIVE", "PRIVATE").contains(postStatus)) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"공개 상태는 ACTIVE 또는 PRIVATE여야 합니다.");
			}

			// 검색어 길이 제한
			if (keyword != null && keyword.length() > 100) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"검색어는 100자 이내로 입력해주세요.");
			}

			// 날짜 범위 검증
			// DB 날짜 범위와 종료일 다음 날 계산을 고려
			LocalDate minDate = LocalDate.of(1000, 1, 1);
			LocalDate maxDate = LocalDate.of(9999, 12, 30);

			if ((search.getFromDate() != null
							&& (search.getFromDate().isBefore(minDate)
									|| search.getFromDate().isAfter(maxDate)))
							|| (search.getToDate() != null
							&& (search.getToDate().isBefore(minDate)
									|| search.getToDate().isAfter(maxDate)))) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"조회 날짜는 1000-01-01부터 9999-12-30까지 입력해주세요.");
			}

			if (search.getFromDate() != null
							&& search.getToDate() != null
							&& search.getFromDate().isAfter(search.getToDate())) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"조회 시작일은 종료일보다 늦을 수 없습니다.");
			}

			// 정렬값이 없으면 최신순
			if (sort == null) {
					sort = "LATEST";
			}

			if (!Set.of(
							"LATEST",
							"PARTICIPANTS_DESC",
							"PARTICIPANTS_ASC",
							"ACHIEVEMENT_DESC",
							"ACHIEVEMENT_ASC"
			).contains(sort)) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"지원하지 않는 정렬 방식입니다.");
			}

			search.setProgressStatus(progressStatus);
			search.setPostStatus(postStatus);
			search.setKeyword(keyword);
			search.setSort(sort);
	}


	// 검색 조건의 앞뒤 공백 제거
	private String normalizeChallengeSearchValue(String value) {

			if (value == null || value.isBlank()) {
					return null;
			}

			return value.trim();
	}



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

					// 검색 조건 검증 및 공백 정리
					validateChallengeSearch(search);


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
						AdminChallengeWriteRequest request,
						MultipartFile image,
						Long adminCode,
						String adminId) {

				// 첨부한 이미지 검증
				validateChallengeImage(image);

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

				// 참여 정원 검증 (추가)
				if (request.getMaxParticipants() != null
								&& request.getMaxParticipants() < 1) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"참여 정원은 1 이상이거나 제한 없음이어야 합니다.");
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
				params.put("maxParticipants", request.getMaxParticipants());

				// 8. 챌린지 등록
				int inserted = adminChallengeDao.createChallenge(params);

				if (inserted != 1 || params.get("code") == null) {
						throw new IllegalStateException(
										"챌린지 등록에 실패했습니다.");
				}

				// 9. 생성된 챌린지 번호
				Long challengeCode =
								((Number) params.get("code")).longValue();

				// 10. 등록 이력 구성
				Map<String, Object> logParams = new HashMap<>();

				logParams.put("adminCode", adminCode);
				logParams.put("targetType", "challenge");
				logParams.put("targetCode", challengeCode);
				logParams.put("processType", "CREATE");
				logParams.put(
								"memo",
								"챌린지 등록: " + request.getTitle().trim());
				logParams.put("createdAt", now);

				// 11. 등록 이력 저장
				int logInserted =
								adminActivityLogDao.insertActivityLog(logParams);

				if (logInserted != 1) {
						throw new IllegalStateException(
										"챌린지 등록 이력 저장에 실패했습니다.");
				}

				// 추가: 공통 이미지 서비스를 통해 대표 이미지 저장
				if (image != null) {
						imageService.uploadSingleImage(
										image, "challenge", challengeCode);
				}


				// 12. 생성된 번호 반환
				return challengeCode;
		}

	
	// 관리자 챌린지 수정	
	@Override
	@Transactional
	public void updateChallenge(
					Long code,
					AdminChallengeWriteRequest request,
					MultipartFile image,
					boolean removeImage,
					Long adminCode,
					String adminId) {

			// 추가: 첨부한 이미지 검증
			validateChallengeImage(image);

			// 추가: 교체와 제거 동시 요청 제한
			if (image != null && removeImage) {
					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"이미지 교체와 제거를 동시에 요청할 수 없습니다.");
			}

			// 1. 챌린지 번호 검증
			if (code == null || code < 1) {
					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"챌린지 번호는 1 이상이어야 합니다.");
			}

			// 2. 참여 정원 검증 (null은 허용하고, 0과 음수는 거절)
			if (request.getMaxParticipants() != null
							&& request.getMaxParticipants() < 1) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"참여 정원은 1 이상이거나 제한 없음이어야 합니다.");
			}

			if (request.getTitle() == null
							|| request.getTitle().isBlank()
							|| request.getTitle().length() > 255) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"제목은 1~255자로 입력해주세요.");
			}

			if (request.getContent() == null
							|| request.getContent().isBlank()
							|| request.getContent().length() > 4000) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"내용은 1~4000자로 입력해주세요.");
			}

			if (request.getGoal() == null
							|| request.getGoal().isBlank()
							|| request.getGoal().length() > 255) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"목표는 1~255자로 입력해주세요.");
			}

			if (request.getStartDate() == null
							|| request.getEndDate() == null
							|| !request.getEndDate().isAfter(request.getStartDate())) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"종료일시는 시작일시보다 뒤여야 합니다.");
			}

			if (!"ACTIVE".equals(request.getPostStatus())
							&& !"PRIVATE".equals(request.getPostStatus())) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"공개 상태는 ACTIVE 또는 PRIVATE여야 합니다.");
			}

			if (request.getPointEarned() == null
							|| request.getPointEarned() < 0) {

					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"보상 포인트는 0 이상이어야 합니다.");
			}

			// 3. 수정할 행 조회 및 잠금
			// 트랜잭션이 끝날 때까지 다른 UPDATE와 순서를 맞춤
			AdminChallengeEditState existing =
							adminChallengeDao.loadChallengeForUpdate(code);

			if (existing == null) {
					throw new ResponseStatusException(
									HttpStatus.NOT_FOUND,
									"존재하지 않는 챌린지입니다.");
			}

			LocalDateTime now =
							LocalDateTime.now(ZoneId.of("Asia/Seoul"));

			// 4. 저장 상태와 실제 시작일을 함께 확인
			boolean beforeStart =
							"WAITING".equals(existing.getProgressStatus())
							&& existing.getStartDate() != null
							&& existing.getStartDate().isAfter(now);

			if (beforeStart) {

					// 시작 전에는 기간 변경 가능
					if (!request.getStartDate().isAfter(now)) {
							throw new ResponseStatusException(
											HttpStatus.BAD_REQUEST,
											"시작일시는 현재 시각보다 이후여야 합니다.");
					}

			} else {

					// 진행 중·종료 후에는 목표·보상·기간 변경 금지 
					// 시작 전에만 변경 가능
					boolean conditionsChanged =
						!Objects.equals(
										existing.getGoal(),
										request.getGoal())
						|| !Objects.equals(
										existing.getPointEarned(),
										request.getPointEarned())
						|| !Objects.equals(
										existing.getStartDate(),
										request.getStartDate())
						|| !Objects.equals(
										existing.getEndDate(),
										request.getEndDate())
						|| !Objects.equals(
										existing.getMaxParticipants(),
										request.getMaxParticipants());

					if (conditionsChanged) {
							throw new ResponseStatusException(
											HttpStatus.CONFLICT,
											"시작 전이 아닌 챌린지는 "
															+ "제목·내용·공개 여부만 수정할 수 있습니다.");
					}
			}

			// 5. 수정값 구성
			Map<String, Object> params = new HashMap<>();

			params.put("code", code);
			params.put("title", request.getTitle().trim());
			params.put("content", request.getContent());
			params.put("postStatus", request.getPostStatus());
			params.put("adminId", adminId);
			params.put("updatedAt", now);

			// 클라이언트가 아닌 서버에서 결정하는 값
			params.put("beforeStart", beforeStart);

			params.put("goal", request.getGoal().trim());
			params.put("pointEarned", request.getPointEarned());
			params.put("startDate", request.getStartDate());
			params.put("endDate", request.getEndDate());

			// 6. 수정 처리
			adminChallengeDao.updateChallenge(params);

			// 7. 수정 이력 저장
			// 동일 값으로 요청해도 성공 처리하므로 이력 기록, 변경 전후 값까지 저장하는 코드는 아님
			// 누가 언제 수정 요청을 처리했는지 기록
			Map<String, Object> logParams = new HashMap<>();

			logParams.put("adminCode", adminCode);
			logParams.put("targetType", "challenge");
			logParams.put("targetCode", code);
			logParams.put("processType", "UPDATE");
			logParams.put(
							"memo",
							"챌린지 수정 요청 처리: " + request.getTitle().trim());
			logParams.put("createdAt", now);

			int logInserted =
							adminActivityLogDao.insertActivityLog(logParams);

			if (logInserted != 1) {
					throw new IllegalStateException(
									"챌린지 수정 이력 저장에 실패했습니다.");
			}

			// 추가: 대표 이미지 교체 또는 제거
			if (image != null || removeImage) {

					List<MultipartFile> newImages =
									image == null ? List.of() : List.of(image);

					List<Integer> newOrders =
									image == null ? List.of() : List.of(1);

					// 기존 대표 이미지는 남기지 않고 교체 또는 제거
					List<String> remainingImagePaths = List.of();
					List<Integer> remainingImageOrders = List.of();

					imageService.updateImages(
									code,
									"challenge",
									newImages,
									newOrders,
									remainingImagePaths,
									remainingImageOrders);
			}
	}

	// 관리자 챌린지 논리 삭제
	// 취소한 참여 기록이나 삭제된 인증글도 이력으로 보고 삭제를 제한.
	// 현재 참여자 수가 0명이라는 이유만으로 삭제 X
	@Override
	@Transactional
	public void deleteChallenge(
					Long code,
					Long adminCode,
					String adminId) {

			// 1. 번호 검증
			if (code == null || code < 1) {
					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"챌린지 번호는 1 이상이어야 합니다.");
			}

			// 2. 존재 여부 확인 및 행 잠금
			AdminChallengeEditState existing =
							adminChallengeDao.loadChallengeForUpdate(code);

			if (existing == null) {
					throw new ResponseStatusException(
									HttpStatus.NOT_FOUND,
									"존재하지 않거나 이미 삭제된 챌린지입니다.");
			}

			// 3. 참여 이력 또는 인증글 확인
			boolean hasHistory =
							adminChallengeDao.hasChallengeHistory(code);

			if (hasHistory) {
					throw new ResponseStatusException(
									HttpStatus.CONFLICT,
									"참여 이력이나 인증글이 있는 챌린지는 삭제할 수 없습니다.");
			}

			// 4. 삭제 처리 정보
			LocalDateTime now =
							LocalDateTime.now(ZoneId.of("Asia/Seoul"));

			Map<String, Object> params = new HashMap<>();

			params.put("code", code);
			params.put("adminId", adminId);
			params.put("updatedAt", now);

			// 5. 논리 삭제
			int deleted = adminChallengeDao.deleteChallenge(params);

			if (deleted != 1) {
					throw new ResponseStatusException(
									HttpStatus.CONFLICT,
									"삭제할 수 없는 상태입니다. 다시 조회해주세요.");
			}

			// 6. 삭제 이력 저장
			Map<String, Object> logParams = new HashMap<>();

			logParams.put("adminCode", adminCode);
			logParams.put("targetType", "challenge");
			logParams.put("targetCode", code);
			logParams.put("processType", "DELETE");
			logParams.put("memo", "챌린지 논리 삭제");
			logParams.put("createdAt", now);

			int logInserted =
							adminActivityLogDao.insertActivityLog(logParams);

			if (logInserted != 1) {
					throw new IllegalStateException(
									"챌린지 삭제 이력 저장에 실패했습니다.");
			}
	}

		// 관리자 챌린지 조기 완료
		@Override
		@Transactional
		public void endChallenge(
						Long code,
						Long adminCode,
						String adminId) {

				// 1. 번호 검증
				if (code == null || code < 1) {
						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"챌린지 번호는 1 이상이어야 합니다.");
				}

				// 2. 존재 여부 확인 및 행 잠금
				// 기존 SQL에서 삭제되지 않은 챌린지만 조회
				AdminChallengeEditState existing =
								adminChallengeDao.loadChallengeForUpdate(code);

				if (existing == null) {
						throw new ResponseStatusException(
										HttpStatus.NOT_FOUND,
										"존재하지 않거나 삭제된 챌린지입니다.");
				}

				LocalDateTime now =
								LocalDateTime.now(ZoneId.of("Asia/Seoul"));

				// 3. 실제 진행 기간 확인
				boolean withinPeriod =
								existing.getStartDate() != null
								&& existing.getEndDate() != null
								&& !now.isBefore(existing.getStartDate())
								&& now.isBefore(existing.getEndDate());

				// 자동 상태 갱신이 아직 없으므로
				// 시작 시간이 지난 WAITING도 실제 기간으로 판단
				boolean eligibleStatus =
								"IN_PROGRESS".equals(existing.getProgressStatus())
								|| "WAITING".equals(existing.getProgressStatus());

				if (!withinPeriod || !eligibleStatus) {
						throw new ResponseStatusException(
										HttpStatus.CONFLICT,
										"현재 진행 기간인 챌린지만 조기 완료할 수 있습니다.");
				}

				// 4. 종료 처리 정보
				Map<String, Object> params = new HashMap<>();

				params.put("code", code);
				params.put("adminId", adminId);
				params.put("endedAt", now);

				// 5. 조기 완료 처리
				int updated = adminChallengeDao.endChallenge(params);

				if (updated != 1) {
						throw new ResponseStatusException(
										HttpStatus.CONFLICT,
										"조기 완료할 수 없는 상태입니다. 다시 조회해주세요.");
				}

				// 6. 처리 이력 구성
				Map<String, Object> logParams = new HashMap<>();

				logParams.put("adminCode", adminCode);
				logParams.put("targetType", "challenge");
				logParams.put("targetCode", code);
				logParams.put("processType", "EARLY_END");
				logParams.put(
								"memo",
								"챌린지 조기 완료"
												+ " / 기존 종료일시: " + existing.getEndDate()
												+ " / 처리 일시: " + now);
				logParams.put("createdAt", now);

				// 7. 처리 이력 저장
				int logInserted =
								adminActivityLogDao.insertActivityLog(logParams);

				if (logInserted != 1) {
						throw new IllegalStateException(
										"챌린지 조기 완료 이력 저장에 실패했습니다.");
				}
		}

		// 삭제된 챌린지 복구
		@Override
		@Transactional
		public void restoreChallenge(
						Long code,
						String reason,
						Long adminCode,
						String adminId) {

				validateChallengeCode(code);

				// 컨트롤러 검증과 별도로 서비스에서도 처리 사유 확인
				if (reason == null
								|| reason.isBlank()
								|| reason.length() > 255) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"복구 사유는 1~255자로 입력해주세요.");
				}

				// 삭제된 챌린지도 조회하고, 복구가 끝날 때까지 행 잠금
				Integer deleteYn =
								adminChallengeDao.loadDeleteYnForUpdate(code);

				if (deleteYn == null) {
						throw new ResponseStatusException(
										HttpStatus.NOT_FOUND,
										"존재하지 않는 챌린지입니다.");
				}

				if (deleteYn != 1) {
						throw new ResponseStatusException(
										HttpStatus.CONFLICT,
										"삭제된 챌린지만 복구할 수 있습니다.");
				}

				LocalDateTime now =
								LocalDateTime.now(ZoneId.of("Asia/Seoul"));

				Map<String, Object> params = new HashMap<>();
				params.put("code", code);
				params.put("adminId", adminId);
				params.put("updatedAt", now);

				// 공개 범위를 유지하면서 삭제 여부 복구
				int updated = adminChallengeDao.restoreChallenge(params);

				if (updated != 1) {
						throw new ResponseStatusException(
										HttpStatus.CONFLICT,
										"복구할 수 없는 상태입니다. 다시 조회해주세요.");
				}

				// 기존 관리자 처리 이력 저장 기능 재사용
				Map<String, Object> logParams = new HashMap<>();
				logParams.put("adminCode", adminCode);
				logParams.put("targetType", "challenge");
				logParams.put("targetCode", code);
				logParams.put("processType", "RESTORE");
				logParams.put("memo", reason.trim());
				logParams.put("createdAt", now);

				int inserted =
								adminActivityLogDao.insertActivityLog(logParams);

				// 예외가 발생하면 챌린지 복구도 함께 롤백
				if (inserted != 1) {
						throw new IllegalStateException(
										"챌린지 복구 이력 저장에 실패했습니다.");
				}
		}


		// 챌린지 참여자 목록 조회
		@Override
		@Transactional(readOnly = true)
		public PageResult<AdminChallengeParticipantView> loadParticipants(
						Long code,
						PageQuery pageQuery) {

				validateChallengeCode(code);
				validateChallengePageQuery(pageQuery);
				requireChallengeExists(code);

				Map<String, Object> params =
								createChallengePageParams(code, pageQuery);

				// 전체 참여 회원 수
				long total = adminChallengeDao.countParticipants(params);

				// 현재 페이지 참여자 목록
				List<AdminChallengeParticipantView> content =
								adminChallengeDao.loadParticipants(params);

				return PageResult.of(
								content,
								new Pager(pageQuery, total));
		}


		// 챌린지 관리 처리 이력 조회
		@Override
		@Transactional(readOnly = true)
		public PageResult<AdminActivity> loadChallengeLogs(
						Long code,
						PageQuery pageQuery) {

				validateChallengeCode(code);
				validateChallengePageQuery(pageQuery);

				// 삭제된 챌린지의 처리 이력도 조회할 수 있도록 확인
				requireChallengeExists(code);

				Map<String, Object> params =
								createChallengePageParams(code, pageQuery);

				long total = adminChallengeDao.countChallengeLogs(params);

				List<AdminActivity> content =
								adminChallengeDao.loadChallengeLogs(params);

				return PageResult.of(
								content,
								new Pager(pageQuery, total));
		}


		// 챌린지 번호 검증
		private void validateChallengeCode(Long code) {

				if (code == null || code < 1) {
						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"챌린지 번호는 1 이상이어야 합니다.");
				}
		}


		// 삭제 여부와 관계없이 챌린지 존재 확인
		private void requireChallengeExists(Long code) {

				if (!adminChallengeDao.existsChallengeIncludingDeleted(code)) {
						throw new ResponseStatusException(
										HttpStatus.NOT_FOUND,
										"존재하지 않는 챌린지입니다.");
				}
		}


		// 참여자·처리 이력 조회에서 공통으로 사용하는 페이지 검증
		private void validateChallengePageQuery(PageQuery pageQuery) {

				if (pageQuery == null
								|| pageQuery.getPage() < 1
								|| pageQuery.getPerPage() < 1
								|| pageQuery.getPerPage() > 100
								|| pageQuery.getPerGroup() < 1
								|| pageQuery.getPerGroup() > 10) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"page는 1 이상, perPage는 1~100, "
														+ "perGroup은 1~10이어야 합니다.");
				}

				long offset =
								((long) pageQuery.getPage() - 1)
												* pageQuery.getPerPage();

				if (offset > Integer.MAX_VALUE) {
						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"조회 가능한 페이지 범위를 초과했습니다.");
				}
		}


// 참여자·처리 이력 조회에 전달할 공통 파라미터
private Map<String, Object> createChallengePageParams(
        Long code,
        PageQuery pageQuery) {

    Map<String, Object> params = new HashMap<>();
    params.put("code", code);
    params.put("offset", pageQuery.getOffset());
    params.put("perPage", pageQuery.getPerPage());

    return params;
}

		// 관리자 챌린지 상세 통계 조회
		@Override
		@Transactional(readOnly = true)
		public AdminChallengeStatisticsView loadChallengeStatistics(Long code) {

				validateChallengeCode(code);
				requireChallengeExists(code);

				// 모든 조회에 동일한 기준 시각 사용
				LocalDateTime now =
								LocalDateTime.now(ZoneId.of("Asia/Seoul"))
												.withNano(0);

				LocalDateTime todayStart =
								now.toLocalDate().atStartOfDay();

				LocalDateTime yesterdayStart =
								todayStart.minusDays(1);

				// 어제 같은 시각까지 비교
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

				// 1. 신규 인증글 수
				long todayProofs =
								adminChallengeDao.countNewChallengeProofs(todayParams);

				long yesterdayProofs =
								adminChallengeDao.countNewChallengeProofs(yesterdayParams);

				// 2. 신규 참여자 수
				long todayParticipants =
								adminChallengeDao.countNewChallengeParticipants(todayParams);

				long yesterdayParticipants =
								adminChallengeDao.countNewChallengeParticipants(yesterdayParams);

				// 3. 어제 하루 전체 + 오늘 현재까지의 시간별 참여자 조회
				Map<String, Object> graphParams = Map.of(
								"code", code,
								"yesterdayStart", yesterdayStart,
								"todayStart", todayStart,
								"now", now);

				List<AdminChallengeHourlyCount> rows =
								adminChallengeDao.loadChallengeHourlyParticipants(graphParams);

				// SQL 결과에 없는 시간도 0으로 채우기
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

						// 미래 시간은 0명이 아니라 아직 집계하지 않은 상태
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
												calculateChallengeChangeRate(
																todayProofs, yesterdayProofs)),
								new Metric(
												todayParticipants,
												yesterdayParticipants,
												calculateChallengeChangeRate(
																todayParticipants, yesterdayParticipants)),
								graph);
		}


		// 이전 기간 대비 증감률 계산
		private BigDecimal calculateChallengeChangeRate(
						long current,
						long previous) {

				// 둘 다 0이면 변화 없음
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

		// 관리자 챌린지 참여 순위 조회
		@Override
		@Transactional(readOnly = true)
		public PageResult<AdminChallengeRankingView> loadChallengeRanking(
						Long code,
						PageQuery pageQuery) {

				// 기존 공통 검증 메서드 재사용
				validateChallengeCode(code);
				validateChallengePageQuery(pageQuery);
				requireChallengeExists(code);

				Map<String, Object> params =
								createChallengePageParams(code, pageQuery);

				params.put(
								"now",
								LocalDateTime.now(ZoneId.of("Asia/Seoul")));

				// 기존 참여자 전체 건수 조회 재사용
				// 순위 SQL과 동일한 참여자 조건을 사용
				long total = adminChallengeDao.countParticipants(params);

				List<AdminChallengeRankingView> content =
								adminChallengeDao.loadChallengeRanking(params);

				return PageResult.of(
								content,
								new Pager(pageQuery, total));
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


		// 챌린지 대표 이미지 기본 검증
		private void validateChallengeImage(MultipartFile image) {

				// 파일을 보내지 않으면 변경 없음
				if (image == null) {
						return;
				}

				if (image.isEmpty()) {
						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"빈 이미지 파일은 업로드할 수 없습니다.");
				}

				if (image.getSize() > 5L * 1024 * 1024) {
						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"이미지는 5MB 이하로 업로드해주세요.");
				}

				String contentType = image.getContentType();

				if (!"image/jpeg".equalsIgnoreCase(contentType)
								&& !"image/png".equalsIgnoreCase(contentType)) {

						throw new ResponseStatusException(
										HttpStatus.BAD_REQUEST,
										"JPG 또는 PNG 이미지만 업로드해주세요.");
				}
		}

} 

