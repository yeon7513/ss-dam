import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../../../components/common/pagination/Pagination';
import { formatImagePath } from '../../../utils/formatImagePath';

import styles from './ChallengeResult.module.scss';
import ChallengeResultFilters from './ChallengeResultFilters';
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";

const INITIAL_FILTERS = {
  fromDate: '',
  toDate: '',
  categoryCode: '',
  sort: 'LATEST',
  keyword: '',
};

const INITIAL_QUERY = {
  ...INITIAL_FILTERS,
  page: 1,
  perPage: 10,
  perGroup: 5,
};

function formatDate(value) {
  return value ? String(value).slice(0, 10) : '-';
}

function formatNumber(value) {
  return value == null ? '-' : Number(value).toLocaleString('ko-KR');
}

function formatRate(value) {
  if (value == null) return '-';

  return `${Number(value).toLocaleString('ko-KR', {
    maximumFractionDigits: 1,
  })}%`;
}

function paymentLabel(value) {
  if (value === true) return '포인트 지급 완료';
  if (value === false) return '포인트 지급 미완료';

  return '포인트 지급 여부 확인 불가';
}

export default function ChallengeResult({ categories = [] }) {
  // 입력 중인 검색 조건
  const [filters, setFilters] = useState({ ...INITIAL_FILTERS });

  // 실제 조회에 적용된 검색 조건
  const [query, setQuery] = useState({ ...INITIAL_QUERY });
  const [refreshKey, setRefreshKey] = useState(0);

  const [challenges, setChallenges] = useState([]);
  const [pager, setPager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadChallenges() {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();

      Object.entries(query).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          params.set(key, String(value));
        }
      });

      try {
        const response = await fetch(
          `/api/admin/challenge/result?${params.toString()}`,
          {
            credentials: 'include',
            signal: controller.signal,
          },
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || `종료 챌린지 조회 실패 (HTTP ${response.status})`,
          );
        }

        if (
          !Array.isArray(result.data?.content) ||
          !result.data?.pager ||
          !Array.isArray(result.data.pager.list)
        ) {
          throw new Error('목록 응답 형식이 올바르지 않습니다.');
        }

        if (!active) return;

        setChallenges(result.data.content);
        setPager(result.data.pager);

        setLastUpdated(
          `${new Date().toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          })} 조회`,
        );
      } catch (err) {
        if (!active || err.name === 'AbortError') return;

        setChallenges([]);
        setPager(null);
        setError(err.message || '종료 챌린지를 불러오지 못했습니다.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadChallenges();

    // 이전 요청의 응답이 최신 결과를 덮어쓰지 않도록 방지
    return () => {
      active = false;
      controller.abort();
    };
  }, [query, refreshKey]);

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setQuery({
      ...INITIAL_QUERY,
      ...filters,
      keyword: filters.keyword.trim(),
      page: 1,
    });
  };

  const handleReset = () => {
    setFilters({ ...INITIAL_FILTERS });
    setQuery({ ...INITIAL_QUERY });
  };

  const handleRefresh = () => {
    if (loading) return;

    setRefreshKey((previous) => previous + 1);
  };

  const handlePageChange = (page) => {
    if (
      loading ||
      !pager ||
      page < 1 ||
      page > pager.last ||
      page === query.page
    ) {
      return;
    }

    // 입력 중인 조건이 아닌, 적용된 조건으로 페이지 이동
    setQuery((previous) => ({
      ...previous,
      page,
    }));
  };

  return (
    <div className={styles.container}>
      <PanelHeader
        title="종료 데이터 분석"
        lastUpdated={lastUpdated}
        isSpinning={loading}
        handleRefresh={handleRefresh}
      />

      <ChallengeResultFilters
        filters={filters}
        categories={categories}
        loading={loading}
        onChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div className={styles.summary}>
        {loading
          ? '조회 중'
          : error
            ? '조회 실패'
            : `총 ${formatNumber(pager?.total ?? 0)}개`}
      </div>

      <section aria-label="종료 챌린지 목록" aria-busy={loading}>
        {loading ? (
          <p className={styles.message} role="status">
            종료 챌린지를 불러오는 중입니다.
          </p>
        ) : error ? (
          <div className={styles.message} role="alert">
            <p>{error}</p>
            <button type="button" onClick={handleRefresh}>
              다시 시도
            </button>
          </div>
        ) : challenges.length === 0 ? (
          <p className={styles.message}>
            조회 조건에 맞는 종료 챌린지가 없습니다.
          </p>
        ) : (
          <div className={styles.list}>
            {challenges.map((challenge) => (
              <Link
                key={challenge.code}
                to={`/admin/challenge-result/${challenge.code}`}
                className={styles.card}
              >
                <div className={styles.thumbnail}>
                  {challenge.thumbnail ? (
                    <img
                      src={formatImagePath(challenge.thumbnail)}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <span>이미지 없음</span>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.titleRow}>
                    <span className={styles.status}>종료</span>
                    <h2>{challenge.title}</h2>
                  </div>

                  <p className={styles.period}>
                    {formatDate(challenge.startDate)}
                    {' ~ '}
                    {formatDate(challenge.endDate)}
                  </p>

                  <p className={styles.description}>
                    {challenge.content || '등록된 설명이 없습니다.'}
                  </p>

                  <div className={styles.footer}>
                    <div className={styles.author}>
                      <strong>{challenge.adminId || '관리자'}</strong>
                      <span>{challenge.adminRole || ''}</span>
                    </div>

                    <div className={styles.badges}>
                      <span>{paymentLabel(challenge.rewardPaid)}</span>

                      <span>
                        평균 달성률{' '}
                        {formatRate(challenge.averageAchievementRate)}
                      </span>

                      <span>
                        참여 {formatNumber(challenge.participantCount)}명
                      </span>

                      <span>등록 {formatDate(challenge.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {!loading && !error && pager && pager.last > 1 && (
        <Pagination pager={pager} onChangePage={handlePageChange} />
      )}
    </div>
  );
}
