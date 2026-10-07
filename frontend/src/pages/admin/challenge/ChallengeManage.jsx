import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DashboardHeader from '../../../components/admin/dashboard-header/DashboardHeader';
import Pagination from '../../../components/common/pagination/Pagination';
import ChallengeManageFilters from '../challenge-manage/ChallengeManageFilters';
import styles from './ChallengeManage.module.scss';

const INITIAL_FILTERS = {
  page: 1,
  perPage: 10,
  perGroup: 5,
  fromDate: '',
  toDate: '',
  progressStatus: '',
  postStatus: '',
  sort: 'LATEST',
  keyword: '',
  deleted: false,
};

export default function ChallengeManage() {
  const [challenges, setChallenges] = useState([]);
  const [pager, setPager] = useState(null);

  const [searchParams, setSearchParams] = useState(INITIAL_FILTERS);

  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const [currentTime, setCurrentTime] = useState(
    () => `${new Date().toLocaleString('sv-SE')} 기준`,
  );

  const fetchChallenges = useCallback(async () => {
    setLoading(true);
    setLoadError('');

    const query = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      // false도 deleted=false로 전달해야 하므로 null·빈 문자열만 제외
      if (value !== '' && value !== null && value !== undefined) {
        query.append(key, value);
      }
    });

    try {
      const response = await fetch(`/api/admin/challenge?${query.toString()}`, {
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `챌린지 목록 조회 실패 (HTTP ${response.status})`,
        );
      }

      if (!Array.isArray(result.data?.content)) {
        throw new Error('챌린지 목록 응답 형식이 올바르지 않습니다.');
      }

      setChallenges(result.data.content);
      setPager(result.data.pager);
      setCurrentTime(`${new Date().toLocaleString('sv-SE')} 기준`);
    } catch (error) {
      console.error('챌린지 목록 조회 실패:', error);

      setLoadError(
        error instanceof TypeError
          ? '서버에 연결할 수 없습니다.'
          : error.message || '챌린지 목록을 불러오지 못했습니다.',
      );
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const handleFilterChange = (name, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handleSearch = (keyword) => {
    setSearchParams((prev) => ({
      ...prev,
      keyword,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleReset = () => {
    setSearchParams(INITIAL_FILTERS);
  };

  const handleRefresh = async () => {
    if (loading || isSpinning) return;

    setIsSpinning(true);

    try {
      await fetchChallenges();
    } finally {
      setTimeout(() => {
        setIsSpinning(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <DashboardHeader
          title="챌린지 진행 현황"
          lastUpdated={currentTime}
          isSpinning={isSpinning}
          handleRefresh={handleRefresh}
        />

        <Link
          to="/admin/challenge_manage/register"
          className={styles.registerButton}
        >
          챌린지 등록
        </Link>
      </div>

      <ChallengeManageFilters
        filters={searchParams}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {loading ? (
        <p>챌린지 목록을 불러오는 중입니다.</p>
      ) : loadError ? (
        <p role="alert">{loadError}</p>
      ) : challenges.length === 0 ? (
        <p>조회된 챌린지가 없습니다.</p>
      ) : (
        <div className={styles.challengeList}>
          {challenges.map((challenge) => (
            <Link
              key={challenge.code}
              to={`/admin/challenge_manage/${challenge.code}`}
              className={styles.challengeCard}
            >
              <div className={styles.thumbnail}>
                {challenge.thumbnail ? (
                  <img
                    src={challenge.thumbnail}
                    alt={`${challenge.title} 대표 이미지`}
                  />
                ) : (
                  <span>이미지 없음</span>
                )}
              </div>

              <div className={styles.cardContent}>
                <div className={styles.titleRow}>
                  <span className={styles.status}>
                    {challenge.progressStatus}
                  </span>
                  <h2>{challenge.title}</h2>
                </div>

                <p>
                  {challenge.startDate} ~ {challenge.endDate}
                </p>

                <p className={styles.description}>{challenge.content}</p>

                <div className={styles.meta}>
                  <span>참여자 {challenge.participantCount ?? 0}명</span>
                  <span>달성률 {challenge.achievementRate ?? 0}%</span>
                  <span>{challenge.postStatus}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && !loadError && (
        <Pagination pager={pager} onChangePage={handlePageChange} />
      )}
    </div>
  );
}
