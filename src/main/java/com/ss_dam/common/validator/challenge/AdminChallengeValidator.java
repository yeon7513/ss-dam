package com.ss_dam.common.validator.challenge;

import java.time.LocalDate;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.request.AdminChallengeWriteRequest;

// Validator: 제목·내용 길이, 필수값, 날짜 순서, 페이지 범위, 번호가 양수인지, 허용된 상태값인지 검사

// DB 조회 검사 제외 -> ex) requireChallengeExists() 는 기존 AdminChallengeServiceImpl에 작성
// 각 서비스에 남기는 검증은 존재 여부, 수정·삭제·완료·복구 가능 상태, DB 저장 결과 검사

// AdminChallengeValidator: 검색 조건, 챌린지 번호, 제목·내용·목표·기간·공개 상태·포인트·정원, 복구 사유

@Component
public class AdminChallengeValidator {

    // 관리자 챌린지 검색 조건 검증 및 정리
    public void validateAndNormalizeSearch(AdminChallengeSearch search) {

        if (search == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "검색 조건이 필요합니다.");
        }

        // 빈 문자열은 필터 없음으로 처리
        String progressStatus = normalize(search.getProgressStatus());
        String postStatus = normalize(search.getPostStatus());
        String keyword = normalize(search.getKeyword());
        String sort = normalize(search.getSort());

        // 진행 상태 검증
        if (progressStatus != null
                && !Set.of("WAITING", "IN_PROGRESS", "ENDED")
                        .contains(progressStatus)) {

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

        // 검색어 길이 검증
        if (keyword != null && keyword.length() > 100) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "검색어는 100자 이내로 입력해주세요.");
        }

        // DB 날짜 범위와 종료일 다음 날 계산을 고려
        LocalDate minDate = LocalDate.of(1000, 1, 1);
        LocalDate maxDate = LocalDate.of(9999, 12, 30);

        LocalDate fromDate = search.getFromDate();
        LocalDate toDate = search.getToDate();

        if ((fromDate != null
                && (fromDate.isBefore(minDate) || fromDate.isAfter(maxDate)))
                || (toDate != null
                && (toDate.isBefore(minDate) || toDate.isAfter(maxDate)))) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "조회 날짜는 1000-01-01부터 9999-12-30까지 입력해주세요.");
        }

        if (fromDate != null
                && toDate != null
                && fromDate.isAfter(toDate)) {

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

        // 검증을 통과한 값으로 검색 조건 정리
        search.setProgressStatus(progressStatus);
        search.setPostStatus(postStatus);
        search.setKeyword(keyword);
        search.setSort(sort);
    }

    private String normalize(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }

    // 챌린지 번호 검증
public void validateCode(Long code) {

    if (code == null || code < 1) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "챌린지 번호는 1 이상이어야 합니다.");
    }
}

// 등록·수정 공통 입력값 검증
public void validateWriteRequest(AdminChallengeWriteRequest request) {

    if (request == null) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "챌린지 정보를 입력해주세요.");
    }

    validateRequiredText(
            request.getTitle(), 255,
            "제목은 1~255자로 입력해주세요.");

    validateRequiredText(
            request.getContent(), 4000,
            "내용은 1~4000자로 입력해주세요.");

    validateRequiredText(
            request.getGoal(), 255,
            "챌린지 목표는 1~255자로 입력해주세요.");

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

    if (request.getMaxParticipants() != null
            && request.getMaxParticipants() < 1) {

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "참여 정원은 1 이상이거나 제한 없음이어야 합니다.");
    }
}

// 복구 사유 검증
public void validateRestoreReason(String reason) {
    validateRequiredText(
            reason, 255,
            "복구 사유는 1~255자로 입력해주세요.");
}

private void validateRequiredText(
        String value, int maxLength, String message) {

    if (value == null
            || value.isBlank()
            || value.length() > maxLength) {

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, message);
    }
}
}