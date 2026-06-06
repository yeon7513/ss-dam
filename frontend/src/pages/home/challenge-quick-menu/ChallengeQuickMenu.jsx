import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./ChallengeQuickMenu.module.scss";

// 서버에서 챌린지 인기 순위 1, 2, 3위와 최신 등록된 챌린지 1개를 받아와 렌더링 할 예정
// 링크의 path는 챌린지 코드로 맞추면 될 듯 함.
const ChallengeQuickMenu = () => {
  return (
    <section className={styles.container}>
      <ul className={styles.quickMenus}>
        <li className={cn(styles.menu, styles.popular)}>
          <Link to="">챌린지 인기 1위</Link>
        </li>
        <li className={cn(styles.menu, styles.popular)}>
          <Link to="">챌린지 인기 2위</Link>
        </li>
        <li className={cn(styles.menu, styles.popular)}>
          <Link to="">챌린지 인기 3위</Link>
        </li>
        <li className={cn(styles.menu, styles.new)}>
          <Link to="">최신 등록 챌린지</Link>
        </li>
      </ul>
    </section>
  );
};

export default ChallengeQuickMenu;
