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

// 지역 옵션
const REGION_OPTIONS = [
  { code: '서울', name: '서울특별시' },
  { code: '부산', name: '부산광역시' },
  { code: '대구', name: '대구광역시' },
  { code: '인천', name: '인천광역시' },
  { code: '광주', name: '광주광역시' },
  { code: '대전', name: '대전광역시' },
  { code: '울산', name: '울산광역시' },
  { code: '세종', name: '세종특별자치시' },
  { code: '경기', name: '경기도' },
  { code: '강원', name: '강원특별자치도' },
  { code: '충북', name: '충청북도' },
  { code: '충남', name: '충청남도' },
  { code: '전북', name: '전북특별자치도' },
  { code: '전남', name: '전라남도' },
  { code: '경북', name: '경상북도' },
  { code: '경남', name: '경상남도' },
  { code: '제주', name: '제주특별자치도' },
];

const ACTIVITY_OPTIONS = [
  { code: 'WITHIN_7_DAYS', name: '최근 7일 접속' },
  { code: 'BETWEEN_7_30_DAYS', name: '8~30일 전 접속' },
  { code: 'OVER_30_DAYS', name: '30일 초과 미접속' },
  { code: 'NEVER', name: '접속 기록 없음' },
];

export default function UserManageFilters({
  filters,
  onFilterChange,
  onSearch,
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

      {/* 활동 상태 (최근 접속일 기준) */}
      <SelectBox
        name="activityStatus"
        placeholder="활동 상태"
        options={ACTIVITY_OPTIONS}
        selectedValue={filters.activityStatus ?? ''}
        onChange={handleChange}
      />

      {/* 지역 */}
      <SelectBox
        name="regionCode"
        placeholder="전체 지역"
        options={REGION_OPTIONS}
        selectedValue={filters.regionCode ?? ''}
        onChange={handleChange}
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