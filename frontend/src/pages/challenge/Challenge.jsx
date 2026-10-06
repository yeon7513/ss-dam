import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoadData } from "../../hooks/useLoadData.js";
import styles from "./Challenge.module.scss";
import Card from "../../components/common/card/Card";
import ImageBox from "../../components/common/image-box/ImageBox";
import ChallengeSidebar from "./ChallengeSidebar";
import TabMenus from "../../components/common/tab-menus/TabMenus";
import Pagination from "../../components/common/pagination/Pagination";
import { CHALLENGE_TABS } from "../../lib/challengeTabs";

const Challenge = () => {
  const [activeTab, setActiveTab] = useState("IN_PROGRESS");
  const [page, setPage] = useState(1);

  const { data, loading, error, message } = useLoadData(
      `/api/challenge?progressStatus=${activeTab}`,
  );

  const challenges = data || [];

  const PER_PAGE = 5;
  const last = Math.max(1, Math.ceil(challenges.length / PER_PAGE));

  const pager = {
    page,
    list: Array.from({ length: last }, (_, i) => i + 1),
  };

  const pagedChallenges = challenges.slice(
      (page - 1) * PER_PAGE,
      page * PER_PAGE,
  );

  return (
      <main className={styles.wrap}>
        <div className={styles.sideNavWrap}>
          <ChallengeSidebar />
        </div>

        <div className={styles.container}>
          <div className={styles.filterBar}>
            <TabMenus
                className={styles.tabs}
                tabs={CHALLENGE_TABS}
                activeStatus={activeTab}
                onTabChange={(value) => {
                  setActiveTab(value);
                  setPage(1);
                }}
            />
          </div>

          {loading ? (
              <div className={styles.emptyState}>
                챌린지를 불러오는 중입니다.
              </div>
          ) : error ? (
              <div className={styles.emptyState}>
                챌린지 목록을 불러오지 못했습니다.
                {message && <span>{message}</span>}
              </div>
          ) : (
              <>
                <div className={styles.list}>
                  {pagedChallenges.length > 0 ? (
                      pagedChallenges.map((challenge) => (
                          <Link
                              key={challenge.code}
                              to={`/challenge/${challenge.code}`}
                              className={styles.link}
                          >
                            <Card className={styles.card}>
                              <div className={styles.thumb}>
                                <ImageBox
                                    src={challenge.imageUrl}
                                    alt={challenge.title}
                                />
                              </div>

                              <div className={styles.body}>
                                <div className={styles.head}>
                          <span className={styles.status}>
                            {
                              CHALLENGE_TABS.find(
                                  (tab) =>
                                      tab.value === challenge.progressStatus,
                              )?.label
                            }
                          </span>

                                  <h3>{challenge.title}</h3>
                                </div>

                                <p className={styles.period}>
                                  {challenge.startDate?.slice(0, 10)} -{" "}
                                  {challenge.endDate?.slice(0, 10)}
                                </p>

                                <p className={styles.desc}>
                                  {challenge.content}
                                </p>
                              </div>
                            </Card>
                          </Link>
                      ))
                  ) : (
                      <p className={styles.emptyState}>
                        표시할 챌린지가 없습니다.
                      </p>
                  )}
                </div>

                {challenges.length > 0 && (
                    <Pagination
                        pager={pager}
                        onChangePage={setPage}
                    />
                )}
              </>
          )}
        </div>
      </main>
  );
};

export default Challenge;