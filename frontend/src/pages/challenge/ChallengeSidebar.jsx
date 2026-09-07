import { useState, useEffect } from "react";
import { CHALLENGE_TABS } from "../../lib/challengeTabs";
import TabMenus from "../../components/common/tab-menus/TabMenus";
import styles from "./ChallengeSidebar.module.scss";

const ChallengeSidebar = ({ selectedCode, onSelectChallenge }) => {
  const [activeStatus, setActiveStatus] = useState("IN_PROGRESS");
  const [challengeList, setChallengeList] = useState([]);

  const currentTabLabel = CHALLENGE_TABS.find(
    (tab) => tab.value === activeStatus,
  )?.label;

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch(
          `/api/user/challenge?progressStatus=${activeStatus}`,
        );
        const result = await response.json();
        console.log("사이드바 API 응답 결과:", result);

        if (response.ok && result.success) {
          const list = result.data || [];
          setChallengeList(list);

          if (list.length > 0 && onSelectChallenge) {
            onSelectChallenge(list[0].code);
          }
        }
      } catch (error) {
        console.error("챌린지 목록 조회 오류", error);
      }
    };

    fetchChallenges();
  }, [activeStatus, onSelectChallenge]);

  return (
    <aside className={styles.sidebarContainer}>
      <h3 className={styles.title}>챌린지 목록</h3>

      <TabMenus
        tabs={CHALLENGE_TABS}
        activeStatus={activeStatus}
        onTabChange={(status) => setActiveStatus(status)}
      />

      <div className={styles.cardList}>
        {challengeList.map((item) => {
          const isSelected = Number(selectedCode) === Number(item.code);

          return (
            <div
              key={item.code}
              className={`${styles.card} ${isSelected ? styles.selectedCard : ""}`}
              onClick={() => onSelectChallenge && onSelectChallenge(item.code)}
            >
              <div className={styles.thumbnailBox}>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={styles.thumbImg}
                  />
                ) : (
                  <div className={styles.heroMini}>
                    <div className={styles.sunMini} />
                    <div className={styles.mountainMini1} />
                    <div className={styles.mountainMini2} />
                    <div className={styles.groundMini} />
                  </div>
                )}
              </div>

              <div className={styles.cardInfo}>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <span className={styles.badge}>{currentTabLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default ChallengeSidebar;
