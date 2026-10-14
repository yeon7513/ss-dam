import { useEffect, useState } from "react";

import { loadAdminActivityLogs } from "../../../api/adminActivityLog";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader";

import Button from "../../../components/common/button/Button";
import FilterBar from "../../../components/common/filter-bar/FilterBar";
import SelectBox from "../../../components/forms/select-box/SelectBox";
import TextInput from "../../../components/forms/text-input/TextInput";

import Pagination from "../../../components/common/pagination/Pagination";
import { getProcessLabel } from "../../../lib/adminActivityLog";
import styles from "./AdminActivityLogs.module.scss";

const TABS = [
  { value: "", label: "전체" },
  { value: "report", label: "신고 처리" },
  { value: "member", label: "회원" },
  { value: "feed", label: "피드" },
  { value: "challenge", label: "챌린지" },
  { value: "market", label: "마켓" },
  { value: "admin", label: "관리자 계정" },
];

const TARGET_LABELS = Object.fromEntries(
  TABS.filter((tab) => tab.value).map((tab) => [
    tab.value,
    tab.label,
  ]),
);



const PROCESS_TYPES_BY_TARGET = {
  report: [
    "REVIEW",
    "PROCESS",
    "RESOLVE",
    "REJECT",
    "CANCEL",
    "RESTORE",
  ],
  member: [
    "RESTRICT",
    "RELEASE",
    "WARNING",
    "WARNING_CANCEL",
    "WARNING_RESTORE",
    "SUSPEND",
    "SUSPEND_CANCEL",
    "SUSPEND_RESTORE",
    "WITHDRAW",
    "WITHDRAW_CANCEL",
    "WITHDRAW_RESTORE",
  ],
  feed: ["DELETE", "RESTORE"],
  challenge: ["CREATE", "UPDATE", "DELETE", "RESTORE", "EARLY_END"],
  market: ["DELETE", "RESTORE"],
  admin: [],
};



const INITIAL_FILTER = {
  from: "",
  to: "",
  processType: "",
  keyword: "",
};

function formatDate(value) {
  if (!value) return "-";

  // 서버에서 내려온 날짜를 브라우저 시간대로 변환하지 않고 표시
  return String(value).replace("T", " ").slice(0, 19);
}

