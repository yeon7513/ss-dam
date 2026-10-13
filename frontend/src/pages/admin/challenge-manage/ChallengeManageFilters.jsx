import styles from './ChallengeManageFilters.module.scss';

export default function ChallengeManageFilters({
  filters,
  onFilterChange,
  onSearch,
  onReset,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(filters.keyword);
  };

  return (
    <section className={styles.filterBox}>
      <label className={styles.field}>
        시작일
        <input
          className={styles.input}
          type="date"
          value={filters.fromDate}
          onChange={(event) => onFilterChange('fromDate', event.target.value)}
        />
      </label>

      <label className={styles.field}>
        종료일
        <input
          className={styles.input}
          type="date"
          value={filters.toDate}
          onChange={(event) => onFilterChange('toDate', event.target.value)}
        />
      </label>

      <label className={styles.field}>
        진행 상태
        <select
          className={styles.select}
          value={filters.progressStatus}
          onChange={(event) =>
            onFilterChange('progressStatus', event.target.value)
          }
        >
          <option value="">전체 진행 상태</option>
          <option value="WAITING">대기</option>
          <option value="IN_PROGRESS">진행 중</option>
          <option value="ENDED">종료</option>
        </select>
      </label>

      <label className={styles.field}>
        공개 상태
        <select
          className={styles.select}
          value={filters.postStatus}
          onChange={(event) => onFilterChange('postStatus', event.target.value)}
        >
          <option value="">전체 공개 상태</option>
          <option value="ACTIVE">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
      </label>

      <label className={styles.field}>
        정렬
        <select
          className={styles.select}
          value={filters.sort}
          onChange={(event) => onFilterChange('sort', event.target.value)}
        >
          <option value="LATEST">최신순</option>
          <option value="PARTICIPANTS_DESC">참여자 많은 순</option>
          <option value="PARTICIPANTS_ASC">참여자 적은 순</option>
          <option value="ACHIEVEMENT_DESC">달성률 높은 순</option>
          <option value="ACHIEVEMENT_ASC">달성률 낮은 순</option>
        </select>
      </label>

      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          name="keyword"
          type="search"
          placeholder="챌린지 검색"
          value={filters.keyword}
          onChange={(event) => onFilterChange('keyword', event.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      <label className={styles.deletedCheck}>
        <input
          type="checkbox"
          checked={filters.deleted}
          onChange={(event) => onFilterChange('deleted', event.target.checked)}
        />
        삭제된 챌린지
      </label>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        초기화
      </button>
    </section>
  );
}
