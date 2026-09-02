import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TabMenus from "../../components/common/tab-manus/TabMenus";
import styles from "./Challenge.module.scss";
import { CHALLENGE_TABS } from "../../lib/challengeTabs";

const Challenge = () => {
  const [status, setStatus] = useState(CHALLENGE_TABS[0].value);
  const [ChallengeList, setChallengeList] = useState([]);
  const [popularChallenges, setPopularChallenges] = useState([]);
  const [latestChallenge, setLatestChallenge] = useState(null);

  useEffect(() => {
    const fetchHighlightData = async () => {
      try {
        const [popularResponse, latestResponse] = await Promise.all([
          fetch("/api/user/challenge/popular"),
          fetch("/api/user/challenge/latest"),
        ]);
        if (popularResponse.ok) {
          const popularJson = await popularResponse.json();
          setPopularChallenges(popularJson.data || []);
        }
        if (latestResponse.ok) {
          const latestJson = await latestResponse.json();
          setLatestChallenge(latestJson.data || null);
        }
      } catch (error) {
        console.error("하이라이트 데이터 불러오기 실패", error);
      }
    };

    fetchHighlightData();
  }, []);

  useEffect(() => {
    const fetchChallengesByStatus = async () => {
      try {
        const response = await fetch(
          `/api/user/challenge?progressStatus=${status}`,
        );
        if (response.ok) {
          const json = await response.json();
          setChallengeList(json.data || []);
        }
      } catch (error) {
        console.error("챌린지 목록 조회 에러", error);
      }
    };

    fetchChallengesByStatus();
  }, [status]);

  // 테스트 용도로 걍 제미나이한테 받아서 박아놓음
  return (
    <div className={styles.container}>
      <h1>데이터 연동 테스트 페이지</h1>
      {/*챌린지 디테일 라우팅은 :code로 되어있긴 한데 챌린지쪽 화면이랑 디테일쪽 챌린지에 따른 화면을 안만들어놓아서 그냥 임시로 이렇게 박아놓았습니다 */}
      <section className={styles.section}>
        <Link to="/challenge/ChallengeDetail">챌린지 디테일로 임시 이동</Link>
      </section>
      {/* 인기 챌린지 테스트 */}
      <section className={styles.section}>
        <h3>인기 챌린지 TOP 3</h3>
        <ul>
          {popularChallenges.map((item) => (
            <li key={item.code}>
              <b>[{item.code}]</b> {item.title}
            </li>
          ))}
        </ul>
        {popularChallenges.length === 0 && (
          <p className={styles.emptyMsg}>인기 챌린지 데이터 없음</p>
        )}
      </section>

      {/* 최신 챌린지 테스트 */}
      <section className={styles.section}>
        <h3>방금 열린 챌린지</h3>
        {latestChallenge ? (
          <p>
            <b>[{latestChallenge.code}]</b> {latestChallenge.title}
          </p>
        ) : (
          <p className={styles.emptyMsg}>최신 챌린지 데이터 없음</p>
        )}
      </section>

      {/* 탭 메뉴 및 필터링 리스트 테스트 */}
      <section className={styles.section}>
        <h3>
          탭 필터링 (현재 선택된 상태:{" "}
          <span className={styles.statusText}>{status}</span>)
        </h3>

        {/* 탭 컴포넌트 동작 확인 */}
        <TabMenus
          tabs={CHALLENGE_TABS}
          activeStatus={status}
          onTabChange={setStatus}
        />

        {/* 필터링된 목록 데이터 출력 */}
        <h4>목록 결과 ({ChallengeList.length}개)</h4>
        <ul>
          {ChallengeList.map((item) => (
            <li key={item.code}>
              제목: <b>{item.title}</b> | 상태: {item.progressStatus} | 코드:{" "}
              {item.code}
            </li>
          ))}
        </ul>

        {ChallengeList.length === 0 && (
          <p className={styles.emptyMsg}>해당하는 챌린지가 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default Challenge;
