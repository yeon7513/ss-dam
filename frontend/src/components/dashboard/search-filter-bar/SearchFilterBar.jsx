import React, { useMemo, useState } from 'react';
import DateGroup from "./date-group/DateGroup.jsx";
import ActiveFilters from "./active-filters/ActiveFilters.jsx";
import cn from "classnames";
import styles from "./SearchFilterBar.module.scss";
import TabMenus from "../../common/tab-menus/TabMenus.jsx";
import Button from "../../common/button/Button.jsx";
import KeywordGroup from "./keyword-group/KeywordGroup.jsx";
import Card from "../../common/card/Card.jsx";
import SelectGroup from "./select-group/SelectGroup.jsx";
import RadioGroup from "./radio-group/RadioGroup.jsx";


/**
 * 공통 관리자용 검색 필터 섹션 컴포넌트 명세
 * -> 객체 모양은 각 Config 이름 컨트롤+클릭으로 확인하세요~!
 * @param {Object} props
 * @param {string} [props.className] - 외부 스타일 클래스
 * @param {string} [props.datePickLabel] - 날짜 검색 라벨
 * @param {Object} [props.initFilter] - 검색 초기화 시 사용할 디폴트 필터 객체 (상수)
 * @param {Object} [props.searchFilter] - useSearchQuery 훅에서 만든 쿼리스트링을 파싱한 객체
 * @param {SearchFilterTabMenuConfig} [props.tabMenu] - 탭 메뉴 설정 객체
 * @param {SearchFilterCtaButtonConfig} [props.ctaButton] - CTA 버튼 설정 객체
 * @param {SearchFilterSelectGroupsConfig} [props.selectGroups] - 셀렉트 설정 객체
 * @param {SearchFilterRadioGroupsConfig} [props.radioGroups] - 라디오 설정 객체
 * @param {SearchFilterCheckboxGroupsConfig} [props.checkboxGroups] - 체크박스 버튼 설정 객체
 * @param {Function} [onSearch] useSearchQuery 훅에 전달해 검색을 수행하는 handleSearch 함수
 */

