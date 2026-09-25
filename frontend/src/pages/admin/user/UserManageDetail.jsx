import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MemberAdminPanel from './MemberAdminPanel';
import MemberActivityPanel from './MemberActivityPanel';

import styles from './UserManageDetail.module.scss';

const STATUS_LABELS = {
  ACTIVE: '정상',
  SUSPENDED: '정지',
  SLEEP: '휴면',
};

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('ko-KR') : '-';

const formatNumber = (value) =>
  value == null ? '-' : Number(value).toLocaleString('ko-KR');

export default function UserManageDetail() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 상세 페이지 진입 시 회원 정보 조회
  useEffect(() => {
    const controller = new AbortController();

    const fetchMember = async () => {
      setLoading(true);
      setError('');
      setMember(null);

      try {
        const response = await fetch(
          `/api/admin/members/${encodeURIComponent(code)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? '존재하지 않는 회원입니다.'
              : '회원 정보를 불러오지 못했습니다.'
          );
        }

        const result = await response.json();

        if (!result.data) {
          throw new Error('회원 정보가 없습니다.');
        }

        if (!controller.signal.aborted) {
          setMember(result.data);
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

    fetchMember();

    return () => controller.abort();
  }, [code]);

  const statusLabel = member?.deleteYn
    ? '탈퇴'
    : STATUS_LABELS[member?.status] ?? member?.status ?? '-';

  const statistics = [
    {
      label: '신고 누적 수',
      value: member?.receivedReportCount,
      unit: '회',
    },
    {
      label: '피드 활동',
      value: member?.feedCount,
      unit: '회',
    },
    {
      label: '거래 활동',
      value: member?.tradeCount,
      unit: '회',
    },
    {
      label: '로그인 횟수',
      value: member?.loginCount,
      unit: '회',
    },
  ];

  //상태 변경 뒤 왼쪽 정보도 실제 서버 값으로 갱신하는 함수 (회원 상태 변경과 관리자 로그)
  const refreshMember = async () => {
    const response = await fetch(
        `/api/admin/members/${encodeURIComponent(code)}`
    );

    if (!response.ok) {
        throw new Error('회원 정보를 갱신하지 못했습니다.');
    }

    const result = await response.json();

    if (!result.data) {
        throw new Error('회원 정보가 없습니다.');
    }

    setMember(result.data);
    };

  return (
    <div className={styles.container}>
      {/* 뒤로가기 + 회원 이름 */}
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate('/admin/user_manage')}
          aria-label="회원 목록으로 돌아가기"
        >
          ←
        </button>

        <h1>
          {member ? `${member.name || member.id}님 회원 정보` : '회원 정보'}
        </h1>
      </header>

      {loading ? (
        <p role="status">회원 정보를 불러오는 중입니다.</p>
      ) : error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : member ? (
        <>
        <div className={styles.topGrid}>
          {/* 왼쪽 회원 정보 패널 */}
          <section
            className={styles.profilePanel}
            aria-label="회원 기본 정보와 활동 통계"
            >
            <div className={styles.profileTop}>
                {/* 왼쪽 프로필 사진 */}
                <div className={styles.profileImage}>
                {member.path ? (
                    <img src={member.path} alt={`${member.name} 프로필`} />
                ) : (
                    <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    aria-hidden="true"
                    >
                    <rect
                        x="10"
                        y="10"
                        width="44"
                        height="44"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        d="M12 12L52 52M52 12L12 52"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    </svg>
                )}
                </div>

                {/* 오른쪽 회원 정보 */}
                <div className={styles.profileInfo}>
                <div className={styles.identity}>
                    <span className={styles.status}>{statusLabel}</span>
                    <strong>{member.name || '-'}</strong>
                    <span className={styles.memberId}>({member.id})</span>
                </div>

                <div className={styles.dates}>
                    <span>가입일 {formatDate(member.createdAt)}</span>
                    <span>수정일 {formatDate(member.updatedAt)}</span>
                </div>

                <dl className={styles.details}>
                    <div>
                    <dt>회원 등급</dt>
                    <dd>
                        {member.rating == null ? '-' : `${member.rating}등급`}
                    </dd>
                    </div>

                    <div>
                    <dt>회원 랭킹</dt>
                    <dd>
                        {member.ranking == null
                        ? '-'
                        : `${formatNumber(member.ranking)}위`}
                    </dd>
                    </div>

                    <div>
                    <dt>보유 포인트</dt>
                    <dd>{formatNumber(member.point)}</dd>
                    </div>

                    <div>
                    <dt>완료한 챌린지</dt>
                    <dd>{formatNumber(member.completedChallengeCount)}</dd>
                    </div>
                </dl>
                </div>
            </div>

            {/* 하단 통계 */}
            <div className={styles.statistics}>
                {statistics.map((stat) => (
                <div className={styles.statCircle} key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>
                    {formatNumber(stat.value)}
                    {stat.value != null && stat.unit}
                    </strong>
                </div>
                ))}
            </div>
            </section>
            
           {/* 오른쪽 회원 상태 변경·관리자 로그 */}
          <MemberAdminPanel
            key={member.code}
            member={member}
            onMemberChanged={refreshMember}
          />
        </div>

        {/* 하단 탭·통계·목록 */}
        <MemberActivityPanel
          key={member.code}
          memberCode={member.code}
        />
      </>
    ) : null}
  </div>
);
}