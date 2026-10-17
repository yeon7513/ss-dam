// frontend/src/pages/admin/reports/ReportDetailModal.jsx

import { useEffect, useRef, useState } from "react";

import Button from "../../../components/common/button/Button";
import Modal from "../../../components/common/modal/Modal";

import {
  ACTIONS,
  cancelReportAction,
  formatDate,
  loadReport,
  REASONS,
  rejectReport,
  resolveReport,
  restoreReportAction,
  reviewReport,
  STATUSES,
  TARGETS,
} from "../../../api/adminReport";

import { useAuth } from "../../../context/AuthContext";
import styles from "./AdminReports.module.scss";

export default function ReportDetailModal({
  reportCode,
  onClose,
  onChanged,
}) {
  const { user } = useAuth();

  // 연속 클릭으로 같은 요청이 중복 실행되는 것 방지
  const workingRef = useRef(false);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [actionType, setActionType] = useState("REJECT");
  const [period, setPeriod] = useState("THREE_DAYS");
  const [memo, setMemo] = useState("");

  // 신고 상세 조회
  useEffect(() => {
    const controller = new AbortController();

    loadReport(reportCode, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setDetail(data);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(
            err.message || "신고 상세를 불러오지 못했습니다.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reportCode]);

  // 처리 중에는 모달 닫기 방지
  function closeModal() {
    if (!workingRef.current) {
      onClose();
    }
  }

  // 상세 재조회
  async function refreshDetail() {
    if (workingRef.current) return;

    workingRef.current = true;
    setBusy(true);
    setError("");

    try {
      const data = await loadReport(reportCode);

      setDetail(data);
      setNeedsRefresh(false);
    } catch (err) {
      setError(
        err.message || "신고 상세를 불러오지 못했습니다.",
      );
    } finally {
      workingRef.current = false;
      setBusy(false);
    }
  }

  // 변경 성공과 변경 후 조회 실패를 구분
  // 조회 실패 시 추가 조치를 막고 새로고침 유도
  async function mutate(operation, successMessage) {
    if (workingRef.current) return;

    workingRef.current = true;
    setBusy(true);
    setError("");
    setNotice("");

    try {
      await operation();

      setMemo("");
      setNotice(successMessage);

      // 부모 페이지의 신고 목록 갱신
      onChanged?.();

      try {
        const data = await loadReport(reportCode);

        setDetail(data);
        setNeedsRefresh(false);
      } catch {
        setNeedsRefresh(true);
        setError(
          "처리는 성공했지만 상세를 다시 불러오지 못했습니다.",
        );
      }
    } catch (err) {
      setError(err.message || "요청을 처리하지 못했습니다.");

      // 서버의 현재 상태를 다시 확인한 뒤 추가 처리
      setNeedsRefresh(true);
    } finally {
      workingRef.current = false;
      setBusy(false);
    }
  }

  // 처리 사유 검증
  function requireMemo() {
    const value = memo.trim();

    if (!value || value.length > 4000) {
      setError("처리 사유를 1~4000자로 입력해 주세요.");
      return null;
    }

    return value;
  }

  // 반려·경고·정지·강제 탈퇴 처리
  function submitProcess(event) {
    event.preventDefault();

    if (workingRef.current || needsRefresh) return;

    const value = requireMemo();
    if (!value) return;

    if (
      actionType === "WITHDRAW" &&
      !window.confirm("이 회원을 강제 탈퇴 처리하시겠습니까?")
    ) {
      return;
    }

    // 반려는 기각 API 호출
    if (actionType === "REJECT") {
      mutate(
        () => rejectReport(reportCode, value),
        "신고를 기각했습니다.",
      );
      return;
    }

    // 경고·정지·강제 탈퇴는 처리 완료 API 호출
    mutate(
      () =>
        resolveReport(reportCode, {
          actionType,
          processMemo: value,
          ...(actionType === "SUSPEND"
            ? { suspensionPeriod: period }
            : {}),
        }),
      "신고 처리가 완료되었습니다.",
    );
  }

  // 조치 취소 또는 재적용
  function changeAction(restore) {
    if (workingRef.current || needsRefresh) return;

    const value = requireMemo();
    if (!value) return;

    const message = restore
      ? "취소했던 제재를 다시 적용하시겠습니까?"
      : "이 신고에 따른 제재를 취소하시겠습니까?";

    if (!window.confirm(message)) return;

    mutate(
      () =>
        restore
          ? restoreReportAction(
              reportCode,
              detail.processLogCode,
              value,
            )
          : cancelReportAction(
              reportCode,
              detail.processLogCode,
              value,
            ),
      restore
        ? "조치를 다시 적용했습니다."
        : "조치를 취소했습니다.",
    );
  }

  // 접수·검토 중이면 처리 입력 화면 표시
  const pending =
    detail &&
    ["PENDING", "IN_REVIEW"].includes(detail.status);

  // 처리 완료된 제재만 취소·복구 가능
  const actionable =
    detail?.status === "RESOLVED" &&
    detail.processLogCode != null &&
    ["WARNING", "SUSPEND", "WITHDRAW"].includes(detail.actionType);

  const disabled = busy || needsRefresh;

  return (
    <Modal
      isOpen
      title={`신고 상세 #${reportCode}`}
      onClose={closeModal}
      closeDisabled={busy}
      className={styles.reportModal}
      contentClassName={styles.reportModalContent}
    >
      {/* 처리 성공 메시지 */}
      {notice && <p role="status">{notice}</p>}

      {/* 오류 메시지 */}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {/* 최초 상세 조회 */}
      {loading && (
        <p role="status">상세 내용을 불러오는 중입니다.</p>
      )}

      {/* 조회 실패 또는 처리 후 상태 재확인 */}
      {!loading && (!detail || needsRefresh) && (
        <Button
          btnStyle="outline"
          size="sm"
          disabled={busy}
          onClick={refreshDetail}
        >
          {busy ? "불러오는 중..." : "상세 다시 불러오기"}
        </Button>
      )}

      {detail && (
        <>
          {/* 신고 상태 및 대상 유형 */}
          <div className={styles.badges}>
            <span>
              {STATUSES[detail.status] ?? detail.status}
            </span>
            <span>
              {TARGETS[detail.targetType] ?? detail.targetType}
            </span>
          </div>

          {/* 신고 사유 */}
          <h3>
            {REASONS[detail.reasonType] ?? detail.reasonType}
          </h3>

          {/* 신고 기본 정보 */}
          <dl className={styles.info}>
            <dt>신고자</dt>
            <dd>
              {detail.reporterId ??
                `회원 #${detail.reporterCode}`}
            </dd>

            <dt>대상자</dt>
            <dd>
              {detail.targetMemberId ??
                (detail.targetMemberCode
                  ? `회원 #${detail.targetMemberCode}`
                  : "확인 불가")}
            </dd>

            <dt>신고 대상</dt>
            <dd>
              {TARGETS[detail.targetType] ?? detail.targetType}
              {" "}#{detail.targetCode}
            </dd>

            <dt>신고일</dt>
            <dd>{formatDate(detail.createdAt)}</dd>

            {/* 처리 완료 또는 기각된 신고의 처리 정보 */}
            {!pending && (
              <>
                <dt>처리자</dt>
                <dd>
                  {detail.processedAdminName ??
                    detail.processedAdminId ??
                    "-"}

                  {detail.processedAdminRole &&
                    ` (${detail.processedAdminRole})`}
                </dd>

                <dt>처리일</dt>
                <dd>{formatDate(detail.processedAt)}</dd>
              </>
            )}
          </dl>

          {/* 신고 상세 내용 */}
          <section className={styles.section}>
            <h4>신고 상세 내용</h4>

            <p className={styles.content}>
              {detail.content || "상세 내용이 없습니다."}
            </p>
          </section>

          {pending ? (
            /* 처리 전 화면 */
            <form onSubmit={submitProcess}>
              <fieldset
                className={styles.fieldset}
                disabled={disabled}
              >
                <legend>신고 처리</legend>

                {/* 조치 종류 */}
                <div className={styles.radioGroup}>
                  {Object.entries(ACTIONS).map(([value, label]) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="actionType"
                        value={value}
                        checked={actionType === value}
                        onChange={() => setActionType(value)}
                      />
                      {label}
                    </label>
                  ))}
                </div>

                {/* 정지 선택 시 기간 표시 */}
                {actionType === "SUSPEND" && (
                  <label className={styles.field}>
                    정지 기간

                    <select
                      value={period}
                      onChange={(event) =>
                        setPeriod(event.target.value)
                      }
                    >
                      <option value="THREE_DAYS">3일</option>
                      <option value="ONE_WEEK">일주일</option>
                      <option value="ONE_MONTH">한 달</option>
                    </select>
                  </label>
                )}

                {/* 처리 사유 */}
                <label className={styles.field}>
                  처리 메모

                  <textarea
                    required
                    maxLength={4000}
                    value={memo}
                    onChange={(event) =>
                      setMemo(event.target.value)
                    }
                    placeholder="처리 사유를 입력해 주세요."
                  />
                </label>

                 {/* 로그인 관리자 및 처리 버튼 */}
                <footer className={styles.actions}>
                  <span>
                    {/* role은 객체 -> 화면에는 한글 라벨 표시 */}
                    {user?.name ?? user?.id} / {user?.role?.label ?? "-"}
                  </span>

                  {detail.status === "PENDING" && (
                    <Button
                      type="button"
                      btnStyle="outline"
                      size="sm"
                      disabled={disabled}
                      onClick={() =>
                        mutate(
                          () => reviewReport(reportCode),
                          "검토를 시작했습니다.",
                        )
                      }
                    >
                      검토 시작
                    </Button>
                  )}

                  <Button
                    type="submit"
                    btnStyle="outline"
                    size="sm"
                    disabled={disabled}
                  >
                    {busy ? "처리 중..." : "제출"}
                  </Button>
                </footer>
              </fieldset>
            </form>
          ) : (
            /* 처리 후 화면 */
            <section className={styles.section}>
              <h4>신고 처리 메모</h4>

              <div className={styles.badges}>
                <span>
                  {ACTIONS[detail.actionType] ??
                    detail.actionType ??
                    "-"}
                </span>

                {detail.actionStatus === "CANCELED" && (
                  <span>조치 취소됨</span>
                )}
              </div>

              <p className={styles.content}>
                {detail.processMemo || "-"}
              </p>

              {detail.actionType === "SUSPEND" && (
                <p>
                  정지 종료: {formatDate(detail.suspendedUntil)}
                </p>
              )}

              {/* 기각된 신고에는 취소·복구 버튼을 표시하지 않음 */}
              {actionable && (
                <>
                  <label className={styles.field}>
                    조치 변경 사유

                    <textarea
                      maxLength={4000}
                      value={memo}
                      disabled={disabled}
                      onChange={(event) =>
                        setMemo(event.target.value)
                      }
                      placeholder="취소 또는 재적용 사유를 입력해 주세요."
                    />
                  </label>

                  <p className={styles.help}>
                    조치 복구는 취소했던 제재를 다시 적용합니다.
                    강제 탈퇴한 회원의 이용 복구는 조치 취소를
                    선택하세요.
                  </p>

                  <div className={styles.actions}>
                    <Button
                      type="button"
                      btnStyle="outline"
                      size="sm"
                      disabled={
                        disabled ||
                        detail.actionStatus !== "CANCELED"
                      }
                      onClick={() => changeAction(true)}
                    >
                      조치 복구
                    </Button>

                    <Button
                      type="button"
                      btnStyle="outline"
                      size="sm"
                      disabled={
                        disabled ||
                        detail.actionStatus !== "ACTIVE"
                      }
                      onClick={() => changeAction(false)}
                    >
                      조치 취소
                    </Button>
                  </div>
                </>
              )}
            </section>
          )}
        </>
      )}
    </Modal>
  );
}