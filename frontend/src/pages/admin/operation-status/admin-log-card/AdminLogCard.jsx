import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

import { loadAdminActivityLogs } from "../../../../api/adminActivityLog";
import Button from "../../../../components/common/button/Button";
import Card from "../../../../components/common/card/Card";
import { getProcessLabel } from "../../../../lib/adminActivityLog";

import styles from "./AdminLogCard.module.scss";

const TARGET_LABELS = {
  report: "신고",
  member: "회원",
  feed: "피드",
  challenge: "챌린지",
  market: "상품",
  admin: "관리자 계정",
};

function formatDate(value) {
  if (!value) return "-";

  const date = String(value).slice(0, 10);
  const parts = date.split("-");

  if (parts.length !== 3) return date;

  const [year, month, day] = parts;

  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

function getProcessTone(processType) {
  if (["DELETE", "RESTRICT", "SUSPEND", "WITHDRAW", "WARNING",
    "SUSPEND_RESTORE", "WITHDRAW_RESTORE", "WARNING_RESTORE"].includes(processType)) {
    return styles.processWarning;
  }

  if (["RESTORE", "RELEASE", "SUSPEND_CANCEL", "WITHDRAW_CANCEL",
    "WARNING_CANCEL"].includes(processType)) {
    return styles.processRecovery;
  }

  return "";
}

function getLogText(log) {
  const department = log.adminDept
    ? `[${log.adminDept}] `
    : "";

  const admin = log.adminName || log.empId || "관리자";
  const target = TARGET_LABELS[log.targetType] || "대상";
  return `${department}${admin} · ${target} #${log.targetCode}`;
}

export default function AdminLogCard({ refreshKey = 0 }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    loadAdminActivityLogs(
      {
        page: 1,
        perPage: 5,
        perGroup: 5,
      },
      controller.signal,
    )
      .then((data) => {
        if (controller.signal.aborted) return;

        setLogs(data.content);
        setError("");
      })
      .catch((err) => {
        if (controller.signal.aborted) return;

        setError(
          err.message || "활동 로그를 불러오지 못했습니다.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [refreshKey, retryKey]);

  return (
    <Card className={styles.logCard}>
      <div className={styles.cardHeader}>
        <h3>
          <Link to="/admin/activity-logs">
            관리자 활동 로그
            <FiExternalLink aria-hidden="true" />
          </Link>
        </h3>
        <span>최근 5건</span>
      </div>

      {error ? (
        <div className={styles.message}>
          <p role="alert">{error}</p>
          <Button
            type="button"
            btnStyle="outline"
            size="sm"
            onClick={() => setRetryKey((value) => value + 1)}
          >
            다시 시도
          </Button>
        </div>
      ) : loading ? (
        <p className={styles.message} role="status">
          활동 로그를 불러오는 중입니다.
        </p>
      ) : logs.length === 0 ? (
        <p className={styles.message}>
          등록된 활동 로그가 없습니다.
        </p>
      ) : (
        <ul className={styles.logList}>
          {logs.map((log) => (
            <li key={log.code}>
              <span className={styles.date}>
                {formatDate(log.createdAt)}
              </span>

              <span
                className={styles.logText}
                title={getLogText(log)}
              >
                {getLogText(log)}
              </span>
              <span className={`${styles.processLabel} ${getProcessTone(log.processType)}`}>
                {getProcessLabel(log.targetType, log.processType)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
