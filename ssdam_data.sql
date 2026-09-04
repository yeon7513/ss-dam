-- Reordered to match the supplied schema.sql (UTF-8).
-- Run schema.sql in database team2 first, then run this file once.
-- Requires empty tables and AUTO_INCREMENT starting at 1.
-- Original row order and omitted CODE columns are preserved.
-- CHALLENGE.PROGRESS_STATUS renamed to PROCESS_STATUS.
-- Four rows referencing missing FEED 10 are preserved as comments below.
-- No table deletion, truncation, or disabling of foreign keys.

SET NAMES utf8mb4;
START TRANSACTION;

-- MEMBER_ACCOUNT
INSERT INTO team2.`MEMBER_ACCOUNT` (`ID`, `PASSWORD`, `NAME`, `PHONE`, `ADDRESS`, `RATING`, `RANKING`, `POINT`, `STATUS`, `CREATED_AT`, `UPDATED_AT`, `LOGGED_AT`, `DELETE_YN`) VALUES
    ('user01', '1234', '김민수', '010-1111-2222', '서울시 강남구 역삼동', 3, 3, 1500, 'ACTIVE', '2025-01-10 10:00:00', NULL, '2026-06-25 09:00:00', 0),
    ('user02', '1234', '이영희', '010-2222-3333', '부산시 해운대구 우동', 2, 12, 500, 'ACTIVE', '2025-03-15 14:20:00', '2025-05-01 11:00:00', '2026-06-26 14:15:00', 0),
    ('user03', '1234', '박철수', '010-3333-4444', '대구시 수성구 범어동', 1, 45, 120, 'SLEEP', '2024-05-20 09:30:00', NULL, '2025-01-15 18:00:00', 0),
    ('user04', '1234', '최지우', '010-4444-5555', '인천시 부평구 부평동', 4, 1, 5000, 'ACTIVE', '2025-10-01 18:15:00', NULL, NULL, 0),
    ('user05', '1234', '정대만', '010-5555-6666', '광주시 북구 용봉동', 2, 20, 0, 'WITHDRAW', '2023-11-05 13:00:00', '2025-02-28 15:30:00', '2025-02-28 15:25:00', 1);

-- ADMIN_ACCOUNT
INSERT INTO team2.`ADMIN_ACCOUNT` (`ADM_CODE`, `EMP_ID`, `PASSWORD`, `NAME`, `PHONE`, `DEPT`, `ROLE`, `CREATED_AT`, `UPDATED_AT`, `LOGGED_AT`, `DELETE_YN`) VALUES
    (NULL, 'admin1', '1234', '최고관리자', '010-9999-9999', 'OPERATION', 'ROLE_SUPER', '2023-01-01 09:00:00', NULL, '2023-10-25 08:30:00', 0),
    (NULL, 'admin2', '1234', '홍길동', '010-1234-5678', 'PLANNING', 'ROLE_MANAGER', '2023-02-15 10:30:00', '2023-03-01 11:00:00', '2023-10-26 09:15:00', 0),
    (1, 'admin3', '1234', '김철수', '010-2345-6789', 'OPERATION', 'ROLE_MANAGER', '2023-05-20 14:00:00', NULL, NULL, 0),
    (2, 'admin4', '1234', '이영희', '010-3456-7890', 'PLANNING', 'ROLE_MANAGER', '2023-07-11 09:30:00', '2023-08-15 10:20:00', '2023-10-24 17:45:00', 0),
    (1, 'admin5', '1234', '박민수', '010-4567-8901', 'OPERATION', 'ROLE_STAFF', '2024-11-05 13:20:00', '2025-01-10 15:00:00', '2025-02-28 18:00:00', 1);

