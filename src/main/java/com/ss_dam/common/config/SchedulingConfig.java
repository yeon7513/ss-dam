package com.ss_dam.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

//관리자 챌린지 진행현황 조회에서 시간에 따른 상태 자동 갱신을 위해 파일 생성

/*
 * 30초마다 날짜를 확인해 DB의 PROGRESS_STATUS를 변경
 * 다만 종료 직후 다음 갱신까지 최대 약 30초 동안 IN_PROGRESS가 남을 수 있습니다. 그래서
 * - 참여·인증 등록 서비스: 요청이 들어올 때마다 상태와 날짜를 검사해서, 종료 시간이 
 * 지났으면 등록을 거절합니다.
 * 이렇게 하면 목록 표시가 조금 늦어져도 종료 시간이 지난 뒤 신규 등록되는 것은 막을 수 있습니다. 
 
 * => 목록 표시: DB의 PROGRESS_STATUS 사용
   -> UserChallengeDao -> challenge.xml

 * => 참여·인증 등록 서비스 
 *  - ChallengeWriteGuard.checkAndLock() → 상태·날짜 검사
    - joinChallenge()에서 위 검사 호출 → 신규 참여 제한
    - registerFeed()에서 위 검사 호출 → 인증 등록 제한 
    -> UserChallengeServiceImpl,UserFeedServiceImpl
*/

@Configuration 
@EnableScheduling 
public class SchedulingConfig {
  
}