function SearchFilterBar({
  className,
  datePickLabel = "조회 기간",
  initFilter,
  searchFilter,
  tabMenu,
  selectGroups,
  radioGroups,
  checkboxGroups,
  ctaButton,
  onSearch,
}) {
  const [draftFilters, setDraftFilters] = useState(searchFilter);

  // 검색 필터 전송 핸들러
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    onSearch({
      ...draftFilters,
    })
  };

  // 각 필터 키(name)별로 그룹 라벨과 옵션 이름들을 매핑
  const filterMetaMap = useMemo(() => {
    const map = {};
    const allGroups = [
      ...(selectGroups || []),
      ...(radioGroups || []),
      ...(checkboxGroups || []),
    ];

    allGroups.forEach((group) => {
      // group.name => key 역할
      const filterKey = group.name;
      if (!filterKey) return;

      map[filterKey] = {
        groupLabel: group.label, // 한글 추출
        optionNames: {},
      };

      if (group.options && Array.isArray(group.options)) {
        group.options.forEach((opt) => {
          // options의 한글인 name 추출 후 map의 해당하는 키에 저장
          map[filterKey].optionNames[String(opt.code)] = opt.name;
        });
      }
    });

    return map;
  }, [selectGroups, radioGroups, checkboxGroups]);


  // 유효한 선택 필터 목록 추출
  // -> 하단에 렌더링
  const getActiveFilters = () => {
    const active = [];

    // 날짜
    if (draftFilters.fromDate || draftFilters.toDate) {
      active.push({
        key: 'dateRange',
        label: `기간: ${draftFilters.fromDate || '제한없음'} ~ ${draftFilters.toDate || '제한없음'}`,
      });
    }

    // 키워드 검색
    if (draftFilters.keyword && draftFilters.keyword.trim() !== "") {
      active.push({
        key: 'keyword',
        label: `검색어: ${draftFilters.keyword}`,
      });
    }

    // 기타 props로 받아오는 것들은 동적으로 추출
    Object.keys(draftFilters).forEach((key) => {
      const value = draftFilters[key];
      // 페이지네이션 & 기본으로 처리된 검색 필터는 제외
      if (['fromDate', 'toDate', 'keyword', 'page', 'perPage'].includes(key)) {
        return;
      }

      if (value !== "" && value !== null && value !== undefined && value !== 'all') {
        // 해당 필터의 메타 정보 가져오기
        const meta = filterMetaMap[key];

        if (meta) {
          const groupLabel = meta.groupLabel; // 한글 라벨
          const optionName = meta.optionNames[value] || value; // 한글 값

          // 최종적으로 "키: 값" 형태로 active 배열에 push
          active.push({
            key: key,
            label: `${groupLabel}: ${optionName}`,
          });
        }
      }
    });

    return active;
  };

  // 특정 필터 개별 삭제 핸들러
  const handleDeleteFilter = (key) => {
    if (key === "dateRange") {
      const resetDates = {
        ...draftFilters,
        fromDate: "",
        toDate: "",
      };

      setDraftFilters(resetDates);
      onSearch(resetDates);
      return;
    }

    const updatedFilters = {
      ...draftFilters,
      [key]: key === "deleted" ? null : "",
    };

    setDraftFilters(updatedFilters);
    // 필터 삭제 시 재검색
    onSearch(updatedFilters);
  };

  // 필터 초기화 핸들러
  const handleResetFilters = () => {
    setDraftFilters(initFilter);
    onSearch(initFilter);
  }

  return (
    <Card className={cn(styles.searchFilterBar, className)}>
      {/* 검색 필터 섹션 */}
      <form onSubmit={handleSubmitSearch}>
        {/* 탭 메뉴 */}
        {tabMenu && (
          <div className={styles.header}>
            {/* 탭 메뉴 */}
            {tabMenu && (
              <TabMenus
                tabs={tabMenu.tabs}
                activeStatus={tabMenu.activeStatus || ""}
                onTabChange={tabMenu.onTabChange}
              />
            )}
          </div>
        )}

        {/* 날짜 검색*/}
        <div className={styles.dateGroup}>
          <label htmlFor="fromDate">{datePickLabel}</label>
          <DateGroup
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
            onSearch={onSearch}
          />
        </div>

        {/* 셀렉트 그룹 */}
        {selectGroups && (
          <div className={styles.selectGroups}>
            {selectGroups.map((group, idx) => (
              <SelectGroup
                key={idx}
                label={group.label}
                name={group.name}
                selectOptions={group.options}
                placeholder={group.placeholder}
                draftFilters={draftFilters}
                setDraftFilters={setDraftFilters}
                onSearch={onSearch}
              />
            ))}
          </div>
        )}

        {/* 체크박스 그룹 */}
        {checkboxGroups && (
          <div className={styles.checkboxGroup}>
            <div>체크박스 그룹 영역</div>
            {/*{checkboxGroups}*/}
          </div>
        )}

        {/* 라디오 그룹 */}
        {radioGroups && (
          <div className={styles.radioGroup}>
            {radioGroups.map((group, idx) => (
              <RadioGroup
                key={idx}
                label={group.label}
                name={group.name}
                radioOptions={group.options}
                draftFilters={draftFilters}
                setDraftFilters={setDraftFilters}
                onSearch={onSearch}
              />
            ))}
          </div>
        )}

        {/* 키워드 검색 */}
        <KeywordGroup
          draftFilters={draftFilters}
          setDraftFilters={setDraftFilters}
          onSearch={onSearch}
        />
      </form>

      {/* 선택된 검색 옵션 */}
      <ActiveFilters
        activeFilters={getActiveFilters()}
        onDeleteFilter={handleDeleteFilter}
      />

      <div className={styles.footer}>
        <Button
          type="button"
          size="sm"
          onClick={handleResetFilters}
        >
          초기화
        </Button>

        {/* CTA 버튼 */}
        {ctaButton && (
          <Button
            type="button"
            size="sm"
            action="submit"
            onClick={ctaButton.onClick}
          >
            {ctaButton.label}
          </Button>
        )}
      </div>
    </Card>
  );
}

export default SearchFilterBar;
