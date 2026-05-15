import React from "react";
import styles from "./ChallengeGuide.module.scss";

const ChallengeGuide = () => {
  const steps = [
    {
      num: 1,
      icon: "📄",
      title: "챌린지 선택",
      desc: "참여하고 싶은 챌린지를\n선택하고 내용을 확인해요.",
    },
    {
      num: 2,
      icon: "📋",
      title: "참여하기",
      desc: "챌린지 상세 페이지에서\n‘참여하기’ 버튼을 눌러요.",
    },
    {
      num: 3,
      icon: "📷",
      title: "미션 실천 & 인증하기",
      desc: "미션을 실천하고 인증 사진과\n내용을 업로드해요.",
    },
    {
      num: 4,
      icon: "☆",
      title: "인증 완료",
      desc: "관리자가 인증을 확인하면\n‘인증 완료’ 상태가 돼요.",
    },
    {
      num: 5,
      icon: "🎁",
      title: "포인트 & 보상 받기",
      desc: "챌린지 완료 시 포인트와\n뱃지를 받을 수 있어요.",
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>소개 &gt; 챌린지 이용 가이드</div>

      <section className={styles.titleBox}>
        <h1>챌린지 이용 가이드</h1>
        <p>쓰담쓰담 챌린지에 참여하고 포인트와 다양한 혜택을 받아보세요!</p>
        <p>참여 방법부터 인증 기준까지 자세히 안내해 드려요.</p>
      </section>

      <section className={styles.stepSection}>
        <h2>챌린지 참여 방법</h2>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>{step.num}</span>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>

              {index !== steps.length - 1 && (
                <div className={styles.arrow}>›</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className={styles.infoList}>
        <article className={styles.infoCard}>
          <div className={styles.cardTitle}>
            <div className={styles.bigIcon}>📷</div>
            <h2>인증 방법 안내</h2>
          </div>

          <div className={styles.cardContent}>
            <div className={styles.row}>
              <span>📷</span>
              <strong>사진 인증</strong>
              <p>
                실천한 내용을 잘 보여주는 사진을 업로드해 주세요.
                <br />
                예: 텀블러, 다회용기, 장바구니 사용 등
              </p>
            </div>

            <div className={styles.row}>
              <span>✏️</span>
              <strong>내용 작성</strong>
              <p>
                실천 내용과 느낀 점을 20자 이상 작성해 주세요.
                <br />
                예: “오늘 장보기! 비닐 대신 장바구니 사용했어요.”
              </p>
            </div>

            <div className={styles.row}>
              <span>✓</span>
              <strong>제출하기</strong>
              <p>
                사진과 내용을 확인한 후 ‘제출하기’ 버튼을 눌러 인증을 완료해
                주세요.
              </p>
            </div>
          </div>
        </article>

        <article className={styles.infoCard}>
          <div className={styles.cardTitle}>
            <div className={styles.bigIcon}>🏅</div>
            <h2>인정 기준</h2>
          </div>

          <div className={styles.cardContent}>
            <ul className={styles.checkList}>
              <li>챌린지 기간 내에 제출된 인증만 인정됩니다.</li>
              <li>사진은 본인이 직접 촬영한 사진이어야 합니다.</li>
              <li>미션과 관련 없는 사진은 인증이 취소될 수 있습니다.</li>
              <li>1일 1회 인증이 가능하며, 중복 인증은 인정되지 않습니다.</li>
              <li>비공개 계정은 인증 확인이 어려울 수 있습니다.</li>
            </ul>

            <div className={styles.tipBox}>
              <strong>💡 TIP</strong>
              <span>
                인증 사진은 밝고 선명하게, 실천 내용이 잘 보이도록 촬영하면
                인증이 더 빠르게 완료돼요!
              </span>
            </div>
          </div>
        </article>

        <article className={styles.infoCard}>
          <div className={styles.cardTitle}>
            <div className={styles.bigIcon}>🍃</div>
            <h2>챌린지 예시</h2>
          </div>

          <div className={styles.exampleContent}>
            <div className={styles.exampleBox}>
              <h3>일회용컵 사용 줄이기 챌린지</h3>
              <p>
                <strong>참여 기간</strong> 2026.05.01 ~ 2026.05.31
              </p>
              <p>
                <strong>미션 내용</strong> 카페에서 일회용컵 대신 텀블러
                사용하기
              </p>
              <p>
                <strong>인증 방법</strong> 텀블러 사용 사진 + 내용 작성
              </p>
              <p>
                <strong>보상</strong> 500그루 + 챌린지 뱃지
              </p>
            </div>

            <div className={styles.photoBox}>
              <h3>인증 예시</h3>
              <div className={styles.photoArea}></div>
              <p>
                오늘도 텀블러로 커피 한 잔!
                <br />
                일회용컵 대신 텀블러 사용 완료했어요 :)
                <br />
                #일회용컵줄이기 #텀블러사용
              </p>
            </div>
          </div>
        </article>
      </section>

      <div className={styles.notice}>
        <strong>!</strong>
        <b>유의사항</b>
        <span>
          부정한 방법으로 참여 시 포인트 회수 및 서비스 이용에 제한이 있을 수
          있습니다. 챌린지 관련 문의는 고객센터를 이용해 주세요.
        </span>
      </div>
    </main>
  );
};

export default ChallengeGuide;
