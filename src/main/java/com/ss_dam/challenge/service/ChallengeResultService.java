package com.ss_dam.challenge.service;

// ChallengeResultService는 챌린지 하나의 종료 결과를 계산해서 한 번만 저장하는 역할
/**
 * 기존 스케줄러가 종료된 챌린지 번호를 전달
 * 해당 챌린지 행을 잠가 동시 처리 방지
 * 이미 저장한 결과는 건너뜀
 * 요약·시간대·지역·순위를 한 트랜잭션으로 저장
 * 중간에 실패하면 전체 롤백
 */


public interface ChallengeResultService {

    /**
     * 챌린지 종료 결과를 계산하고 저장한다.
     *
     * @return true: 이번 호출에서 저장 완료
     *         false: 이미 저장됐거나 종료 처리 대상이 아님
     */
    boolean saveResult(Long challengeCode);
}