package com.ss_dam.challenge.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.service.AdminActivityLogService;
import com.ss_dam.challenge.dao.AdminChallengeDao;
import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.request.AdminChallengeWriteRequest;
import com.ss_dam.challenge.model.response.AdminChallengeEditState;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.common.image.service.ImageService;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.common.validator.PageQueryValidator;
import com.ss_dam.common.validator.challenge.AdminChallengeValidator;

@Service
public class AdminChallengeServiceImpl implements AdminChallengeService {

	private final AdminChallengeDao adminChallengeDao;
	private final ImageService imageService;
	private final AdminChallengeValidator adminChallengeValidator;
	private final PageQueryValidator pageQueryValidator;
	private final AdminActivityLogService adminActivityLogService;

	public AdminChallengeServiceImpl (AdminChallengeDao adminChallengeDao, 
								ImageService imageService,
                AdminChallengeValidator adminChallengeValidator, 
                PageQueryValidator pageQueryValidator, 
                AdminActivityLogService adminActivityLogService) {
    this.adminChallengeDao = adminChallengeDao;
		this.imageService = imageService;
    this.adminChallengeValidator = adminChallengeValidator;
    this.pageQueryValidator = pageQueryValidator;
    this.adminActivityLogService = adminActivityLogService;
}
    // 챌린지 목록 조회
    @Override
    @Transactional(readOnly = true)
    public PageResult<AdminChallengeListView> loadChallenges(
            AdminChallengeSearch search) {

        pageQueryValidator.validate(search);
        adminChallengeValidator.validateAndNormalizeSearch(search);

        long total = adminChallengeDao.countChallenges(search);

        List<AdminChallengeListView> content =
                adminChallengeDao.loadChallenges(search);

        return PageResult.of(content, new Pager(search, total));
    }

    // 챌린지 등록 
    @Override
    @Transactional
    public Long registerChallenge(
            AdminChallengeWriteRequest request,
						List<MultipartFile> files,
            Long adminCode,
            String adminId) {

        adminChallengeValidator.validateWriteRequest(request);

        LocalDateTime now =
                LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        // 등록 시점의 진행 상태 계산
        String progressStatus;

        if (now.isBefore(request.getStartDate())) {
            progressStatus = "WAITING";
        } else if (!now.isBefore(request.getEndDate())) {
            progressStatus = "ENDED";
        } else {
            progressStatus = "IN_PROGRESS";
        }

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

				// 1. 챌린지 저장
        int inserted = adminChallengeDao.createChallenge(params);

        if (inserted != 1 || params.get("code") == null) {
            throw new IllegalStateException(
                    "챌린지 등록에 실패했습니다.");
        }

				// xml의 userGenertateKey로 params에 들어온 챌린지 코드
        Long challengeCode =
                ((Number) params.get("code")).longValue();

				// 2. 생성된 챌린지 코드에 이미지 연결
				if (files != null && !files.isEmpty()) {
					imageService.uploadImages(files, "challenge", challengeCode); 
				}

        // 3. 등록 이력 저장
        adminActivityLogService.recordActivity(
                adminCode,
                "challenge",
                challengeCode,
                "CREATE",
                "챌린지 등록: " + request.getTitle().trim(),
                now);

        return challengeCode;
    }

    // 챌린지 수정
    @Override
    @Transactional
    public void updateChallenge(
            Long code,
						AdminChallengeWriteRequest request,
						List<MultipartFile> files,
						boolean replaceImages,
						Long adminCode,
						String adminId) {

        adminChallengeValidator.validateCode(code);
        adminChallengeValidator.validateWriteRequest(request);

        // 수정할 행 조회 및 잠금
        AdminChallengeEditState existing =
                adminChallengeDao.loadChallengeForUpdate(code);

        if (existing == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않는 챌린지입니다.");
        }

        LocalDateTime now =
                LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        // 저장 상태와 실제 시작일을 함께 확인
        boolean beforeStart =
                "WAITING".equals(existing.getProgressStatus())
                        && existing.getStartDate() != null
                        && existing.getStartDate().isAfter(now);

			if (!replaceImages && files != null && !files.isEmpty()) {
					throw new ResponseStatusException(
									HttpStatus.BAD_REQUEST,
									"이미지 변경 여부를 확인해주세요.");
			}


        if (beforeStart) {

            // 시작 전에는 기간 변경 가능
            if (!request.getStartDate().isAfter(now)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "시작일시는 현재 시각보다 이후여야 합니다.");
            }

        } else {

            // 시작 후에는 제목·내용·공개 여부만 수정 가능
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

        Map<String, Object> params = new HashMap<>();

        params.put("code", code);
        params.put("title", request.getTitle().trim());
        params.put("content", request.getContent());
        params.put("postStatus", request.getPostStatus());
        params.put("adminId", adminId);
        params.put("updatedAt", now);

        // 변경 가능 범위는 서버에서 결정
        params.put("beforeStart", beforeStart);

        params.put("goal", request.getGoal().trim());
        params.put("pointEarned", request.getPointEarned());
        params.put("startDate", request.getStartDate());
        params.put("endDate", request.getEndDate());
        params.put("maxParticipants", request.getMaxParticipants());

        adminChallengeDao.updateChallenge(params);

			// 이미지 변경을 선택한 경우에만 실행
			if (replaceImages) {
					// 기존 이미지 논리 삭제
					adminChallengeDao.deleteChallengeImages(code);

					// 새 이미지 저장
					if (files != null && !files.isEmpty()) {
							imageService.uploadImages(files, "challenge", code);
					}
			}

			// 기존 활동 이력 저장 코드 유지
			adminActivityLogService.recordActivity(
							adminCode,
							"challenge",
							code,
							"UPDATE",
							"챌린지 수정 요청 처리: " + request.getTitle().trim(),
							now);

        // 기존 동작 유지: 동일 값 수정 요청도 처리 이력 기록
        adminActivityLogService.recordActivity(
                adminCode,
                "challenge",
                code,
                "UPDATE",
                "챌린지 수정 요청 처리: " + request.getTitle().trim(),
                now);
    }

