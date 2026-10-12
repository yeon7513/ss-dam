import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { formatImagePath } from '../../../utils/formatImagePath';
import styles from './ChallengeResultDetail.module.scss';
import ChallengeResultRanking from './ChallengeResultRanking';

function formatNumber(value) {
  if (value == null) return '-';

  return Number(value).toLocaleString('ko-KR', {
    maximumFractionDigits: 1,
  });
}

function formatDate(value) {
  return value ? String(value).slice(0, 10) : '-';
}

async function getData(url, signal) {
  const response = await fetch(url, {
    credentials: 'include',
    signal,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || `조회 실패 (HTTP ${response.status})`);
  }

  if (!result.data) {
    throw new Error('조회 결과가 없습니다.');
  }

  return result.data;
}

// 시간대별 인증 수 차트
function HourlyChart({ points }) {
  const sorted = [...points].sort((a, b) => a.hour - b.hour);
  const maxCount = Math.max(
    1,
    ...sorted.map((point) => Number(point.proofCount)),
  );

  return (
    <div
      className={styles.hourlyChart}
      role="img"
      aria-label="0시부터 23시까지 시간대별 인증 수"
    >
      {sorted.map((point) => (
        <div
          key={point.hour}
          className={styles.hourColumn}
          title={`${point.hour}시: ${formatNumber(point.proofCount)}개`}
        >
          <div className={styles.barTrack}>
            <div
              className={styles.bar}
              style={{
                height: `${(Number(point.proofCount) / maxCount) * 100}%`,
              }}
            />
          </div>

          <span>{point.hour}</span>
        </div>
      ))}
    </div>
  );
}

// 평균 달성률 차트
function AchievementChart({ rate }) {
  const value = Math.min(100, Math.max(0, Number(rate) || 0));

  return (
    <div className={styles.achievement}>
      <div
        className={styles.ring}
        style={{ '--rate': `${value}%` }}
        role="img"
        aria-label={`평균 달성률 ${formatNumber(value)}퍼센트`}
      >
        <div className={styles.ringInner}>
          <strong>{formatNumber(value)}%</strong>
          <span>평균 달성률</span>
        </div>
      </div>
    </div>
  );
}

// 지역별 참여 인원 차트
function RegionChart({ regions }) {
  const maxCount = Math.max(
    1,
    ...regions.map((region) => Number(region.participantCount)),
  );

  if (regions.length === 0) {
    return <p className={styles.emptyChart}>참여 인원이 없습니다.</p>;
  }

  return (
    <ul className={styles.regionList}>
      {regions.map((region) => (
        <li key={region.regionName}>
          <span className={styles.regionName}>{region.regionName}</span>

          <div className={styles.regionTrack}>
            <div
              className={styles.regionBar}
              style={{
                width: `${(Number(region.participantCount) / maxCount) * 100}%`,
              }}
            />
          </div>

          <span>{formatNumber(region.participantCount)}명</span>
        </li>
      ))}
    </ul>
  );
}

