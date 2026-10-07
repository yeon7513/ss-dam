import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import DashboardHeader from '../../../components/admin/dashboard-header/DashboardHeader';
import Pagination from '../../../components/common/pagination/Pagination';
import { formatImagePath } from '../../../utils/formatImagePath';

import styles from './ChallengeManageDetail.module.scss';

const STATUS_LABELS = {
  WAITING: '대기',
  IN_PROGRESS: '진행 중',
  ENDED: '종료',
};

const formatDate = (value) =>
  value ? String(value).replace('T', ' ').slice(0, 16) : '-';

const formatNumber = (value) =>
  value == null ? '-' : Number(value).toLocaleString('ko-KR');

function formatChange(value) {
  if (value == null) return '전일 대비 계산 불가';

  const number = Number(value);
  return `전일 동시간 대비 ${number > 0 ? '+' : ''}${number}%`;
}

// 이 페이지의 상세·통계·순위 조회에서 공통으로 사용
function useChallengeData(url, refreshKey) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setState({ data: null, loading: true, error: '' });

      try {
        const response = await fetch(url, {
          credentials: 'include',
          signal: controller.signal,
        });

        const result = await response.json().catch(() => null);

        if (!response.ok || !result?.success) {
          const messages = {
            401: '로그인이 필요합니다.',
            403: '조회 권한이 없습니다.',
            404: '조회할 데이터가 없습니다.',
          };

          throw new Error(
            messages[response.status] ||
              result?.message ||
              '데이터를 불러오지 못했습니다.',
          );
        }

        if (result.data == null) {
          throw new Error('응답 데이터가 없습니다.');
        }

        if (!controller.signal.aborted) {
          setState({
            data: result.data,
            loading: false,
            error: '',
          });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            data: null,
            loading: false,
            error:
              error instanceof TypeError
                ? '서버에 연결할 수 없습니다.'
                : error.message,
          });
        }
      }
    }

    load();

    return () => controller.abort();
  }, [url, refreshKey]);

  return state;
}

function ChallengeImage({ path, title }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.thumbnail}>
      {path && !failed ? (
        <img
          src={formatImagePath(path)}
          alt={`${title} 대표 이미지`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span>등록된 이미지가 없습니다.</span>
      )}
    </div>
  );
}

function StatCard({ title, value, description }) {
  return (
    <article className={styles.statCard}>
      <span>{title}</span>
      <strong>{value}</strong>
      {description && <small>{description}</small>}
    </article>
  );
}

