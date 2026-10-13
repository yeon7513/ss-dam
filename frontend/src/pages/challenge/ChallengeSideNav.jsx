import cn from "classnames";
import { Link } from "react-router-dom";
import Sidebar from "../../layout/default/sidebar/Sidebar.jsx";
import ImageBox from "../../components/common/image-box/ImageBox";
import styles from "./ChallengeSideNav.module.scss";   // Sidebar import 뒤

function ChallengeSideNav({ className, challenges = [] }) {
    return (
        <div className={styles.wrap}>
            <Sidebar className={cn(styles.challengeNav, className)} isFixed={false}>
                <li className={styles.header}>
                    <h3>인기 챌린지</h3>
                </li>

                <li className={styles.list}>
                    <ul>
                        {challenges.length > 0 ? (
                            challenges.map((item, index) => (
                                <li key={item.code}>
                                    <Link to={`/challenge/${item.code}`} className={styles.item}>
                                        <div className={styles.thumb}>
                                            <ImageBox src={item.imageUrl} alt={item.title} />
                                        </div>
                                        <div className={styles.info}>
                                            <span className={styles.rank}>TOP {index + 1}</span>
                                            <strong className={styles.title}>{item.title}</strong>
                                            <span className={styles.count}>
                        {item.participantCount ?? 0}명 참여
                      </span>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className={styles.empty}>인기 챌린지가 없습니다.</li>
                        )}
                    </ul>
                </li>
            </Sidebar>
        </div>
    );
}

export default ChallengeSideNav;