import { useEffect, useState } from 'react';
import styles from './MemberAdminPanel.module.scss';

const PROCESS_LABELS = {
  RESTRICT: '회원 이용 제한',
  RELEASE: '회원 이용 제한 해제',
};

export default function MemberAdminPanel({ member, onMemberChanged }) {
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [logsError, setLogsError] = useState('');
  const [logVersion, setLogVersion] = useState(0);

  // 현재 상태에서 가능한 변경만 제공
  const availableAction = member.deleteYn
    ? null
    : member.status === 'ACTIVE'
      ? { value: 'restrict', label: '정지' }
      : member.status === 'SUSPENDED'
        ? { value: 'release', label: '정상으로 해제' }
        : null;

  // 최초 진입 및 상태 변경 후 로그 조회
  useEffect(() => {
    const controller = new AbortController();

    const fetchLogs = async () => {
      setLogsLoading(true);
      setLogsError('');

      try {
        const response = await fetch(
          `/api/admin/logs/members/${member.code}?page=1&perPage=5`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('관리자 로그를 불러오지 못했습니다.');
        }

        const result = await response.json();

        if (!controller.signal.aborted) {
          setLogs(result.data?.content ?? []);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setLogsError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLogsLoading(false);
        }
      }
    };

    fetchLogs();

    return () => controller.abort();
  }, [member.code, logVersion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setMessage('');
    setError('');

    if (!availableAction || action !== availableAction.value) {
      setError('변경할 상태를 선택해주세요.');
      return;
    }

    if (!reason.trim()) {
      setError('상태 변경 사유를 입력해주세요.');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `/api/admin/members/${member.code}/${action}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: reason.trim(),
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const fallback =
          response.status === 401
            ? '로그인이 필요합니다.'
            : response.status === 403
              ? '회원 상태를 변경할 권한이 없습니다.'
              : response.status === 409
                ? '현재 회원 상태에서는 변경할 수 없습니다.'
                : '회원 상태 변경에 실패했습니다.';

        throw new Error(result?.message || fallback);
      }

      setAction('');
      setReason('');
      setMessage('회원 상태를 변경했습니다.');

      // 변경 이력 다시 조회
      setLogVersion((prev) => prev + 1);

      // 왼쪽 회원 정보도 서버에서 다시 조회
      try {
        await onMemberChanged();
      } catch {
        setError(
          '상태 변경은 완료됐지만 회원 정보 갱신에 실패했습니다. 페이지를 새로고침해주세요.'
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.panel} aria-label="회원 관리">
      <h2>회원 상태 변경</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.actionRow}>
          <select
            aria-label="변경할 회원 상태"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            disabled={saving || !availableAction}
          >
            <option value="">상태 선택</option>

            {availableAction && (
              <option value={availableAction.value}>
                {availableAction.label}
              </option>
            )}
          </select>

          <button
            type="submit"
            disabled={
              saving ||
              !availableAction ||
              action !== availableAction.value ||
              !reason.trim()
            }
          >
            {saving ? '변경 중…' : '회원 상태 변경'}
          </button>
        </div>

        <textarea
          aria-label="상태 변경 사유"
          placeholder="상태 변경 사유를 입력해주세요."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={255}
          rows={3}
          disabled={saving || !availableAction}
        />

        <span className={styles.characterCount}>
          {reason.length} / 255
        </span>

        {!availableAction && (
          <p className={styles.notice}>
            현재 회원 상태에서는 정지·해제를 할 수 없습니다.
          </p>
        )}

        {message && <p role="status">{message}</p>}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </form>

      <div className={styles.logHeader}>
        <h2>관리자 로그</h2>

        <button
          type="button"
          onClick={() => setLogVersion((prev) => prev + 1)}
          disabled={logsLoading}
        >
          새로고침
        </button>
      </div>

      {logsLoading ? (
        <p className={styles.notice}>로그를 불러오는 중입니다.</p>
      ) : logsError ? (
        <p className={styles.error} role="alert">
          {logsError}
        </p>
      ) : logs.length === 0 ? (
        <p className={styles.notice}>관리 이력이 없습니다.</p>
      ) : (
        <ul className={styles.logs}>
          {logs.map((log) => (
            <li key={log.code}>
              <span className={styles.logDate}>
                {log.createdAt || '-'}
              </span>

              <div>
                <p>
                  <strong>{log.empId || '관리자'}</strong>
                  {' · '}
                  {PROCESS_LABELS[log.processType] ??
                    log.processType ??
                    '관리 처리'}
                </p>

                {log.memo && (
                  <p className={styles.memo}>{log.memo}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}