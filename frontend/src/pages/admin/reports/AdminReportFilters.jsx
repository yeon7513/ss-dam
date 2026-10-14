// frontend/src/pages/admin/reports/AdminReportFilters.jsx

import Button from "../../../components/common/button/Button";
import FilterBar from "../../../components/common/filter-bar/FilterBar";
import SelectBox from "../../../components/forms/select-box/SelectBox";
import TextInput from "../../../components/forms/text-input/TextInput";

import { REASONS, STATUSES, TARGETS } from "../../../api/adminReport";
import styles from "./AdminReportFilters.module.scss";

const toOptions = (values) =>
  Object.entries(values).map(([code, name]) => ({
    code,
    name,
  }));

const STATUS_OPTIONS = [
  { code: "pending", name: "미처리" },
  ...toOptions(STATUSES),
];

const TARGET_OPTIONS = toOptions(TARGETS);
const REASON_OPTIONS = toOptions(REASONS);

export default function AdminReportFilters({
  filters,
  onChange,
  onSearch,
  loading = false,
}) {
  return (
    <form onSubmit={onSearch} aria-label="신고 검색 조건">
      <FilterBar className={styles.filters}>
        {/* 신고 날짜 */}
        <TextInput
          className={styles.date}
          type="date"
          name="date"
          aria-label="신고 날짜"
          value={filters.date}
          onChange={onChange}
        />

        {/* 처리 상태 */}
        <label className={styles.selectField}>
          <span className={styles.srOnly}>처리 여부</span>

          <SelectBox
            name="status"
            placeholder="전체 상태"
            options={STATUS_OPTIONS}
            selectedValue={filters.status}
            onChange={onChange}
          />
        </label>

        {/* 신고 대상 유형 */}
        <label className={styles.selectField}>
          <span className={styles.srOnly}>신고 대상 유형</span>

          <SelectBox
            name="targetType"
            placeholder="전체 카테고리"
            options={TARGET_OPTIONS}
            selectedValue={filters.targetType}
            onChange={onChange}
          />
        </label>

        {/* 신고 사유 */}
        <label className={styles.selectField}>
          <span className={styles.srOnly}>신고 사유</span>

          <SelectBox
            name="reasonType"
            placeholder="전체 신고 사유"
            options={REASON_OPTIONS}
            selectedValue={filters.reasonType}
            onChange={onChange}
          />
        </label>

        {/* 검색어와 검색 버튼 */}
        <div className={styles.search}>
          <TextInput
            type="search"
            name="keyword"
            aria-label="신고 번호 또는 신고 내용 검색"
            placeholder="번호·신고 내용 검색"
            value={filters.keyword}
            onChange={onChange}
          />

          <Button
            type="submit"
            btnStyle="outline"
            size="sm"
            disabled={loading}
          >
            검색
          </Button>
        </div>
      </FilterBar>
    </form>
  );
}