-- MARKET_CATEGORY
INSERT INTO team2.`MARKET_CATEGORY` (`MAIN_CATE`, `NAME`, `STATUS`, `CREATED_BY`, `CREATED_AT`, `UPDATED_BY`, `UPDATED_AT`, `DELETE_YN`) VALUES
    (NULL, '스포츠 의류/잡화', 'ACTIVE', 'admin1', '2026-01-10 10:00:00', NULL, NULL, 0),
    (NULL, '건강식단/다이어트', 'ACTIVE', 'admin1', '2026-01-10 10:05:00', NULL, NULL, 0),
    (NULL, '홈트레이닝/기구', 'ACTIVE', 'admin3', '2026-01-12 14:00:00', NULL, NULL, 0),
    (NULL, '라이프/건강식품', 'BLINDED', 'admin3', '2026-01-12 14:10:00', NULL, NULL, 0),
    (1, '남성 스포츠웨어', 'ACTIVE', 'admin1', '2026-01-10 11:00:00', NULL, NULL, 0),
    (1, '여성 스포츠웨어', 'ACTIVE', 'admin1', '2026-01-10 11:15:00', NULL, NULL, 0),
    (1, '보호대/스포츠양말', 'ACTIVE', 'admin1', '2026-01-10 11:20:00', NULL, NULL, 0),
    (2, '닭가슴살/도시락', 'ACTIVE', 'admin1', '2026-01-11 09:00:00', NULL, NULL, 0),
    (2, '단백질 쉐이크/바', 'ACTIVE', 'admin1', '2026-01-11 09:15:00', NULL, NULL, 1),
    (2, '샐러드/저당소스', 'ACTIVE', 'admin3', '2026-01-12 15:30:00', NULL, NULL, 0),
    (3, '요가매트/폼롤러', 'ACTIVE', 'admin3', '2026-01-12 16:00:00', NULL, NULL, 0),
    (3, '스트레칭 밴드/소도구', 'ACTIVE', 'admin3', '2026-01-12 16:15:00', NULL, NULL, 0),
    (3, '스쿼트머신/치닝디핑', 'ACTIVE', 'admin3', '2026-01-12 16:30:00', NULL, NULL, 0),
    (4, '종합비타민/미네랄', 'ACTIVE', 'admin3', '2026-01-13 10:00:00', NULL, NULL, 0),
    (4, '오메가3/유산균', 'ACTIVE', 'admin3', '2026-01-13 10:15:00', NULL, NULL, 0),
    (4, '임시 삭제 카테고리', 'DELETED', 'admin1', '2026-01-13 13:00:00', 'admin1', '2026-01-14 10:00:00', 1),
    (NULL, '테스트 메인 카테고리', 'ACTIVE', 'admin1', '2026-08-24 12:29:53', NULL, NULL, 0);