export default function ChallengeResultDetail() {
  const { code } = useParams();

  const [detail, setDetail] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadDetail() {
      setLoading(true);
      setError('');
      setDetail(null);
      setStatistics(null);

      try {
        const baseUrl = `/api/admin/challenge/result/${encodeURIComponent(code)}`;

        const [detailData, statisticsData] = await Promise.all([
          getData(baseUrl, controller.signal),
          getData(`${baseUrl}/statistics`, controller.signal),
        ]);

        if (
          !Array.isArray(statisticsData.hourlyProofs) ||
          !Array.isArray(statisticsData.regionParticipants)
        ) {
          throw new Error('통계 응답 형식이 올바르지 않습니다.');
        }

        if (!active) return;

        setDetail(detailData);
        setStatistics(statisticsData);
      } catch (err) {
        if (!active || err.name === 'AbortError') return;

        setError(err.message || '상세 정보를 불러오지 못했습니다.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDetail();

    return () => {
      active = false;
      controller.abort();
    };
  }, [code, retryKey]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/admin/challenge-result" className={styles.backLink}>
          ← 목록
        </Link>

        <h1>{detail?.title || '종료 챌린지 상세'}</h1>
      </header>

      {loading ? (
        <p className={styles.message} role="status">
          종료 결과를 불러오는 중입니다.
        </p>
      ) : error ? (
        <div className={styles.message} role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setRetryKey((previous) => previous + 1)}
          >
            다시 시도
          </button>
        </div>
      ) : detail && statistics ? (
        <>
          <section className={styles.panel}>
            <h2>챌린지 정보</h2>

            <div className={styles.infoLayout}>
              <div className={styles.thumbnail}>
                {detail.thumbnail ? (
                  <img
                    src={formatImagePath(detail.thumbnail)}
                    alt={`${detail.title} 대표 이미지`}
                  />
                ) : (
                  <span>이미지 없음</span>
                )}
              </div>

              <dl className={styles.info}>
                <div>
                  <dt>카테고리</dt>
                  <dd>{detail.categoryName || '-'}</dd>
                </div>

                <div>
                  <dt>시작일</dt>
                  <dd>{formatDate(detail.startDate)}</dd>
                </div>

                <div>
                  <dt>종료일</dt>
                  <dd>{formatDate(detail.endDate)}</dd>
                </div>

                <div>
                  <dt>참여 보상</dt>
                  <dd>
                    {detail.pointEarned == null
                      ? '-'
                      : `${formatNumber(detail.pointEarned)}포인트`}
                  </dd>
                </div>

                <div>
                  <dt>참여 정원</dt>
                  <dd>
                    {detail.maxParticipants == null
                      ? '제한 없음'
                      : `${formatNumber(detail.maxParticipants)}명`}
                  </dd>
                </div>

                <div>
                  <dt>목표</dt>
                  <dd>{detail.goal || '-'}</dd>
                </div>

                <div>
                  <dt>작성자</dt>
                  <dd>{detail.adminId || '-'}</dd>
                </div>

                <div>
                  <dt>등록일</dt>
                  <dd>{formatDate(detail.createdAt)}</dd>
                </div>

                <div>
                  <dt>상태</dt>
                  <dd>종료</dd>
                </div>

                <div>
                  <dt>지급 포인트</dt>
                  <dd>
                    {detail.totalPaidPoints == null
                      ? '확인 불가'
                      : `${formatNumber(detail.totalPaidPoints)}포인트`}
                  </dd>
                </div>
              </dl>
            </div>

            {detail.content && (
              <p className={styles.description}>{detail.content}</p>
            )}
          </section>

          <section className={styles.metrics} aria-label="최종 요약 통계">
            <div className={styles.metric}>
              <span>최종 인증 피드</span>
              <strong>{formatNumber(statistics.proofCount)}개</strong>
            </div>

            <div className={styles.metric}>
              <span>총 참여 인원</span>
              <strong>{formatNumber(statistics.participantCount)}명</strong>
            </div>

            <div className={styles.metric}>
              <span>인증글 평균 좋아요</span>
              <strong>{formatNumber(statistics.averageLikeCount)}개</strong>
            </div>

            <div className={styles.metric}>
              <span>평균 달성률</span>
              <strong>
                {formatNumber(statistics.averageAchievementRate)}%
              </strong>
            </div>

            <div className={styles.metric}>
              <span>참여자 성공률</span>
              <strong>{formatNumber(statistics.successRate)}%</strong>
            </div>
          </section>

          <section className={styles.charts} aria-label="최종 통계 차트">
            <div className={styles.panel}>
              <h2>시간대별 인증 수</h2>
              <p className={styles.chartHint}>
                전체 진행 기간 · 0~23시 · 막대에 마우스를 올리면 건수 표시
              </p>

              <HourlyChart points={statistics.hourlyProofs} />
            </div>

            <div className={styles.panel}>
              <h2>챌린지 달성률</h2>

              <AchievementChart rate={statistics.averageAchievementRate} />
            </div>

            <div className={styles.panel}>
              <h2>지역별 참여 인원</h2>

              <RegionChart regions={statistics.regionParticipants} />
            </div>
          </section>

          <ChallengeResultRanking key={code} code={code} />
        </>
      ) : null}
    </div>
  );
}