function ParticipantChart({ points }) {
  if (!points.length) {
    return <p className={styles.message}>시간별 데이터가 없습니다.</p>;
  }

  const maxCount = Math.max(
    1,
    ...points.flatMap((point) => [
      Number(point.todayCount ?? 0),
      Number(point.yesterdayCount ?? 0),
    ]),
  );

  return (
    <>
      <div className={styles.legend}>
        <span>
          <i className={styles.todayDot} /> 오늘
        </span>
        <span>
          <i className={styles.yesterdayDot} /> 어제
        </span>
      </div>

      <p className={styles.chartNote}>
        시간별 신규 참여자 · 세로축 최대 {formatNumber(maxCount)}명
      </p>

      <div className={styles.chartScroll}>
        <div className={styles.barChart}>
          {points.map((point) => {
            const today = point.todayCount;
            const yesterday = point.yesterdayCount;

            return (
              <div className={styles.hourColumn} key={point.hour}>
                <div
                  className={styles.barPair}
                  role="img"
                  aria-label={`${point.hour}시: 오늘 ${
                    today == null ? '미집계' : `${today}명`
                  }, 어제 ${yesterday}명`}
                  title={`${point.hour}시 · 오늘 ${
                    today == null ? '미집계' : `${today}명`
                  } / 어제 ${yesterday}명`}
                >
                  <div
                    className={styles.todayBar}
                    style={{
                      height:
                        today == null ? '0%' : `${(today / maxCount) * 100}%`,
                    }}
                  />

                  <div
                    className={styles.yesterdayBar}
                    style={{
                      height: `${(yesterday / maxCount) * 100}%`,
                    }}
                  />
                </div>

                <span className={styles.hourLabel}>
                  {point.hour % 3 === 0 ? `${point.hour}시` : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className={styles.chartNote}>
        오늘 아직 도달하지 않은 시간은 미집계 상태입니다.
      </p>
    </>
  );
}

function AchievementChart({ value }) {
  const rate = value == null ? null : Math.min(100, Math.max(0, Number(value)));

  return (
    <>
      <div className={styles.legend}>
        <span>
          <i className={styles.todayDot} /> 달성률
        </span>
        <span>
          <i className={styles.yesterdayDot} /> 남은 비율
        </span>
      </div>

      <div className={styles.gauge}>
        <svg
          viewBox="0 0 200 200"
          role="img"
          aria-label={rate == null ? '달성률 데이터 없음' : `달성률 ${rate}%`}
        >
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="#e2e5ea"
            strokeWidth="16"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="75 100"
            transform="rotate(135 100 100)"
          />

          {rate > 0 && (
            <circle
              cx="100"
              cy="100"
              r="75"
              fill="none"
              stroke="#858e99"
              strokeWidth="16"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray={`${rate * 0.75} 100`}
              transform="rotate(135 100 100)"
            />
          )}

          <text x="100" y="160" textAnchor="middle">
            {rate == null ? '-' : `${rate}%`}
          </text>
        </svg>
      </div>
    </>
  );
}

function ChallengeRanking({ code, refreshKey }) {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useChallengeData(
    `/api/admin/challenge/${encodeURIComponent(code)}/ranking` +
      `?page=${page}&perPage=10&perGroup=5`,
    refreshKey,
  );

  const rows = data?.content ?? [];

  return (
    <section className={styles.panel}>
      <h2>챌린지 참여 순위</h2>

      {loading ? (
        <p className={styles.message}>순위를 불러오는 중입니다.</p>
      ) : error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : rows.length === 0 ? (
        <p className={styles.message}>참여자가 없습니다.</p>
      ) : (
        <>
          <div className={styles.tableScroll}>
            <table className={styles.rankingTable}>
              <thead>
                <tr>
                  <th scope="col">순위</th>
                  <th scope="col">회원</th>
                  <th scope="col">인증글 수</th>
                  <th scope="col">점수 반영 좋아요</th>
                  <th scope="col">총점</th>
                  <th scope="col">개인 달성률</th>
                  <th scope="col">관리</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((member) => (
                  <tr key={member.memberCode}>
                    <td>
                      <span className={styles.rankBadge}>{member.rank}</span>
                    </td>
                    <td>{member.memberId || '-'}</td>
                    <td>{formatNumber(member.proofCount)}</td>
                    <td>{formatNumber(member.scoredLikeCount)}</td>
                    <td>{formatNumber(member.totalScore)}</td>
                    <td>
                      {member.achievementRate == null
                        ? '-'
                        : `${member.achievementRate}%`}
                    </td>
                    <td>
                      <Link to={`/admin/user_manage/${member.memberCode}`}>
                        회원 보기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data?.pager && (
            <Pagination pager={data.pager} onChangePage={setPage} />
          )}
        </>
      )}
    </section>
  );
}

export default function ChallengeManageDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const [ending, setEnding] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const detail = useChallengeData(
    `/api/admin/challenge/${encodeURIComponent(code)}`,
    refreshKey,
  );

  const statistics = useChallengeData(
    `/api/admin/challenge/${encodeURIComponent(code)}/statistics`,
    refreshKey,
  );

  const challenge = detail.data;

  const handleEndChallenge = async () => {
    if (!challenge || ending) return;

    const confirmed = window.confirm(
      '챌린지를 조기 완료할까요?\n종료일시가 현재 시각으로 변경됩니다.',
    );

    if (!confirmed) return;

    setEnding(true);
    setActionError('');
    setActionMessage('');

    try {
      const response = await fetch(
        `/api/admin/challenge/${encodeURIComponent(code)}/end`,
        {
          method: 'PATCH',
          credentials: 'include',
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        const messages = {
          401: '로그인이 필요합니다.',
          403: '조기 완료 권한이 없습니다.',
          404: '존재하지 않거나 삭제된 챌린지입니다.',
          409: '현재 진행 기간인 챌린지만 조기 완료할 수 있습니다.',
        };

        throw new Error(
          result?.message ||
            messages[response.status] ||
            '챌린지 조기 완료에 실패했습니다.',
        );
      }

      setActionMessage('챌린지를 조기 완료했습니다.');

      // 상세·통계·순위 및 연결된 처리 이력 다시 조회
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      setActionError(
        error instanceof TypeError
          ? '서버 응답을 확인하지 못했습니다. 새로고침으로 처리 결과를 확인해주세요.'
          : error.message,
      );
    } finally {
      setEnding(false);
    }
  };

  const stats = statistics.data;

  const handleRefresh = () => {
    if (detail.loading || statistics.loading) return;
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <Link to="/admin/challenge_manage" className={styles.backLink}>
        ← 챌린지 목록
      </Link>

      <DashboardHeader
        title={challenge?.title || '챌린지 상세'}
        lastUpdated={stats?.asOf ? `${formatDate(stats.asOf)} 집계 기준` : ''}
        isSpinning={detail.loading || statistics.loading}
        handleRefresh={handleRefresh}
      />

      {actionError && (
        <p className={styles.error} role="alert">
          {actionError}
        </p>
      )}

      {actionMessage && <p role="status">{actionMessage}</p>}

      {detail.loading ? (
        <p className={styles.message}>상세 정보를 불러오는 중입니다.</p>
      ) : detail.error ? (
        <p className={styles.error} role="alert">
          {detail.error}
        </p>
      ) : challenge ? (
        <>
          <section className={styles.panel}>
            <h2>챌린지 정보</h2>

            <div className={styles.summary}>
              <ChallengeImage
                path={challenge.thumbnail}
                title={challenge.title}
              />

              <div>
                <dl className={styles.details}>
                  <div>
                    <dt>시작일</dt>
                    <dd>{formatDate(challenge.startDate)}</dd>
                  </div>
                  <div>
                    <dt>종료일</dt>
                    <dd>{formatDate(challenge.endDate)}</dd>
                  </div>
                  <div>
                    <dt>보상 포인트</dt>
                    <dd>{formatNumber(challenge.pointEarned)}점</dd>
                  </div>
                  <div>
                    <dt>참여 정원</dt>
                    <dd>
                      {challenge.maxParticipants == null
                        ? '제한 없음'
                        : `${formatNumber(challenge.maxParticipants)}명`}
                    </dd>
                  </div>
                  <div>
                    <dt>작성자</dt>
                    <dd>{challenge.adminId || '-'}</dd>
                  </div>
                  <div>
                    <dt>작성일</dt>
                    <dd>{formatDate(challenge.createdAt)}</dd>
                  </div>
                  <div>
                    <dt>진행 상태</dt>
                    <dd>{STATUS_LABELS[challenge.progressStatus] || '-'}</dd>
                  </div>
                  <div>
                    <dt>공개 여부</dt>
                    <dd>
                      {challenge.postStatus === 'ACTIVE'
                        ? '공개'
                        : challenge.postStatus === 'PRIVATE'
                          ? '비공개'
                          : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt>삭제 여부</dt>
                    <dd>{challenge.deleteYn ? '삭제됨' : '정상'}</dd>
                  </div>
                </dl>

                <div className={styles.actions}>
                  <button
                    type="button"
                    disabled={challenge.deleteYn === true}
                    onClick={() =>
                      navigate(`/admin/challenge_manage/edit/${code}`)
                    }
                  >
                    챌린지 수정
                  </button>

                  <button
                    type="button"
                    onClick={handleEndChallenge}
                    disabled={
                      ending ||
                      challenge.deleteYn === true ||
                      challenge.progressStatus === 'WAITING' ||
                      challenge.progressStatus === 'ENDED'
                    }
                  >
                    {ending ? '처리 중...' : '챌린지 조기 완료'}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.description}>
              <h3>챌린지 목표</h3>
              <p>{challenge.goal || '-'}</p>
              <h3>내용</h3>
              <p>{challenge.content || '-'}</p>
            </div>
          </section>

          {statistics.loading && (
            <p className={styles.message}>통계를 불러오는 중입니다.</p>
          )}

          {statistics.error && (
            <p className={styles.error} role="alert">
              통계 조회 실패: {statistics.error}
            </p>
          )}

          <div className={styles.statsGrid}>
            <StatCard
              title="신규 인증글"
              value={
                stats ? `${formatNumber(stats.newProofs?.todayCount)}개` : '-'
              }
              description={
                stats ? formatChange(stats.newProofs?.changeRate) : ''
              }
            />
            <StatCard
              title="신규 참여 인원"
              value={
                stats
                  ? `${formatNumber(stats.newParticipants?.todayCount)}명`
                  : '-'
              }
              description={
                stats ? formatChange(stats.newParticipants?.changeRate) : ''
              }
            />
            <StatCard
              title="총 참여 인원"
              value={`${formatNumber(challenge.participantCount)}명`}
            />
            <StatCard
              title="달성률"
              value={
                challenge.achievementRate == null
                  ? '-'
                  : `${challenge.achievementRate}%`
              }
            />
          </div>

          <div className={styles.chartGrid}>
            <section className={styles.panel}>
              <h2>참여 인원 수</h2>
              {stats ? (
                <ParticipantChart points={stats.participationByHour ?? []} />
              ) : (
                <p className={styles.message}>시간별 통계 데이터가 없습니다.</p>
              )}
            </section>

            <section className={styles.panel}>
              <h2>챌린지 달성률</h2>
              <AchievementChart value={challenge.achievementRate} />
            </section>
          </div>

          <ChallengeRanking key={code} code={code} refreshKey={refreshKey} />
        </>
      ) : null}
    </div>
  );
}
