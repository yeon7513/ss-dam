import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TabMenus from "../../components/common/tab-menus/TabMenus";
import styles from "./Challenge.module.scss";
import { CHALLENGE_TABS } from "../../lib/challengeTabs";

const MAIN_TABS = [
  { label: "전체 챌린지", value: "ALL" },
  { label: "인기 챌린지", value: "POPULAR" },
];
const Challenge = () => {
  const [activeTab, setActiveTab] = useState(MAIN_TABS[0].value);
  const [challenges, setChallenges] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const url =
          activeTab === "ALL"
            ? "/api/user/challenge"
            : "/api/user/challenge/popular";

        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setChallenges(result.data || []);
        }
      } catch (error) {
        console.error("랭킹 데이터 조회 실패", error);
      }
    };

    fetchChallenges();
  }, [activeTab]);

  useEffect(() => {
    const fetchRnking = async () => {
      try {
        const response = await fetch("/api/user/challenge/ranking");
        if (response.ok) {
          const result = await response.json();
          setRanking(result.data || []);
        }
      } catch (error) {
        console.error("랭킹 데이터 조회 실패", error);
      }
    };
    fetchRnking();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <TabMenus
          tabs={MAIN_TABS}
          activeStatus={activeTab}
          onTabChange={setActiveTab}
        />
        <h4>
          {activeTab === "ALL" ? "전체 챌린지" : "인기 챌린지"} 목록 (
          {challenges.length}개)
        </h4>
        <ul>
          {challenges.map((item) => (
            <li key={item.code}>
              <Link to={`/challenge/${item.code}`}>
                <b>[{item.code}]</b>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        {challenges.length === 0 && (
          <p className={styles.emptyMsg}>표시할 챌린지가 없습니다.</p>
        )}
      </section>

      <section className={styles.section}>
        <h3>사용자 TOP 랭킹</h3>
        <ol>
          {ranking.map((user, index) => (
            <li key={user.code || index}>
              <b>{index + 1}위</b> {user.name} (랭킹/점수: {user.point ?? 0}
              그루)
            </li>
          ))}
        </ol>
        {ranking.length === 0 && (
          <p className={styles.emptyMsg}>랭킹 데이터가 존재하지 않습니다.</p>
        )}
      </section>
    </div>
  );
};

export default Challenge;