-- MARKET_PRODUCT
INSERT INTO team2.`MARKET_PRODUCT` (`CATE_CODE`, `MEM_CODE`, `TITLE`, `CONTENT`, `PRICE`, `HITCOUNT`, `POST_STATUS`, `DEAL_STATUS`, `CREATED_BY`, `CREATED_AT`, `UPDATED_BY`, `UPDATED_AT`, `DELETE_YN`) VALUES
    (5, 1, '프리미엄 기능성 머슬 핏 반팔 티셔츠', '땀 배출이 원활하고 신축성이 뛰어난 운동용 반팔 티셔츠입니다.', 29000, 45, 'ACTIVE', 'ON_SALE', 'user01', '2026-02-01 10:00:00', NULL, NULL, 0),
    (6, 2, '하이웨이스트 무봉제 레깅스 (블랙)', '복부를 탄탄하게 잡아주며 말림 현상이 없는 필라테스/헬스용 레깅스입니다.', 34000, 120, 'ACTIVE', 'ON_SALE', 'user02', '2026-02-02 14:30:00', NULL, NULL, 0),
    (7, 4, '네오프렌 헬스 손목 보호대 (1쌍)', '중량 운동 시 손목 관절을 안전하게 보호해 주는 스트랩입니다.', 18500, 32, 'ACTIVE', 'ON_SALE', 'user04', '2026-02-05 09:15:00', NULL, NULL, 0),
    (8, 1, '국산 수비드 닭가슴살 혼합 30팩', '질리지 않는 5가지 맛으로 구성된 부드러운 수비드 다이어트 닭가슴살 세트입니다.', 49900, 250, 'ACTIVE', 'ON_SALE', 'user01', '2026-02-01 11:00:00', 'user01', '2026-02-03 10:00:00', 0),
    (9, 2, 'WPI 분리유청 단백질 쉐이크 초코맛 2kg', '유당불내증이 있는 분들도 편하게 섭취 가능한 고함량 단백질 보충제입니다.', 65000, 180, 'ACTIVE', 'ON_SALE', 'user02', '2026-02-02 16:00:00', NULL, NULL, 0),
    (10, 5, '무설탕 저칼로리 스리라차 소스 300g', '다이어트 식단에 매콤함을 더해줄 부담 없는 제로 슈가 소스입니다.', 68000, 15, 'ACTIVE', 'ON_SALE', 'user05', '2026-02-10 13:20:00', NULL, NULL, 0),
    (11, 3, '고밀도 NBR 홈트레이닝 요가매트 20mm', '충격 흡수가 뛰어나 층간소음을 방지해 주는 두툼한 두께의 매트입니다.', 24500, 95, 'ACTIVE', 'ON_SALE', 'user03', '2026-02-04 11:00:00', NULL, NULL, 0),
    (12, 4, '라텍스 스트레칭 루프 밴드 5종 세트', '단계별 강도 조절이 가능하여 전신 운동에 적합한 탄성 밴드 세트입니다.', 12000, 42, 'ACTIVE', 'ON_SALE', 'user04', '2026-02-05 10:30:00', NULL, NULL, 0),
    (13, 1, '가정용 문틀 철봉 스쿼트 머신 패키지', '집에서도 완벽한 등 운동과 하체 운동을 도와주는 프리미엄 홈트 기구입니다.', 139000, 60, 'ACTIVE', 'ON_SALE', 'user01', '2026-02-06 17:00:00', NULL, NULL, 0),
    (14, 2, '고함량 활성비타민 B컴플렉스 60정', '지친 일상과 고강도 운동 후 활력을 충전해 주는 필수 영양제입니다.', 28000, 55, 'ACTIVE', 'ON_SALE', 'user02', '2026-02-07 09:00:00', NULL, NULL, 0),
    (15, 3, '캐나다산 초임계 오메가3 rTG 90캡슐', '체내 흡수율이 높고 비린내가 없는 프리미엄 오메가3 영양제입니다.', 39000, 78, 'ACTIVE', 'ON_SALE', 'user03', '2026-02-08 15:45:00', NULL, NULL, 0);

-- CHALLENGE
INSERT INTO team2.`CHALLENGE` (`ADM_CODE`, `TITLE`, `CONTENT`, `START_DATE`, `END_DATE`, `GOAL`, `POINT_EARNED`, `POST_STATUS`, `PROGRESS_STATUS`, `CREATED_BY`, `CREATED_AT`, `UPDATED_BY`, `UPDATED_AT`, `DELETE_YN`) VALUES
    (1, '테스트 챌린지 등록', '이것은 에러를 뚫고 등록하는 눈물의 챌린지입니다.', '2026-08-25 10:00:00', '2026-09-30 23:59:59', '에러를 뚫고 등록 11', 100, 'BLINDED', 'WAITING', 'admin02', '2026-06-30 10:00:00', NULL, '2026-08-21 12:46:49', 1),
    (2, '하루 10분 독서 습관', '바쁜 일상 속, 자기 전 10분씩 독서하고 감상평을 남겨보세요.', '2026-06-01 00:00:00', '2026-06-30 00:00:00', '일주일 동안 독서 10분 후 감상평 작성', 200, 'ACTIVE', 'IN_PROGRESS', 'admin02', '2026-05-15 14:30:00', 'admin01', '2026-06-02 09:15:00', 0),
    (1, '아침 6시 미라클 모닝', '성공적인 하루의 시작! 매일 아침 6시 기상 인증 챌린지.', '2026-05-01 00:00:00', '2026-05-31 00:00:00', '30일 동안 6시 기상 인증', 360, 'ACTIVE', 'ENDED', 'admin02', '2026-04-20 09:00:00', NULL, NULL, 0),
    (3, '하루 물 2L 마시기', '수분 보충을 위한 단기 미션! 2주간 매일 물 2L 마시기.', '2026-07-15 00:00:00', '2026-07-31 00:00:00', '2주일 동안 하루 물 2L 마시고 수분 상태 인증', 240, 'ACTIVE', 'WAITING', 'admin04', '2026-06-30 16:00:00', NULL, NULL, 0),
    (1, '테스트용 잘못된 챌린지', '등록 후 취소되어 삭제 처리된 데이터입니다.', '2026-01-01 00:00:00', '2026-01-31 00:00:00', '테스트용 잘못된 챌린지 등록 후 삭제', 120, 'DELETED', 'ENDED', 'admin04', '2025-12-25 11:00:00', 'admin01', '2026-01-05 10:30:00', 1),
    (1, '테스트 챌린지 등록', '이것은 에러를 뚫고 등록하는 눈물의 챌린지입니다.', '2026-08-25 10:00:00', '2026-09-30 23:59:59', '에러를 뚫고 등록 11', 100, 'BLINDED', 'WAITING', 'admin01', '2026-08-21 12:46:01', NULL, NULL, 0);

