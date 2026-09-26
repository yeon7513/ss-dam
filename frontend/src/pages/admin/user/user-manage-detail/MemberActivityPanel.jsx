import { useEffect, useState } from 'react';
import TabMenus from '../../../../components/common/tab-menus/TabMenus';
import Pagination from '../../../../components/common/pagination/Pagination';
import styles from './MemberActivityPanel.module.scss';

const TABS = [
  { value: 'feeds', label: '작성피드' },
  { value: 'reports', label: '신고내역' },
  { value: 'trades', label: '거래내역' },
  { value: 'proofs', label: '챌린지 인증' },
];

// 탭별 API 주소와 통계 필드
const TAB_CONFIG = {
  feeds: {
    url: (code) => `/api/admin/feeds/members/${code}`,
    stats: [
      ['totalFeedCount', '총 등록 건수', '건'],
      ['totalLikeCount', '총 좋아요 수', '회'],
      ['totalHitCount', '총 조회수', '회'],
    ],
  },
  reports: {
    url: (code) => `/api/admin/reports/members/${code}`,
    stats: [
      ['totalReportCount', '전체 신고', '건'],
      ['pendingReportCount', '처리 대기', '건'],
      ['resolvedReportCount', '처리 완료', '건'],
    ],
  },
  trades: {
    url: (code) => `/api/admin/products/members/${code}/trades`,
    stats: [
      ['totalTradeCount', '전체 거래', '건'],
      ['purchaseCount', '구매', '건'],
      ['saleCount', '판매', '건'],
    ],
  },
  proofs: {
    url: (code) => `/api/admin/challenge/members/${code}/proofs`,
    stats: [
      ['totalProofCount', '전체 인증글', '건'],
      ['proofChallengeCount', '인증한 챌린지', '개'],
      ['recentProofCount', '최근 30일 인증', '건'],
    ],
  },
};

const REPORT_STATUS = {
  PENDING: '처리 대기',
  IN_REVIEW: '검토 중',
  RESOLVED: '처리 완료',
  REJECTED: '기각',
};

const numberText = (value) =>
  value == null ? '-' : Number(value).toLocaleString('ko-KR');

const dateText = (value) =>
  value ? new Date(value).toLocaleDateString('ko-KR') : '-';

export default function MemberActivityPanel({ memberCode }) {
  // 탭과 페이지를 함께 관리
  const [query, setQuery] = useState({
    tab: 'feeds',
    page: 1,
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const config = TAB_CONFIG[query.tab];

  useEffect(() => {
    const controller = new AbortController();

    const fetchActivity = async () => {
      setLoading(true);
      setError('');
      setData(null);

      try {
        const url = TAB_CONFIG[query.tab].url(
          encodeURIComponent(memberCode)
        );

        const params = new URLSearchParams({
          page: String(query.page),
          perPage: '8',
        });

        const response = await fetch(`${url}?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('활동 내역을 불러오지 못했습니다.');
        }

        const result = await response.json();

        // feeds / reports / trades / proofs 안에 content와 pager가 있음
        if (!Array.isArray(result.data?.[query.tab]?.content)) {
          throw new Error('활동 내역 응답 형식을 확인해주세요.');
        }

        if (!controller.signal.aborted) {
          setData(result.data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchActivity();

    return () => controller.abort();
  }, [memberCode, query.tab, query.page]);

  const handleTabChange = (tab) => {
    // 탭을 바꾸면 첫 페이지부터 조회
    setData(null);
    setError('');
    setLoading(true);
    setQuery({ tab, page: 1 });
  };

  const handlePageChange = (page) => {
    if (page === query.page) return;

    setData(null);
    setError('');
    setLoading(true);
    setQuery((prev) => ({ ...prev, page }));
  };

  const pageData = data?.[query.tab];
  const items = pageData?.content ?? [];
  const pager = pageData?.pager;

  // 우선 DTO에 있는 필드로 목록을 표시
  const renderItem = (item) => {
    if (query.tab === 'reports') {
      return (
        <>
          <h3>신고 #{item.code}</h3>
          <p>사유: {item.reasonType || '-'}</p>
          <p>
            상태: {REPORT_STATUS[item.status] ?? item.status ?? '-'}
          </p>
          <p className={styles.description}>{item.content || '-'}</p>
          <time>{dateText(item.createdAt)}</time>
        </>
      );
    }

    if (query.tab === 'trades') {
      return (
        <>
          <h3>상품 #{item.productCode}</h3>
          <p>거래 구분: {item.tradeType || '-'}</p>
          <p>거래 금액: {numberText(item.tradePrice)}원</p>
          <time>{dateText(item.tradedAt)}</time>
        </>
      );
    }

    // 작성피드와 챌린지 인증은 같은 UserFeedView 구조
    return (
      <>
        <div className={styles.author}>
          <strong>{item.memberProfile?.id || '-'}</strong>
        </div>

        <div className={styles.thumbnail}>
          {item.thumbnail ? (
            <img src={item.thumbnail} alt="" />
          ) : (
            <span>이미지 없음</span>
          )}
        </div>

        {item.challengeName && <p>{item.challengeName}</p>}
        <h3>{item.title || '제목 없음'}</h3>

        <p>
          좋아요 {numberText(item.countFeedLike)}
          {' · '}
          댓글 {numberText(item.countFeedComment)}
        </p>

        <time>{dateText(item.createdAt)}</time>
      </>
    );
  };

  return (
    <section className={styles.panel} aria-label="회원 활동 내역">
      <div className={styles.toolbar}>
        <TabMenus
          className={styles.tabs}
          tabs={TABS}
          activeStatus={query.tab}
          onTabChange={(tab) => {
            if (tab !== query.tab) handleTabChange(tab);
          }}
        />

        {/* 현재 탭의 전체 대상 기준 통계 */}
        <div className={styles.summary}>
          {config.stats.map(([field, label, unit]) => (
            <div className={styles.stat} key={field}>
              <span>{label}</span>
              <strong>
                {loading || error || data?.[field] == null
                  ? '-'
                  : `${numberText(data[field])}${unit}`}
              </strong>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <p className={styles.notice} role="status">
          활동 내역을 불러오는 중입니다.
        </p>
      ) : error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : items.length === 0 ? (
        <p className={styles.notice}>조회된 내역이 없습니다.</p>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item) => (
              <article className={styles.card} key={item.code}>
                {renderItem(item)}
              </article>
            ))}
          </div>

          <Pagination
            pager={pager}
            onChangePage={handlePageChange}
          />
        </>
      )}
    </section>
  );
}