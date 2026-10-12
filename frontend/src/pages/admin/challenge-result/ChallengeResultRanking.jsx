import { useEffect, useState } from 'react';

import Pagination from '../../../components/common/pagination/Pagination';
import { formatImagePath } from '../../../utils/formatImagePath';

import styles from './ChallengeResultRanking.module.scss';

function formatNumber(value) {
  return value == null ? '-' : Number(value).toLocaleString('ko-KR');
}

function formatRate(value) {
  if (value == null) return '-';

  return `${Number(value).toLocaleString('ko-KR', {
    maximumFractionDigits: 1,
  })}%`;
}

export default function ChallengeResultRanking({ code }) {
  const [page, setPage] = useState(1);
  const [members, setMembers] = useState([]);
  const [pager, setPager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadRanking() {
      setLoading(true);
      setError('');

      const params = new URLSearchParams({
        page: String(page),
        perPage: '10',
        perGroup: '5',
      });

      try {
        const response = await fetch(
          `/api/admin/challenge/result/${encodeURIComponent(code)}/ranking?${params}`,
          {
            credentials: 'include',
            signal: controller.signal,
          },
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || `순위 조회 실패 (HTTP ${response.status})`,
          );
        }

        if (
          !Array.isArray(result.data?.content) ||
          !result.data?.pager ||
          !Array.isArray(result.data.pager.list)
        ) {
          throw new Error('순위 응답 형식이 올바르지 않습니다.');
        }

        if (!active) return;

        setMembers(result.data.content);
        setPager(result.data.pager);
      } catch (err) {
        if (!active || err.name === 'AbortError') return;

        setMembers([]);
        setPager(null);
        setError(err.message || '순위를 불러오지 못했습니다.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadRanking();

    return () => {
      active = false;
      controller.abort();
    };
  }, [code, page, retryKey]);

  const handlePageChange = (nextPage) => {
    if (
      loading ||
      !pager ||
      nextPage < 1 ||
      nextPage > pager.last ||
      nextPage === page
    ) {
      return;
    }

    setPage(nextPage);
  };

  return (
    <section className={styles.container} aria-busy={loading}>
      <div className={styles.heading}>
        <h2>챌린지 최종 순위</h2>

        {!loading && !error && pager && (
          <span>총 {formatNumber(pager.total)}명</span>
        )}
      </div>

      {loading ? (
        <p className={styles.message} role="status">
          순위를 불러오는 중입니다.
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
      ) : members.length === 0 ? (
        <p className={styles.message}>조회된 참여자가 없습니다.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              챌린지 참여자의 저장된 최종 성과와 순위
            </caption>

            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">회원</th>
                <th scope="col">인증글 수</th>
                <th scope="col">점수 반영 좋아요</th>
                <th scope="col">최종 점수</th>
                <th scope="col">개인 달성률</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.memberCode}>
                  <td>
                    <span className={styles.rank}>
                      {formatNumber(member.rank)}
                    </span>
                  </td>

                  <td>
                    <div className={styles.member}>
                      {member.profileImage ? (
                        <img
                          src={formatImagePath(member.profileImage)}
                          alt=""
                          className={styles.avatar}
                        />
                      ) : (
                        <span
                          className={styles.avatarPlaceholder}
                          aria-hidden="true"
                        >
                          {member.memberId?.slice(0, 1) || '?'}
                        </span>
                      )}

                      <span>{member.memberId || '회원 정보 없음'}</span>
                    </div>
                  </td>

                  <td>{formatNumber(member.proofCount)}</td>
                  <td>{formatNumber(member.scoredLikeCount)}</td>
                  <td>{formatNumber(member.totalScore)}</td>

                  <td>
                    <span className={styles.rate}>
                      {formatRate(member.achievementRate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && pager && pager.last > 1 && (
        <Pagination pager={pager} onChangePage={handlePageChange} />
      )}
    </section>
  );
}
