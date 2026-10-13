import styles from './ChallengeResultFilters.module.scss';

export default function ChallengeResultFilters({
  filters,
  categories = [],
  loading,
  onChange,
  onSearch,
  onReset,
}) {
  const invalidDateRange = Boolean(
    filters.fromDate && filters.toDate && filters.fromDate > filters.toDate,
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (loading || invalidDateRange) return;

    onSearch();
  };

  return (
    <form className={styles.filterBox} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>조회 시작일</span>
          <input
            type="date"
            min="1000-01-01"
            max={filters.toDate || '9999-12-30'}
            value={filters.fromDate}
            onChange={(event) => onChange('fromDate', event.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>조회 종료일</span>
          <input
            type="date"
            min={filters.fromDate || '1000-01-01'}
            max="9999-12-30"
            value={filters.toDate}
            onChange={(event) => onChange('toDate', event.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>카테고리</span>
          <select
            value={filters.categoryCode}
            disabled={categories.length === 0}
            onChange={(event) => onChange('categoryCode', event.target.value)}
          >
            <option value="">
              {categories.length > 0 ? '전체 챌린지' : '선택 목록 준비 중'}
            </option>

            {categories.map((category) => (
              <option key={category.code} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>정렬</span>
          <select
            value={filters.sort}
            onChange={(event) => onChange('sort', event.target.value)}
          >
            <option value="LATEST">최근 종료순</option>
            <option value="PARTICIPANTS_DESC">참여자 많은 순</option>
            <option value="PARTICIPANTS_ASC">참여자 적은 순</option>
            <option value="ACHIEVEMENT_DESC">달성률 높은 순</option>
            <option value="ACHIEVEMENT_ASC">달성률 낮은 순</option>
          </select>
        </label>

        <label className={`${styles.field} ${styles.keyword}`}>
          <span>검색어</span>
          <input
            type="search"
            placeholder="챌린지 제목 또는 내용"
            value={filters.keyword}
            onChange={(event) => onChange('keyword', event.target.value)}
          />
        </label>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.searchButton}
            disabled={loading || invalidDateRange}
          >
            검색
          </button>

          <button type="button" onClick={onReset} disabled={loading}>
            초기화
          </button>
        </div>
      </div>

      {invalidDateRange && (
        <p className={styles.error} role="alert">
          조회 시작일은 종료일보다 늦을 수 없습니다.
        </p>
      )}

      <div className={styles.bottom}>
        <span className={styles.hint}>
          선택한 기간과 진행 기간이 겹치는 챌린지를 조회합니다.
        </span>

        <fieldset className={styles.payment} disabled>
          <legend>포인트 지급 여부 · 준비 중</legend>

          <label>
            <input type="radio" name="rewardPaid" value="" defaultChecked />
            전체
          </label>

          <label>
            <input type="radio" name="rewardPaid" value="true" />
            지급 완료
          </label>

          <label>
            <input type="radio" name="rewardPaid" value="false" />
            지급 미완료
          </label>
        </fieldset>
      </div>
    </form>
  );
}
