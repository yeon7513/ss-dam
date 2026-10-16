import { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./ChallengeQuickMenu.module.scss";
import { formatImagePath } from "../../../utils/formatImagePath";

// 날짜 문자열("2026-06-01 00:00:00")을 "2026.06.01" 형식으로 가공하는 함수
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr.split(" ")[0].replace(/-/g, ".");
};

const ChallengeQuickMenu = () => {
  /* 인기 챌린지 목록 조회 */
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchQuickMenu = async () => {
      try {
        const response = await fetch("/api/challenge/popular");

        if (!response.ok) {
          console.warn("챌린지 목록 조회 실패 (HTTP 상태): ", response.status);
          return;
        }

        const result = await response.json();

        if (
          result.success &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          setPopular(result.data.slice(0, 3));
        }
      } catch (error) {
        console.error("서버 통신 에러: ", error);
      }
    };

    fetchQuickMenu();
  }, []);

  const [top1, top2, top3] = popular;

  const cardList = [
    { item: top2, rank: 2, isCenter: false },
    { item: top1, rank: 1, isCenter: true },
    { item: top3, rank: 3, isCenter: false },
  ];

  console.log(popular);

  return (
    /* 챌린지 퀵 메뉴 영역 */
    <section className={styles.quickMenus}>
      {/* 헤더 영역 */}
      <div className={styles.title}>
        <h2>지금 참여해보세요!</h2>
        <p>지금 가장 인기 있는 챌린지까지 만나보세요.</p>
      </div>

      {/* 카드 그리드 영역 */}
      <div className={styles.cardGrid}>
        {cardList.map(
          ({ item, rank, isCenter }) =>
            item && (
              <Link
                key={item.code}
                to={`/challenge/${item.code}`}
                className={cn(
                  styles.cardItem,
                  isCenter ? styles.centerCard : styles.sideCard,
                )}
              >
                {/* 썸네일 박스 */}
                <div className={styles.thumbnailBox}>
                  {item.imageUrl ? (
                    <img
                      src={formatImagePath(item.imageUrl)}
                      alt={item.title}
                      className={styles.thumbnailImg}
                    />
                  ) : (
                    <span className={styles.thumbnailIcon}>👑</span>
                  )}

                  {isCenter && <span className={styles.Badge}>인기챌린지</span>}
                </div>

                {/* 정보 영역 */}
                <div className={styles.infoBox}>
                  <span className={styles.rank}>{rank}</span>
                  <div className={styles.textGroup}>
                    <strong className={styles.cardTitle}>{item.title}</strong>
                    {/* 챌린지 기간 표시 (startDate ~ endDate) */}
                    <span className={styles.category}>
                      {item.startDate && item.endDate
                        ? `${formatDate(item.startDate)} ~ ${formatDate(
                            item.endDate,
                          )}`
                        : "기간 미정"}
                    </span>
                  </div>
                </div>
              </Link>
            ),
        )}
      </div>
    </section>
  );
};

export default ChallengeQuickMenu;
