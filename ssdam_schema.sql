-- 일반 회원 정보
CREATE TABLE `MEMBER_ACCOUNT` (
	`CODE`       INT          NOT NULL COMMENT '회원 번호', -- 회원 번호
	`ID`         VARCHAR(24)  NOT NULL COMMENT '아이디', -- 아이디
	`PASSWORD`   VARCHAR(64)  NOT NULL COMMENT '비밀번호', -- 비밀번호
	`NAME`       VARCHAR(16)  NOT NULL COMMENT '이름', -- 이름
	`PHONE`      VARCHAR(30)  NOT NULL COMMENT '연락처', -- 연락처
	`ADDRESS`    VARCHAR(255) NOT NULL COMMENT '주소', -- 주소
	`RATING`     INT          NOT NULL DEFAULT 0 COMMENT '등급', -- 등급
	`RANKING`    INT          NOT NULL DEFAULT 0 COMMENT '랭킹', -- 랭킹
	`POINT`      INT          NOT NULL DEFAULT 0 COMMENT '보유 포인트', -- 보유 포인트
	`STATUS`     VARCHAR(32)  NOT NULL COMMENT '상태', -- 상태
	`CREATED_AT` DATETIME     NOT NULL COMMENT '가입일', -- 가입일
	`UPDATED_AT` DATETIME     NULL     COMMENT '수정일', -- 수정일
	`LOGGED_AT`  DATETIME     NULL     COMMENT '마지막 로그인', -- 마지막 로그인
	`DELETE_YN`  BOOLEAN      NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '일반 회원 정보';

-- 일반 회원 정보
ALTER TABLE `MEMBER_ACCOUNT`
	ADD CONSTRAINT `PK_MEMBER_ACCOUNT` -- 일반 회원 정보 기본키
	PRIMARY KEY (
	`CODE` -- 회원 번호
	);

ALTER TABLE `MEMBER_ACCOUNT`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '회원 번호';

-- 관리자 정보
CREATE TABLE `ADMIN_ACCOUNT` (
	`CODE`       INT         NOT NULL COMMENT '관리자 고유 번호', -- 관리자 고유 번호
	`ADM_CODE`   INT         NULL     COMMENT '생성 관리자 번호', -- 생성 관리자 번호
	`EMP_ID`     VARCHAR(32) NOT NULL COMMENT '아이디', -- 아이디
	`PASSWORD`   VARCHAR(64) NOT NULL COMMENT '비밀번호', -- 비밀번호
	`NAME`       VARCHAR(16) NOT NULL COMMENT '이름', -- 이름
	`PHONE`      VARCHAR(30) NOT NULL COMMENT '연락처', -- 연락처
	`DEPT`       VARCHAR(32) NOT NULL COMMENT '소속', -- 소속
	`ROLE`       VARCHAR(32) NOT NULL COMMENT '역할', -- 역할
	`CREATED_AT` DATETIME    NOT NULL COMMENT '가입일', -- 가입일
	`UPDATED_AT` DATETIME    NULL     COMMENT '수정일', -- 수정일
	`LOGGED_AT`  DATETIME    NULL     COMMENT '마지막 로그인', -- 마지막 로그인
	`DELETE_YN`  BOOLEAN     NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '관리자 정보';

-- 관리자 정보
ALTER TABLE `ADMIN_ACCOUNT`
	ADD CONSTRAINT `PK_ADMIN_ACCOUNT` -- 관리자 정보 기본키
	PRIMARY KEY (
	`CODE` -- 관리자 고유 번호
	);

ALTER TABLE `ADMIN_ACCOUNT`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '관리자 고유 번호';

-- 마켓 등록 물품
CREATE TABLE `MARKET_PRODUCT` (
	`CODE`        INT           NOT NULL COMMENT '등록 물품 번호', -- 등록 물품 번호
	`CATE_CODE`   INT           NOT NULL COMMENT '카테고리 번호', -- 카테고리 번호
	`MEM_CODE`    INT           NOT NULL COMMENT '회원 번호', -- 회원 번호
	`TITLE`       VARCHAR(255)  NOT NULL COMMENT '제목', -- 제목
	`CONTENT`     VARCHAR(4000) NULL     COMMENT '내용', -- 내용
	`PRICE`       INT           NOT NULL COMMENT '가격', -- 가격
	`HITCOUNT`    INT           NOT NULL COMMENT '조회수', -- 조회수
	`POST_STATUS` VARCHAR(32)   NOT NULL COMMENT '노출 상태', -- 노출 상태
	`DEAL_STATUS` VARCHAR(32)   NOT NULL COMMENT '판매 상태', -- 판매 상태
	`CREATED_BY`  VARCHAR(32)   NOT NULL COMMENT '작성자 아이디', -- 작성자 아이디
	`CREATED_AT`  DATETIME      NOT NULL COMMENT '작성일', -- 작성일
	`UPDATED_BY`  VARCHAR(32)   NULL     COMMENT '수정자 아이디', -- 수정자 아이디
	`UPDATED_AT`  DATETIME      NULL     COMMENT '수정일', -- 수정일
	`DELETE_YN`   BOOLEAN       NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '마켓 등록 물품';

-- 마켓 등록 물품
ALTER TABLE `MARKET_PRODUCT`
	ADD CONSTRAINT `PK_MARKET_PRODUCT` -- 마켓 등록 물품 기본키
	PRIMARY KEY (
	`CODE` -- 등록 물품 번호
	);

ALTER TABLE `MARKET_PRODUCT`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '등록 물품 번호';

-- 거래 이력
CREATE TABLE `MARKET_DEAL_LOG` (
	`CODE`       INT         NOT NULL COMMENT '거래 이력 번호', -- 거래 이력 번호
	`PROD_CODE`  INT         NOT NULL COMMENT '등록 물품 번호', -- 등록 물품 번호
	`SELLER_ID`  VARCHAR(32) NOT NULL COMMENT '판매자', -- 판매자
	`BUYER_ID`   VARCHAR(32) NOT NULL COMMENT '구매자', -- 구매자
	`PRICE`      INT         NOT NULL COMMENT '거래금액', -- 거래금액
	`CREATED_AT` DATETIME    NOT NULL COMMENT '거래날짜' -- 거래날짜
)
COMMENT '거래 이력';

-- 거래 이력
ALTER TABLE `MARKET_DEAL_LOG`
	ADD CONSTRAINT `PK_MARKET_DEAL_LOG` -- 거래 이력 기본키
	PRIMARY KEY (
	`CODE` -- 거래 이력 번호
	);

ALTER TABLE `MARKET_DEAL_LOG`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '거래 이력 번호';

-- 포인트 적립 및 사용 이력
CREATE TABLE `POINT_LOG` (
	`CODE`       INT         NOT NULL COMMENT '이력 번호', -- 이력 번호
	`MEM_CODE`   INT         NOT NULL COMMENT '회원 번호', -- 회원 번호
	`TYPE`       VARCHAR(32) NOT NULL COMMENT '포인트 구분', -- 포인트 구분
	`AMOUNT`     INT         NOT NULL COMMENT '포인트 수', -- 포인트 수
	`REASON`     VARCHAR(32) NOT NULL COMMENT '사유', -- 사유
	`CREATED_AT` DATETIME    NOT NULL COMMENT '발생일' -- 발생일
)
COMMENT '포인트 적립 및 사용 이력';

-- 포인트 적립 및 사용 이력
ALTER TABLE `POINT_LOG`
	ADD CONSTRAINT `PK_POINT_LOG` -- 포인트 적립 및 사용 이력 기본키
	PRIMARY KEY (
	`CODE` -- 이력 번호
	);

ALTER TABLE `POINT_LOG`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '이력 번호';

-- 거래 후기
CREATE TABLE `MARKET_REVIEW` (
	`CODE`       INT           NOT NULL COMMENT '후기 번호', -- 후기 번호
	`DEAL_CODE`  INT           NOT NULL COMMENT '거래 이력 번호', -- 거래 이력 번호
	`MEM_CODE`   INT           NOT NULL COMMENT '타겟 회원 번호', -- 타겟 회원 번호
	`RATING`     INT           NOT NULL COMMENT '별점', -- 별점
	`CONTENT`    VARCHAR(4000) NOT NULL COMMENT '내용', -- 내용
	`CREATED_BY` VARCHAR(32)   NOT NULL COMMENT '작성자 아이디', -- 작성자 아이디
	`CREATED_AT` DATETIME      NOT NULL COMMENT '작성일', -- 작성일
	`UPDATED_BY` VARCHAR(32)   NULL     COMMENT '수정자 아이디', -- 수정자 아이디
	`UPDATED_AT` DATETIME      NULL     COMMENT '수정일', -- 수정일
	`DELETE_YN`  BOOLEAN       NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '거래 후기';

-- 거래 후기
ALTER TABLE `MARKET_REVIEW`
	ADD CONSTRAINT `PK_MARKET_REVIEW` -- 거래 후기 기본키
	PRIMARY KEY (
	`CODE` -- 후기 번호
	);

ALTER TABLE `MARKET_REVIEW`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '후기 번호';

-- 마켓 카테고리
CREATE TABLE `MARKET_CATEGORY` (
	`CODE`       INT         NOT NULL COMMENT '카테고리 번호', -- 카테고리 번호
	`MAIN_CATE`  INT         NULL     COMMENT '대분류 번호', -- 대분류 번호
	`NAME`       VARCHAR(16) NOT NULL COMMENT '카테고리명', -- 카테고리명
	`STATUS`     VARCHAR(32) NOT NULL COMMENT '운영 상태', -- 운영 상태
	`CREATED_BY` VARCHAR(32) NOT NULL COMMENT '생성한 관리자', -- 생성한 관리자
	`CREATED_AT` DATETIME    NOT NULL COMMENT '생성일', -- 생성일
	`UPDATED_BY` VARCHAR(32) NULL     COMMENT '수정한 관리자', -- 수정한 관리자
	`UPDATED_AT` DATETIME    NULL     COMMENT '수정일', -- 수정일
	`DELETE_YN`  BOOLEAN     NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '마켓 카테고리';

-- 마켓 카테고리
ALTER TABLE `MARKET_CATEGORY`
	ADD CONSTRAINT `PK_MARKET_CATEGORY` -- 마켓 카테고리 기본키
	PRIMARY KEY (
	`CODE` -- 카테고리 번호
	);

ALTER TABLE `MARKET_CATEGORY`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '카테고리 번호';

-- 관리자 활동 이력
CREATE TABLE `ADMIN_ACTIVITY_LOG` (
	`CODE`         INT           NOT NULL COMMENT '로그 번호', -- 로그 번호
	`ADM_CODE`     INT           NOT NULL COMMENT '관리자 고유 번호', -- 관리자 고유 번호
	`TARGET_TYPE`  VARCHAR(32)   NOT NULL COMMENT '처리 대상 유형', -- 처리 대상 유형
	`TARGET_CODE`  INT           NOT NULL COMMENT '처리 대상 번호', -- 처리 대상 번호
	`PROCESS_TYPE` VARCHAR(32)   NOT NULL COMMENT '처리 유형', -- 처리 유형
	`MEMO`         VARCHAR(4000) NOT NULL COMMENT '처리 사유', -- 처리 사유
	`CREATED_AT`   DATETIME      NOT NULL COMMENT '활동 날짜' -- 활동 날짜
)
COMMENT '관리자 활동 이력';

-- 관리자 활동 이력
ALTER TABLE `ADMIN_ACTIVITY_LOG`
	ADD CONSTRAINT `PK_ADMIN_ACTIVITY_LOG` -- 관리자 활동 이력 기본키
	PRIMARY KEY (
	`CODE` -- 로그 번호
	);

ALTER TABLE `ADMIN_ACTIVITY_LOG`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '로그 번호';

-- 피드
CREATE TABLE `FEED` (
	`CODE`       INT           NOT NULL COMMENT '피드 번호', -- 피드 번호
	`CHAL_CODE`  INT           NOT NULL COMMENT '챌린지 번호', -- 챌린지 번호
	`MEM_CODE`   INT           NOT NULL COMMENT '회원 번호', -- 회원 번호
	`TITLE`      VARCHAR(255)  NOT NULL COMMENT '제목', -- 제목
	`CONTENT`    VARCHAR(4000) NOT NULL COMMENT '내용', -- 내용
	`HITCOUNT`   INT           NOT NULL COMMENT '조회수', -- 조회수
	`STATUS`     VARCHAR(32)   NOT NULL COMMENT '공개 상태', -- 공개 상태
	`CREATED_BY` VARCHAR(32)   NOT NULL COMMENT '작성자 아이디', -- 작성자 아이디
	`CREATED_AT` DATETIME      NOT NULL COMMENT '작성일', -- 작성일
	`UPDATED_BY` VARCHAR(32)   NULL     COMMENT '수정자 아이디', -- 수정자 아이디
	`UPDATED_AT` DATETIME      NULL     COMMENT '수정일', -- 수정일
	`DELETE_YN`  BOOLEAN       NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '피드';

-- 피드
ALTER TABLE `FEED`
	ADD CONSTRAINT `PK_FEED` -- 피드 기본키
	PRIMARY KEY (
	`CODE` -- 피드 번호
	);

ALTER TABLE `FEED`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '피드 번호';

-- 피드 추천
CREATE TABLE `FEED_LIKE` (
	`FEED_CODE`  INT      NOT NULL COMMENT '피드 번호', -- 피드 번호
	`MEM_CODE`   INT      NOT NULL COMMENT '회원 번호', -- 회원 번호
	`CREATED_AT` DATETIME NOT NULL COMMENT '등록일', -- 등록일
	`DELETE_YN`  BOOLEAN  NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '피드 추천';

-- 피드 추천
ALTER TABLE `FEED_LIKE`
	ADD CONSTRAINT `PK_FEED_LIKE` -- 피드 추천 기본키
	PRIMARY KEY (
	`FEED_CODE`, -- 피드 번호
	`MEM_CODE`   -- 회원 번호
	);

-- 댓글 추천
CREATE TABLE `COMMENT_LIKE` (
	`CMT_CODE`   INT      NOT NULL COMMENT '댓글 번호', -- 댓글 번호
	`MEM_CODE`   INT      NOT NULL COMMENT '회원 번호', -- 회원 번호
	`CREATED_AT` DATETIME NOT NULL COMMENT '등록일', -- 등록일
	`DELETE_YN`  BOOLEAN  NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '댓글 추천';

-- 댓글 추천
ALTER TABLE `COMMENT_LIKE`
	ADD CONSTRAINT `PK_COMMENT_LIKE` -- 댓글 추천 기본키
	PRIMARY KEY (
	`CMT_CODE`, -- 댓글 번호
	`MEM_CODE`  -- 회원 번호
	);

-- 댓글
CREATE TABLE `COMMENTS` (
	`CODE`       INT           NOT NULL COMMENT '댓글 번호', -- 댓글 번호
	`FEED_CODE`  INT           NOT NULL COMMENT '피드 번호', -- 피드 번호
	`MEM_CODE`   INT           NOT NULL COMMENT '회원 번호', -- 회원 번호
	`CONTENT`    VARCHAR(4000) NOT NULL COMMENT '내용', -- 내용
	`STATUS`     VARCHAR(32)   NOT NULL COMMENT '공개 상태', -- 공개 상태
	`CREATED_BY` VARCHAR(32)   NOT NULL COMMENT '작성자 아이디', -- 작성자 아이디
	`CREATED_AT` DATETIME      NOT NULL COMMENT '작성일', -- 작성일
	`UPDATED_BY` VARCHAR(32)   NULL     COMMENT '수정자 아이디', -- 수정자 아이디
	`UPDATED_AT` DATETIME      NULL     COMMENT '수정일', -- 수정일
	`DELETE_YN`  BOOLEAN       NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '댓글';

-- 댓글
ALTER TABLE `COMMENTS`
	ADD CONSTRAINT `PK_COMMENTS` -- 댓글 기본키
	PRIMARY KEY (
	`CODE` -- 댓글 번호
	);

ALTER TABLE `COMMENTS`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '댓글 번호';

-- 챌린지
CREATE TABLE `CHALLENGE` (
	`CODE`           INT           NOT NULL COMMENT '챌린지 번호', -- 챌린지 번호
	`ADM_CODE`       INT           NOT NULL COMMENT '등록 관리자 번호', -- 등록 관리자 번호
	`TITLE`          VARCHAR(255)  NOT NULL COMMENT '제목', -- 제목
	`CONTENT`        VARCHAR(4000) NOT NULL COMMENT '내용', -- 내용
	`START_DATE`     DATETIME      NOT NULL COMMENT '시작일', -- 시작일
	`END_DATE`       DATETIME      NOT NULL COMMENT '마감일', -- 마감일
	`GOAL`           VARCHAR(255)  NULL     COMMENT '목표', -- 목표
	`POINT_EARNED`   INT           NULL     COMMENT '획득 포인트', -- 획득 포인트
	`POST_STATUS`    VARCHAR(32)   NOT NULL COMMENT '노출 상태', -- 노출 상태
	`PROGRESS_STATUS` VARCHAR(32)   NULL     COMMENT '진행 상태', -- 진행 상태
	`CREATED_BY`     VARCHAR(32)   NOT NULL COMMENT '등록자 아이디', -- 등록자 아이디
	`CREATED_AT`     DATETIME      NOT NULL COMMENT '등록일', -- 등록일
	`UPDATED_BY`     VARCHAR(32)   NULL     COMMENT '수정자 아이디', -- 수정자 아이디
	`UPDATED_AT`     DATETIME      NULL     COMMENT '수정일', -- 수정일
	`DELETE_YN`      BOOLEAN       NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '챌린지';

-- 챌린지
ALTER TABLE `CHALLENGE`
	ADD CONSTRAINT `PK_CHALLENGE` -- 챌린지 기본키
	PRIMARY KEY (
	`CODE` -- 챌린지 번호
	);

ALTER TABLE `CHALLENGE`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '챌린지 번호';

-- 챌린지 참여 상세 정보
CREATE TABLE `CHALLENGE_ENTRY` (
	`CODE`          INT         NOT NULL COMMENT '참여 상세 번호', -- 참여 상세 번호
	`CHAL_CODE`     INT         NOT NULL COMMENT '챌린지 번호', -- 챌린지 번호
	`MEM_CODE`      INT         NOT NULL COMMENT '회원 번호', -- 회원 번호
	`STATUS`        VARCHAR(32) NOT NULL COMMENT '현재 진행 상황', -- 현재 진행 상황
	`JOINED_AT`     DATETIME    NOT NULL COMMENT '참여일', -- 참여일
	`CANCELED_BY`   VARCHAR(32) NULL     COMMENT '취소자 아이디', -- 취소자 아이디
	`CANCELED_AT`   DATETIME    NULL     COMMENT '취소일', -- 취소일
	`CANCEL_REASON` VARCHAR(32) NULL     COMMENT '취소 사유', -- 취소 사유
	`DELETE_YN`     BOOLEAN     NOT NULL DEFAULT 0 COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '챌린지 참여 상세 정보';

-- 챌린지 참여 상세 정보
ALTER TABLE `CHALLENGE_ENTRY`
	ADD CONSTRAINT `PK_CHALLENGE_ENTRY` -- 챌린지 참여 상세 정보 기본키
	PRIMARY KEY (
	`CODE` -- 참여 상세 번호
	);

ALTER TABLE `CHALLENGE_ENTRY`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '참여 상세 번호';


-- 피드 조회수 이력
CREATE TABLE `FEED_HIT_LOG` (
	`FEED_CODE`  INT      NOT NULL COMMENT '피드 번호', -- 피드 번호
	`MEM_CODE`   INT      NOT NULL COMMENT '회원 번호', -- 회원 번호
	`CREATED_AT` DATETIME NOT NULL COMMENT '조회일' -- 조회일
)
COMMENT '피드 조회수 이력';

-- 피드 조회수 이력
ALTER TABLE `FEED_HIT_LOG`
	ADD CONSTRAINT `PK_FEED_HIT_LOG` -- 피드 조회수 이력 기본키
	PRIMARY KEY (
	`FEED_CODE`, -- 피드 번호
	`MEM_CODE`   -- 회원 번호
	);

-- 거래글 조회수 이력
CREATE TABLE `MARKET_PROD_HIT_LOG` (
	`PROD_CODE`  INT      NOT NULL COMMENT '등록 물품 번호', -- 등록 물품 번호
	`MEM_CODE`   INT      NOT NULL COMMENT '회원 번호', -- 회원 번호
	`CREATED_AT` DATETIME NOT NULL COMMENT '조회일' -- 조회일
)
COMMENT '거래글 조회수 이력';

-- 거래글 조회수 이력
ALTER TABLE `MARKET_PROD_HIT_LOG`
	ADD CONSTRAINT `PK_MARKET_PROD_HIT_LOG` -- 거래글 조회수 이력 기본키
	PRIMARY KEY (
	`PROD_CODE`, -- 등록 물품 번호
	`MEM_CODE`   -- 회원 번호
	);

-- 거래글 찜
CREATE TABLE `MARKET_PROD_PICK` (
	`PROD_CODE`  INT      NOT NULL COMMENT '등록 물품 번호', -- 등록 물품 번호
	`MEM_CODE`   INT      NOT NULL COMMENT '회원 번호', -- 회원 번호
	`CREATED_AT` DATETIME NOT NULL COMMENT '등록일', -- 등록일
	`DELETE_YN`  BOOLEAN  NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '거래글 찜';

-- 거래글 찜
ALTER TABLE `MARKET_PROD_PICK`
	ADD CONSTRAINT `PK_MARKET_PROD_PICK` -- 거래글 찜 기본키
	PRIMARY KEY (
	`PROD_CODE`, -- 등록 물품 번호
	`MEM_CODE`   -- 회원 번호
	);

-- 이미지 정보
CREATE TABLE `IMAGES` (
	`TARGET_CODE` INT          NOT NULL COMMENT '타겟 번호', -- 타겟 번호
	`TYPE`        VARCHAR(32)  NOT NULL COMMENT '분류', -- 분류
	`PATH`        VARCHAR(255) NOT NULL COMMENT '경로', -- 경로
	`ORDER_SEQ`   INT          NOT NULL COMMENT '이미지 순서', -- 이미지 순서
	`DELETE_YN`   BOOLEAN      NOT NULL COMMENT '삭제 여부' -- 삭제 여부
)
COMMENT '이미지 정보';

-- 피드 해시태그
CREATE TABLE `FEED_HASHTAG` (
	`FEED_CODE` INT           NOT NULL COMMENT '피드 번호', -- 피드 번호
	`TAG_NAME`  VARCHAR(4000) NOT NULL COMMENT '태그명' -- 태그명
)
COMMENT '피드 해시태그';

-- 신고 관리
CREATE TABLE `REPORT` (
	`CODE`        INT           NOT NULL COMMENT '신고 번호', -- 신고 번호
	`MEM_CODE`    INT           NOT NULL COMMENT '신고한 회원 번호', -- 신고한 회원 번호
	`TARGET_TYPE` VARCHAR(32)   NOT NULL COMMENT '대상 유형', -- 대상 유형
	`TARGET_CODE` INT           NOT NULL COMMENT '대상 번호', -- 대상 번호
	`REASON_TYPE` VARCHAR(32)   NOT NULL COMMENT '신고 사유', -- 신고 사유
	`CONTENT`     VARCHAR(4000) NULL     COMMENT '신고 상세 내용', -- 신고 상세 내용
	`STATUS`      VARCHAR(32)   NOT NULL COMMENT '처리 상태', -- 처리 상태
	`CREATED_AT`  DATETIME      NOT NULL COMMENT '신고일' -- 신고일
)
COMMENT '신고 관리';

-- 신고 관리
ALTER TABLE `REPORT`
	ADD CONSTRAINT `PK_REPORT` -- 신고 관리 기본키
	PRIMARY KEY (
	`CODE` -- 신고 번호
	);

ALTER TABLE `REPORT`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '신고 번호';

-- 문의
CREATE TABLE `INQUIRY` (
	`CODE`           INT           NOT NULL COMMENT '문의 번호', -- 문의 번호
	`ORIGIN_CODE`    INT           NULL     COMMENT '재문의 번호', -- 재문의 번호
	`MEM_CODE`       INT           NOT NULL COMMENT '회원 번호', -- 회원 번호
	`CATEGORY`       VARCHAR(32)   NOT NULL COMMENT '카테고리', -- 카테고리
	`TITLE`          VARCHAR(255)  NOT NULL COMMENT '제목', -- 제목
	`CONTENT`        VARCHAR(4000) NOT NULL COMMENT '내용', -- 내용
	`STATUS`         VARCHAR(32)   NOT NULL COMMENT '답변 상태', -- 답변 상태
	`CREATED_AT`     DATETIME      NOT NULL COMMENT '문의일', -- 문의일
	`DELETE_YN`      BOOLEAN       NOT NULL COMMENT '삭제 여부', -- 삭제 여부
	`DELETED_AT`     DATETIME      NULL     COMMENT '삭제일', -- 삭제일
	`ANSWERED_BY`    VARCHAR(32)   NULL     COMMENT '답변한 관리자', -- 답변한 관리자
	`ANSWER_CONTENT` VARCHAR(4000) NULL     COMMENT '답변 내용', -- 답변 내용
	`ANSWERED_AT`    DATETIME      NULL     COMMENT '답변일' -- 답변일
)
COMMENT '문의';

-- 문의
ALTER TABLE `INQUIRY`
	ADD CONSTRAINT `PK_INQUIRY` -- 문의 기본키
	PRIMARY KEY (
	`CODE` -- 문의 번호
	);

ALTER TABLE `INQUIRY`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '문의 번호';

-- 일반 회원 활동 이력
CREATE TABLE `MEMBER_ACTIVITY_LOG` (
	`CODE`          INT          NOT NULL COMMENT '활동 이력 번호', -- 활동 이력 번호
	`MEM_CODE`      INT          NOT NULL COMMENT '회원 번호', -- 회원 번호
	`ACTION_TYPE`   VARCHAR(32)  NOT NULL COMMENT '활동 유형', -- 활동 유형
	`ACTION_REASON` VARCHAR(255) NOT NULL COMMENT '활동 사유', -- 활동 사유
	`ACTIONED_BY`   VARCHAR(32)  NOT NULL COMMENT '활동자 아이디', -- 활동자 아이디
	`ACTIONED_IP`   VARCHAR(64)  NOT NULL COMMENT '활동자 아이피', -- 활동자 아이피
	`CREATED_AT`    DATETIME     NOT NULL COMMENT '활동일' -- 활동일
)
COMMENT '일반 회원 활동 이력';

-- 일반 회원 활동 이력
ALTER TABLE `MEMBER_ACTIVITY_LOG`
	ADD CONSTRAINT `PK_MEMBER_ACTIVITY_LOG` -- 일반 회원 활동 이력 기본키
	PRIMARY KEY (
	`CODE` -- 활동 이력 번호
	);

ALTER TABLE `MEMBER_ACTIVITY_LOG`
	MODIFY COLUMN `CODE` INT NOT NULL AUTO_INCREMENT COMMENT '활동 이력 번호';

-- 관리자 정보
ALTER TABLE `ADMIN_ACCOUNT`
	ADD CONSTRAINT `FK_ADMIN_ACCOUNT_TO_ADMIN_ACCOUNT` -- 관리자 정보 -> 관리자 정보
	FOREIGN KEY (
	`ADM_CODE` -- 생성 관리자 번호
	)
	REFERENCES `ADMIN_ACCOUNT` ( -- 관리자 정보
	`CODE` -- 관리자 고유 번호
	);

-- 마켓 등록 물품
ALTER TABLE `MARKET_PRODUCT`
	ADD CONSTRAINT `FK_MARKET_CATEGORY_TO_MARKET_PRODUCT` -- 마켓 카테고리 -> 마켓 등록 물품
	FOREIGN KEY (
	`CATE_CODE` -- 카테고리 번호
	)
	REFERENCES `MARKET_CATEGORY` ( -- 마켓 카테고리
	`CODE` -- 카테고리 번호
	);

-- 마켓 등록 물품
ALTER TABLE `MARKET_PRODUCT`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_MARKET_PRODUCT` -- 일반 회원 정보 -> 마켓 등록 물품
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 거래 이력
ALTER TABLE `MARKET_DEAL_LOG`
	ADD CONSTRAINT `FK_MARKET_PRODUCT_TO_MARKET_DEAL_LOG` -- 마켓 등록 물품 -> 거래 이력
	FOREIGN KEY (
	`PROD_CODE` -- 등록 물품 번호
	)
	REFERENCES `MARKET_PRODUCT` ( -- 마켓 등록 물품
	`CODE` -- 등록 물품 번호
	);

-- 포인트 적립 및 사용 이력
ALTER TABLE `POINT_LOG`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_POINT_LOG` -- 일반 회원 정보 -> 포인트 적립 및 사용 이력
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 거래 후기
ALTER TABLE `MARKET_REVIEW`
	ADD CONSTRAINT `FK_MARKET_DEAL_LOG_TO_MARKET_REVIEW` -- 거래 이력 -> 거래 후기
	FOREIGN KEY (
	`DEAL_CODE` -- 거래 이력 번호
	)
	REFERENCES `MARKET_DEAL_LOG` ( -- 거래 이력
	`CODE` -- 거래 이력 번호
	);

-- 거래 후기
ALTER TABLE `MARKET_REVIEW`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_MARKET_REVIEW` -- 일반 회원 정보 -> 거래 후기
	FOREIGN KEY (
	`MEM_CODE` -- 타겟 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 마켓 카테고리
ALTER TABLE `MARKET_CATEGORY`
	ADD CONSTRAINT `FK_MARKET_CATEGORY_TO_MARKET_CATEGORY` -- 마켓 카테고리 -> 마켓 카테고리
	FOREIGN KEY (
	`MAIN_CATE` -- 대분류 번호
	)
	REFERENCES `MARKET_CATEGORY` ( -- 마켓 카테고리
	`CODE` -- 카테고리 번호
	);

-- 관리자 활동 이력
ALTER TABLE `ADMIN_ACTIVITY_LOG`
	ADD CONSTRAINT `FK_ADMIN_ACCOUNT_TO_ADMIN_ACTIVITY_LOG` -- 관리자 정보 -> 관리자 활동 이력
	FOREIGN KEY (
	`ADM_CODE` -- 관리자 고유 번호
	)
	REFERENCES `ADMIN_ACCOUNT` ( -- 관리자 정보
	`CODE` -- 관리자 고유 번호
	);

-- 피드
ALTER TABLE `FEED`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_FEED` -- 일반 회원 정보 -> 피드
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 피드
ALTER TABLE `FEED`
	ADD CONSTRAINT `FK_CHALLENGE_TO_FEED` -- 챌린지 -> 피드
	FOREIGN KEY (
	`CHAL_CODE` -- 챌린지 번호
	)
	REFERENCES `CHALLENGE` ( -- 챌린지
	`CODE` -- 챌린지 번호
	);

-- 피드 추천
ALTER TABLE `FEED_LIKE`
	ADD CONSTRAINT `FK_FEED_TO_FEED_LIKE` -- 피드 -> 피드 추천
	FOREIGN KEY (
	`FEED_CODE` -- 피드 번호
	)
	REFERENCES `FEED` ( -- 피드
	`CODE` -- 피드 번호
	);

-- 피드 추천
ALTER TABLE `FEED_LIKE`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_FEED_LIKE` -- 일반 회원 정보 -> 피드 추천
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 댓글 추천
ALTER TABLE `COMMENT_LIKE`
	ADD CONSTRAINT `FK_COMMENTS_TO_COMMENT_LIKE` -- 댓글 -> 댓글 추천
	FOREIGN KEY (
	`CMT_CODE` -- 댓글 번호
	)
	REFERENCES `COMMENTS` ( -- 댓글
	`CODE` -- 댓글 번호
	);

-- 댓글 추천
ALTER TABLE `COMMENT_LIKE`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_COMMENT_LIKE` -- 일반 회원 정보 -> 댓글 추천
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 댓글
ALTER TABLE `COMMENTS`
	ADD CONSTRAINT `FK_FEED_TO_COMMENTS` -- 피드 -> 댓글
	FOREIGN KEY (
	`FEED_CODE` -- 피드 번호
	)
	REFERENCES `FEED` ( -- 피드
	`CODE` -- 피드 번호
	);

-- 댓글
ALTER TABLE `COMMENTS`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_COMMENTS` -- 일반 회원 정보 -> 댓글
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 챌린지
ALTER TABLE `CHALLENGE`
	ADD CONSTRAINT `FK_ADMIN_ACCOUNT_TO_CHALLENGE` -- 관리자 정보 -> 챌린지
	FOREIGN KEY (
	`ADM_CODE` -- 등록 관리자 번호
	)
	REFERENCES `ADMIN_ACCOUNT` ( -- 관리자 정보
	`CODE` -- 관리자 고유 번호
	);

-- 챌린지 참여 상세 정보
ALTER TABLE `CHALLENGE_ENTRY`
	ADD CONSTRAINT `FK_CHALLENGE_TO_CHALLENGE_ENTRY` -- 챌린지 -> 챌린지 참여 상세 정보
	FOREIGN KEY (
	`CHAL_CODE` -- 챌린지 번호
	)
	REFERENCES `CHALLENGE` ( -- 챌린지
	`CODE` -- 챌린지 번호
	);

-- 챌린지 참여 상세 정보
ALTER TABLE `CHALLENGE_ENTRY`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_CHALLENGE_ENTRY` -- 일반 회원 정보 -> 챌린지 참여 상세 정보
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 피드 조회수 이력
ALTER TABLE `FEED_HIT_LOG`
	ADD CONSTRAINT `FK_FEED_TO_FEED_HIT_LOG` -- 피드 -> 피드 조회수 이력
	FOREIGN KEY (
	`FEED_CODE` -- 피드 번호
	)
	REFERENCES `FEED` ( -- 피드
	`CODE` -- 피드 번호
	);

-- 피드 조회수 이력
ALTER TABLE `FEED_HIT_LOG`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_FEED_HIT_LOG` -- 일반 회원 정보 -> 피드 조회수 이력
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 거래글 조회수 이력
ALTER TABLE `MARKET_PROD_HIT_LOG`
	ADD CONSTRAINT `FK_MARKET_PRODUCT_TO_MARKET_PROD_HIT_LOG` -- 마켓 등록 물품 -> 거래글 조회수 이력
	FOREIGN KEY (
	`PROD_CODE` -- 등록 물품 번호
	)
	REFERENCES `MARKET_PRODUCT` ( -- 마켓 등록 물품
	`CODE` -- 등록 물품 번호
	);

-- 거래글 조회수 이력
ALTER TABLE `MARKET_PROD_HIT_LOG`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_MARKET_PROD_HIT_LOG` -- 일반 회원 정보 -> 거래글 조회수 이력
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 거래글 찜
ALTER TABLE `MARKET_PROD_PICK`
	ADD CONSTRAINT `FK_MARKET_PRODUCT_TO_MARKET_PROD_PICK` -- 마켓 등록 물품 -> 거래글 찜
	FOREIGN KEY (
	`PROD_CODE` -- 등록 물품 번호
	)
	REFERENCES `MARKET_PRODUCT` ( -- 마켓 등록 물품
	`CODE` -- 등록 물품 번호
	);

-- 거래글 찜
ALTER TABLE `MARKET_PROD_PICK`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_MARKET_PROD_PICK` -- 일반 회원 정보 -> 거래글 찜
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 피드 해시태그
ALTER TABLE `FEED_HASHTAG`
	ADD CONSTRAINT `FK_FEED_TO_FEED_HASHTAG` -- 피드 -> 피드 해시태그
	FOREIGN KEY (
	`FEED_CODE` -- 피드 번호
	)
	REFERENCES `FEED` ( -- 피드
	`CODE` -- 피드 번호
	);

-- 신고 관리
ALTER TABLE `REPORT`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_REPORT` -- 일반 회원 정보 -> 신고 관리
	FOREIGN KEY (
	`MEM_CODE` -- 신고한 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 문의
ALTER TABLE `INQUIRY`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_INQUIRY` -- 일반 회원 정보 -> 문의
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);

-- 문의
ALTER TABLE `INQUIRY`
	ADD CONSTRAINT `FK_INQUIRY_TO_INQUIRY` -- 문의 -> 문의
	FOREIGN KEY (
	`ORIGIN_CODE` -- 재문의 번호
	)
	REFERENCES `INQUIRY` ( -- 문의
	`CODE` -- 문의 번호
	);

-- 일반 회원 활동 이력
ALTER TABLE `MEMBER_ACTIVITY_LOG`
	ADD CONSTRAINT `FK_MEMBER_ACCOUNT_TO_MEMBER_ACTIVITY_LOG` -- 일반 회원 정보 -> 일반 회원 활동 이력
	FOREIGN KEY (
	`MEM_CODE` -- 회원 번호
	)
	REFERENCES `MEMBER_ACCOUNT` ( -- 일반 회원 정보
	`CODE` -- 회원 번호
	);