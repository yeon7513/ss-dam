import FilterBar from '../../../components/common/filter-bar/FilterBar';
import TextInput from '../../../components/forms/text-input/TextInput';
import SelectBox from '../../../components/forms/select-box/SelectBox';
import SearchBox from '../../../components/common/search-box/SearchBox';

import styles from './UserManageFilters.module.scss';

// SearchBox.jsx 컴포넌트
const SEARCH_OPTIONS = [
    { code: "id", name: "아이디" },
    { code: "name", name: "이름" },
    { code: "phone", name: "연락처" },
];

// 실제 서비스의 등급 기준에 맞게 변경
const RATING_OPTIONS = [
  { code: '1', name: '1등급' },
  { code: '2', name: '2등급' },
  { code: '3', name: '3등급' },
  { code: '4', name: '4등급' },
  { code: '5', name: '5등급' },
];

export default function UserManageFilters({
  filters,
  onFilterChange,
  onSearch,
  activityOptions = [],
  regionOptions = [],
}) {
  // 날짜·드롭다운의 이름과 선택값을 부모에게 전달
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <FilterBar className={styles.filters}>
      {/* 가입일 시작 */}
      <div className={styles.dateRange}>
        <TextInput
            type="date"
            name="joinedFrom"
            aria-label="가입일 시작"
            value={filters.joinedFrom ?? ''}
            max={filters.joinedTo || undefined}
            onChange={handleChange}
        />

        <span aria-hidden="true">~</span>

        {/* 가입일 종료 */}
        <TextInput
            type="date"
            name="joinedTo"
            aria-label="가입일 종료"
            value={filters.joinedTo ?? ''}
            min={filters.joinedFrom || undefined}
            onChange={handleChange}
        />
      </div>

      {/* 활동 기준과 옵션을 정하기 전에는 비활성화 */}
      <SelectBox
        name="activityStatus"
        placeholder="활동 상태"
        options={activityOptions}
        selectedValue={filters.activityStatus ?? ''}
        onChange={handleChange}
        disabled={activityOptions.length === 0}
      />

      {/* 지역 기준과 옵션을 정하기 전에는 비활성화 */}
      <SelectBox
        name="regionCode"
        placeholder="지역"
        options={regionOptions}
        selectedValue={filters.regionCode ?? ''}
        onChange={handleChange}
        disabled={regionOptions.length === 0}
      />

      {/* 우선 백엔드에서 지원하는 등급 검색으로 구성 */}
      <SelectBox
        name="rating"
        placeholder="전체 등급"
        options={RATING_OPTIONS}
        selectedValue={filters.rating ?? ''}
        onChange={handleChange}
      />

      {/* 기존 검색창 재사용 */}
      <SearchBox
        className={styles.search}
        name="search"
        options={SEARCH_OPTIONS}
        initSelectValue={filters.search ?? ''}
        initKeyword={filters.keyword ?? ''}
        onSearch={onSearch}
    />
</FilterBar>
  );
}