export default function AdminActivityLogs() {
  const [targetType, setTargetType] = useState("");


  const processOptions = targetType
    // 개별 탭: 해당 유형의 처리만 표시
    ? (PROCESS_TYPES_BY_TARGET[targetType] ?? []).map((code) => ({
        code,
        name: getProcessLabel(targetType, code),
      }))
    // 전체 탭: 유형과 처리 이름을 함께 표시
    : Object.entries(PROCESS_TYPES_BY_TARGET).flatMap(
        ([type, codes]) =>
          codes.map((code) => ({
            code: `${type}:${code}`,
            name: `${TARGET_LABELS[type]} - ${getProcessLabel(type, code)}`,
          })),
      );

  const [draft, setDraft] = useState(INITIAL_FILTER);
  const [filter, setFilter] = useState(INITIAL_FILTER);

  const [page, setPage] = useState(1);
  const [version, setVersion] = useState(0);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let correctingPage = false;

    let requestTargetType = targetType;
    let requestProcessType = filter.processType;

    // 전체 탭의 선택값 예: "feed:DELETE"
    if (!targetType && filter.processType) {
      const [type, process] = filter.processType.split(":");

      requestTargetType = type;
      requestProcessType = process;
    }

    loadAdminActivityLogs(
      {
        ...filter,
        targetType: requestTargetType,
        processType: requestProcessType,
        keyword: filter.keyword.trim(),
        page,
        perPage: 10,
        perGroup: 5,
      },
      controller.signal,
    )
      .then((data) => {
        if (controller.signal.aborted) return;

        const lastPage = Math.max(1, data?.pager?.last ?? 1);

        if (page > lastPage) {
          correctingPage = true;
          setPage(lastPage);
          return;
        }

        setResult(data);
        setError("");
      })
      .catch((err) => {
        if (controller.signal.aborted) return;

        setResult(null);
        setError(
          err.message || "관리자 활동 로그를 불러오지 못했습니다.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted && !correctingPage) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [targetType, filter, page, version]);

  function prepareLoading() {
    setLoading(true);
    setError("");
  }

  function changeTab(value) {
    if (value === targetType) return;

    prepareLoading();
    setValidationError("");
    setTargetType(value);
    setPage(1);

    // 이전 탭에서 선택한 처리 유형은 해제
    setDraft((previous) => ({
      ...previous,
      processType: "",
    }));
    setFilter((previous) => ({
      ...previous,
      processType: "",
    }));
  }

  function changeFilter(event) {
    const { name, value } = event.target;

    setDraft((previous) => ({
      ...previous,
      [name]: value,
    }));
    setValidationError("");
  }

  function search(event) {
    event.preventDefault();

    if (draft.from && draft.to && draft.from > draft.to) {
      setValidationError("시작일은 종료일보다 늦을 수 없습니다.");
      return;
    }

    prepareLoading();
    setValidationError("");
    setPage(1);
    setFilter({ ...draft });
  }

  function resetFilters() {
    prepareLoading();
    setValidationError("");
    setDraft({ ...INITIAL_FILTER });
    setFilter({ ...INITIAL_FILTER });
    setPage(1);
  }

  function refresh() {
    prepareLoading();
    setVersion((previous) => previous + 1);
  }

  function changePage(nextPage) {
    if (loading || nextPage === page) return;

    prepareLoading();
    setPage(nextPage);
  }

  const logs = result?.content ?? [];
  const pager = result?.pager;

  return (
    <main className={styles.page}>
      <PanelHeader
        title="관리자 활동 로그"
        onRefresh={refresh}
        className={styles.header}
      />

      <section className={styles.panel} aria-label="관리자 활동 이력">
       <nav className={styles.tabs} aria-label="활동 로그 유형">
        {TABS.map((tab) => (
          <Button
            key={tab.value}
            type="button"
            btnStyle="word"
            size="sm"
            aria-pressed={targetType === tab.value}
            className={
              targetType === tab.value ? styles.activeTab : ""
            }
            onClick={() => changeTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </nav>

        <form onSubmit={search}>
          <FilterBar className={styles.logFilters}>
            <div className={styles.dateRange}>
              <TextInput
                type="date"
                name="from"
                aria-label="조회 시작일"
                value={draft.from}
                max={draft.to || undefined}
                onChange={changeFilter}
              />

              <span aria-hidden="true">~</span>

              <TextInput
                type="date"
                name="to"
                aria-label="조회 종료일"
                value={draft.to}
                min={draft.from || undefined}
                onChange={changeFilter}
              />
            </div>

            <label className={styles.processField}>
              <span className={styles.srOnly}>처리 유형</span>

              <SelectBox
                  name="processType"
                  placeholder="전체 처리"
                  options={processOptions}
                  selectedValue={draft.processType}
                  onChange={changeFilter}
                />
            </label>

            <TextInput
              className={styles.keywordField}
              type="search"
              name="keyword"
              aria-label="관리자 아이디 또는 처리 메모 검색"
              value={draft.keyword}
              maxLength={100}
              placeholder="관리자 아이디 또는 처리 메모"
              onChange={changeFilter}
            />

            <div className={styles.filterActions}>
              <Button
                type="submit"
                btnStyle="fill"
                size="sm"
                disabled={loading}
              >
                검색
              </Button>

              <Button
                type="button"
                btnStyle="outline"
                size="sm"
                onClick={resetFilters}
                disabled={loading}
              >
                초기화
              </Button>
            </div>
          </FilterBar>
        </form>

        {validationError && (
          <p className={styles.error} role="alert">
            {validationError}
          </p>
        )}

        {loading ? (
          <p className={styles.message} role="status">
            활동 로그를 불러오는 중입니다.
          </p>
        ) : error ? (
          <div className={styles.message}>
            <p className={styles.error} role="alert">
              {error}
            </p>
            <Button
              type="button"
              btnStyle="outline"
              size="sm"
              onClick={refresh}
            >
              다시 시도
            </Button>
          </div>
        ) : (
          <>
            <p className={styles.count}>
              총 {Number(pager?.total ?? 0).toLocaleString()}건
            </p>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">날짜</th>
                    <th scope="col">유형</th>
                    <th scope="col">처리</th>
                    <th scope="col">로그</th>
                    <th scope="col">관리자</th>
                    <th scope="col">관련 신고</th>
                  </tr>
                </thead>

                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={styles.empty}>
                        조회된 활동 로그가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.code}>
                        <td className={styles.date}>
                          {formatDate(log.createdAt)}
                        </td>

                        <td>
                          {TARGET_LABELS[log.targetType] ??
                            log.targetType}
                        </td>

                        <td>
                          <span className={styles.badge}>
                            {getProcessLabel(log.targetType, log.processType)}
                          </span>
                        </td>

                        <td className={styles.memo}>
                          <p>{log.memo || "-"}</p>
                          <small>
                            대상 #{log.targetCode} · 로그 #{log.code}
                          </small>
                        </td>

                        <td>
                          <div className={styles.admin}>
                            <strong>
                              {log.adminName || log.empId || "-"}
                            </strong>
                            <small>{log.adminDept || "-"}</small>
                            {log.empId && <small>{log.empId}</small>}
                          </div>
                        </td>

                        <td>
                          {log.reportCode != null
                            ? `#${log.reportCode}`
                            : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {logs.length > 0 && pager && (
              <Pagination
                pager={pager}
                onChangePage={changePage}
              />
            )}
          </>
        )}
      </section>
    </main>
  );
}