-- FEED
INSERT INTO team2.`FEED` (`CHAL_CODE`, `MEM_CODE`, `TITLE`, `CONTENT`, `HITCOUNT`, `STATUS`, `CREATED_BY`, `CREATED_AT`, `UPDATED_BY`, `UPDATED_AT`, `DELETE_YN`) VALUES
    (1, 1, '1일차 걷기 완료했습니다.', '오늘 아침 일찍 일어나서 공원 한 바퀴 돌고 왔습니다. 상쾌하네요!', 15, 'ACTIVE', 'user01', '2026-06-01 11:00:00', NULL, NULL, 0),
    (1, 2, '비 오는 날 걷기 인증 (사진 추가)', '비가 오지만 우산 쓰고 1만보 채웠습니다! 뿌듯하네요.', 85, 'ACTIVE', 'user02', '2026-06-02 20:00:00', 'user02', '2026-06-02 20:30:00', 0),
    (2, 1, '독서 챌린지 성공 후기', '한 달 동안 매일 10분 독서 성공했습니다! 좋은 습관이 생긴 것 같아요.', 42, 'ACTIVE', 'user01', '2026-05-31 22:00:00', NULL, NULL, 0),
    (3, 4, '오늘 너무 힘드네요 ㅠㅠ', '오늘은 미션 수행이 어려울 것 같습니다. 내일부터 다시 화이팅!', 5, 'ACTIVE', 'user04', '2026-06-12 09:30:00', NULL, NULL, 0),
    (1, 1, '잘못 올린 글', '앗, 다른 챌린지 인증 사진을 잘못 올렸습니다. 삭제합니다.', 2, 'DELETED', 'user01', '2026-06-05 08:00:00', 'user01', '2026-06-05 08:05:00', 1),
    (2, 1, 'ㅇㅇㅇㅇ', 'ㅇㅇㅇㅇ', 0, 'ACTIVE', 'user01', '2026-07-09 11:01:53', NULL, NULL, 0),
    (2, 1, '수정용 테스트 게시글', '수정용 테스트 게시글 등록합니다~', 0, 'ACTIVE', 'user01', '2026-08-28 16:58:39', NULL, NULL, 0);

-- COMMENTS
INSERT INTO team2.`COMMENTS` (`FEED_CODE`, `MEM_CODE`, `CONTENT`, `STATUS`, `CREATED_BY`, `CREATED_AT`, `UPDATED_BY`, `UPDATED_AT`, `DELETE_YN`) VALUES
    (1, 2, '와, 아침 일찍부터 대단하시네요! 자극받고 갑니다.', 'ACTIVE', 'user02', '2026-06-01 11:15:00', NULL, NULL, 0),
    (1, 4, '저도 내일부터 같이 달릴게요! 화이팅입니다.', 'ACTIVE', 'user04', '2026-06-01 12:00:00', NULL, NULL, 0),
    (2, 1, '비 오는데 1만보라니 리스펙합니다..!!', 'ACTIVE', 'user01', '2026-06-02 20:45:00', NULL, NULL, 0),
    (3, 2, '저도 추천해주신 책 바로 장바구니에 담았어요!', 'ACTIVE', 'user02', '2026-05-31 22:30:00', 'user02', '2026-05-31 22:40:00', 0),
    (4, 1, '오늘 너무 고생 많으셨어요. 내일은 더 좋은 하루가 될 거예요.', 'ACTIVE', 'user01', '2026-06-12 10:00:00', 'user01', '2026-06-12 10:15:00', 1),
    (1, 1, '비가 많이 와요!', 'active', 'user01', '2026-08-26 12:48:30', NULL, '2026-08-28 17:14:34', 0),
    (1, 1, '댓글 등록 테스트입니다.', 'active', 'user01', '2026-08-28 14:12:50', NULL, NULL, 0),
    (1, 1, '댓글 등록 테스트', 'active', 'user01', '2026-08-28 14:40:37', NULL, NULL, 0);

