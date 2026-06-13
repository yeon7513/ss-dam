import cn from "classnames";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ChallengeQuickMenu.module.scss";

const ChallengeQuickMenu = () => {
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9090/challenge")
      .then((res) => res.json())
      .then((data) => {
        const popularList = data.slice(0, 3);
        const latestItem = data[data.length - 1];

        setPopular(popularList);
        setLatest(latestItem);
        setSelected(popularList[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const challengeList = latest ? [...popular, latest] : popular;

  return (
    <section className={styles.quickMenus}>
      <div className={styles.title}>
        <h2>지금 참여해보세요!</h2>
        <p>새롭게 열린 미션부터 지금 가장 인기 있는 챌린지까지 만나보세요.</p>
      </div>

      <div className={styles.challengeBox}>
        {selected && (
          <Link
            className={styles.thumbnailBox}
            to={`/challenge/${selected.code}`}
          >
            <div className={styles.thumbnail}>
              <span className={styles.thumbnailIcon}>🌱</span>
              <strong>{selected.title}</strong>
              <p>클릭하면 챌린지 상세페이지로 이동합니다.</p>
            </div>
          </Link>
        )}

        <ul className={styles.contents}>
          {challengeList.map((item, index) => (
            <li
              key={item.code}
              className={cn(styles.menu, {
                [styles.active]: selected?.code === item.code,
              })}
              onMouseEnter={() => setSelected(item)}
            >
              <Link className={styles.menuLink} to={`/challenge/${item.code}`}>
                <div className={styles.menuText}>
                  <span className={styles.rank}>
                    {index === 3 ? "NEW" : `TOP ${index + 1}`}
                  </span>
                  <strong>{item.title}</strong>
                </div>

                <span className={styles.moreBtn}>더 보기</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChallengeQuickMenu;
