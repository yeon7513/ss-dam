package com.ss_dam.challenge.service;

import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.challenge.dao.UserChallengeDao;
import com.ss_dam.challenge.model.response.ChallengeWriteState;

/** ChallengeWriteGuard
 * 
 * WAITING도 허용 후보에 넣는 이유는 시작 직후 스케줄러가 아직 실행되지 않았을 수 있기 
 * 때문입니다. 실제 시작 전이면 날짜 검사에서 차단됩니다.
 * 
 * MANDATORY는 이 메서드를 참여·인증 저장 트랜잭션 안에서만 호출하도록 합니다. 
 * 검사와 저장 사이에 잠금이 풀리지 않게 하는 용도입니다.
 */


@Service
public class ChallengeWriteGuard {

	private final UserChallengeDao userChallengeDao;

	public ChallengeWriteGuard(UserChallengeDao userChallengeDao) {
		this.userChallengeDao = userChallengeDao;
	}

    @Transactional(propagation = Propagation.MANDATORY)
    public ChallengeWriteState checkAndLock(Long code) {

        if (code == null || code < 1) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "올바른 챌린지를 선택해주세요.");
        }

        // 행 잠금 후 최신 상태 확인
        ChallengeWriteState state =
                userChallengeDao.loadWriteStateForUpdate(code);

        if (state == null || state.isDeleteYn()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "존재하지 않거나 삭제된 챌린지입니다.");
        }

        if (!"ACTIVE".equals(state.getPostStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "비공개 챌린지입니다.");
        }

        // 종료 상태는 날짜와 무관하게 차단
        boolean eligibleStatus =
                "WAITING".equals(state.getProgressStatus())
                || "IN_PROGRESS".equals(state.getProgressStatus());

        if (!eligibleStatus) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "참여하거나 인증할 수 없는 챌린지 상태입니다.");
        }

        // 잠금을 얻은 뒤 현재 시각 계산
        LocalDateTime now =
                LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        if (state.getStartDate() == null
                || state.getEndDate() == null
                || now.isBefore(state.getStartDate())
                || !now.isBefore(state.getEndDate())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "챌린지 진행 기간이 아닙니다.");
        }

        return state;
    }
}