-- CHALLENGE_ENTRY
INSERT INTO team2.`CHALLENGE_ENTRY` (`CHAL_CODE`, `MEM_CODE`, `STATUS`, `JOINED_AT`, `CANCELED_BY`, `CANCELED_AT`, `CANCEL_REASON`) VALUES
    (1, 1, 'JOINED', '2026-06-01 10:00:00', NULL, NULL, NULL),
    (1, 2, 'JOINED', '2026-06-02 11:30:00', NULL, NULL, NULL),
    (2, 1, 'COMPLETED', '2026-05-01 09:00:00', NULL, NULL, NULL),
    (3, 4, 'CANCELED', '2026-06-10 14:00:00', 'user04', '2026-06-15 16:20:00', '사용자 취소'),
    (4, 5, 'CANCELED', '2026-06-20 08:45:00', 'admin02', '2026-06-21 10:00:00', '도배');

-- IMAGES
INSERT INTO team2.`IMAGES` (`TARGET_CODE`, `TYPE`, `PATH`, `ORDER_SEQ`, `DELETE_YN`) VALUES
    (6, 'feed', '/images/feed/2026.07/8d4e0f33-2a44-4174-a776-ed4f9b4a9161_banner_enter_informaion.jpg', 1, 0),
    (6, 'feed', '/images/feed/2026.07/f4410813-3c60-42ea-8503-d2d6fa643e58_banner_search_fail.jpg', 2, 0),
    (6, 'feed', '/images/feed/2026.07/013a62c1-bd4a-47db-9bc7-4f7b30f12ba6_banner_reservation_completed.jpg', 3, 0),
    (6, 'feed', '/images/feed/2026.07/4aa853ce-296b-4c8f-b899-4cbb18259dfe_banner_reservation.jpg', 4, 0);

-- FEED_HASHTAG
INSERT INTO team2.`FEED_HASHTAG` (`FEED_CODE`, `TAG_NAME`) VALUES
    (1, '오운완'),
    (1, '미라클모닝'),
    (1, '걷기챌린지'),
    (2, '오운완'),
    (2, '비오는날'),
    (2, '꾸준함'),
    (3, '독서'),
    (3, '북스타그램'),
    (3, '습관만들기'),
    (4, '일상'),
    (4, '힘내자'),
    (5, '테스트'),
    (5, '삭제예정');

COMMIT;

-- Pending source data: FEED 10 is absent (source contains 7 FEED rows).
-- Original CODE values were not exported; do not guess which feed was intended.
-- Restore the missing feed / original IDs before enabling these statements.

-- INSERT INTO team2.`FEED_HASHTAG` (`FEED_CODE`, `TAG_NAME`) VALUES (10, '');
-- INSERT INTO team2.`FEED_HASHTAG` (`FEED_CODE`, `TAG_NAME`) VALUES (10, '');
-- INSERT INTO team2.`IMAGES` (`TARGET_CODE`, `TYPE`, `PATH`, `ORDER_SEQ`, `DELETE_YN`) VALUES (10, 'feed', '/images/feed/2026.08/0e4cface-f5a5-4d56-922f-a1ef78050475_스크린샷 2026-08-18 100552.png', 1, 0);
-- INSERT INTO team2.`IMAGES` (`TARGET_CODE`, `TYPE`, `PATH`, `ORDER_SEQ`, `DELETE_YN`) VALUES (10, 'feed', '/images/feed/2026.08/28100722-02cc-41a1-ac0e-a8e74c0c79d0_스크린샷 2026-08-18 111008.png', 2, 0);