    // 챌린지 논리 삭제
    @Override
    @Transactional
    public void deleteChallenge(
            Long code,
            Long adminCode,
            String adminId) {

        adminChallengeValidator.validateCode(code);

        // 존재 여부 확인 및 행 잠금
        AdminChallengeEditState existing =
                adminChallengeDao.loadChallengeForUpdate(code);

        if (existing == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않거나 이미 삭제된 챌린지입니다.");
        }

        // 현재 참여자 수가 아닌 전체 참여·인증 이력으로 삭제 제한
        if (adminChallengeDao.hasChallengeHistory(code)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "참여 이력이나 인증글이 있는 챌린지는 삭제할 수 없습니다.");
        }

        LocalDateTime now =
                LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("adminId", adminId);
        params.put("updatedAt", now);

        int deleted = adminChallengeDao.deleteChallenge(params);

        if (deleted != 1) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "삭제할 수 없는 상태입니다. 다시 조회해주세요.");
        }

        adminActivityLogService.recordActivity(
                adminCode,
                "challenge",
                code,
                "DELETE",
                "챌린지 논리 삭제",
                now);
    }

    // 챌린지 조기 완료
    @Override
    @Transactional
    public void endChallenge(
            Long code,
            Long adminCode,
            String adminId) {

        adminChallengeValidator.validateCode(code);

        // 삭제되지 않은 챌린지 조회 및 행 잠금
        AdminChallengeEditState existing =
                adminChallengeDao.loadChallengeForUpdate(code);

        if (existing == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않거나 삭제된 챌린지입니다.");
        }

        LocalDateTime now =
                LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        boolean withinPeriod =
                existing.getStartDate() != null
                        && existing.getEndDate() != null
                        && !now.isBefore(existing.getStartDate())
                        && now.isBefore(existing.getEndDate());

        // 상태 갱신 전인 WAITING도 실제 진행 기간으로 판단
        boolean eligibleStatus =
                "IN_PROGRESS".equals(existing.getProgressStatus())
                        || "WAITING".equals(existing.getProgressStatus());

        if (!withinPeriod || !eligibleStatus) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "현재 진행 기간인 챌린지만 조기 완료할 수 있습니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("adminId", adminId);
        params.put("endedAt", now);

        int updated = adminChallengeDao.endChallenge(params);

        if (updated != 1) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "조기 완료할 수 없는 상태입니다. 다시 조회해주세요.");
        }

        adminActivityLogService.recordActivity(
                adminCode,
                "challenge",
                code,
                "EARLY_END",
                "챌린지 조기 완료"
                        + " / 기존 종료일시: " + existing.getEndDate()
                        + " / 처리 일시: " + now,
                now);
    }

    // 삭제된 챌린지 복구
    @Override
    @Transactional
    public void restoreChallenge(
            Long code,
            String reason,
            Long adminCode,
            String adminId) {

        adminChallengeValidator.validateCode(code);
        adminChallengeValidator.validateRestoreReason(reason);

        // 삭제된 챌린지도 조회하고 행 잠금
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

        int updated = adminChallengeDao.restoreChallenge(params);

        if (updated != 1) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "복구할 수 없는 상태입니다. 다시 조회해주세요.");
        }

        adminActivityLogService.recordActivity(
                adminCode,
                "challenge",
                code,
                "RESTORE",
                reason.trim(),
                now);
    }
}