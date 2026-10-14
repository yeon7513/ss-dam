import React, { useState } from 'react';
import styles from "../../../pages/admin/admin-feed/FeedManage.module.scss";
import TextInput from "../../forms/text-input/TextInput.jsx";
import { MdArrowForwardIos } from "react-icons/md";
import { handleSetField } from "../../../utils/changeHandler.js";
import { LuSearch } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

function SearchFilterBar({
  searchFilter,
  tabMenu,
  selectGroup = "selectGroup",
  radioGroup = "radioGroup",
  checkboxGroup = "checkboxGroup",
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


  // 검색어 입력 핸들러
  const handleSearchKeyword = (e) => {
    if (e.key === "Enter") {
      const newKeyword = e.target.value.trim();

      const nextFilters = {
        ...draftFilters,
        keyword: newKeyword,
      };

      // 상태 업데이트
      setDraftFilters(nextFilters);

      // 검색 함수 전달
      onSearch(nextFilters);

      e.target.value = '';
    }
  };


  // 특정 필터 개별 삭제 핸들러
  const handleDeleteFilter = (key) => {
    if (key === "dateRange") {
      const resetDates = {
        ...draftFilters,
        startDate: "",
        endDate: "",
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

  // 유효한 선택 필터 목록 추출
  // -> 하단에 렌더링
  const getActiveFilters = () => {
    const active = [];

    // 날짜
    if (draftFilters.startDate || draftFilters.endDate) {
      active.push({
        key: 'dateRange',
        label: `기간: ${draftFilters.startDate || '제한없음'} ~ ${draftFilters.endDate || '제한없음'}`,
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
      if (['startDate', 'endDate', 'keyword', 'page', 'perPage'].includes(key)) {
        return;
      }

      if (value !== "" && value !== null && value !== undefined && value !== 'all') {
        active.push({
          key: key,
          label: `${key}: ${value}`,
        });
      }
    });

    return active;
  };

  const activeFilters = getActiveFilters();

  console.log(activeFilters);

  return (
    <div>
      {/* 검색 필터 섹션 */}
      <form onSubmit={handleSubmitSearch}>
        {/* 탭 메뉴 */}
        {tabMenu}

        {/* 날짜 검색*/}
        <div className={styles.datePickerGroup}>
          <TextInput
            name="startDate"
            type="date"
            value={draftFilters.startDate || ""}
            onChange={e => handleSetField(e, setDraftFilters)}
            aria-label="조회 시작일"
          />
          <span aria-hidden="true">
            <MdArrowForwardIos />
          </span>
          <TextInput
            name="endDate"
            type="date"
            value={draftFilters.endDate || ""}
            onChange={e => handleSetField(e, setDraftFilters)}
            aria-label="조회 종료일"
          />
        </div>

        {/* 셀렉트 그룹 */}
        {selectGroup && (
          <div className={styles.selectGroup}>
            {selectGroup}
          </div>
        )}

        {/* 체크박스 그룹 */}
        {checkboxGroup && (
          <div className={styles.checkboxGroup}>
            {checkboxGroup}
          </div>
        )}

        {/* 라디오 그룹 */}
        {radioGroup && (
          <div className={styles.radioGroup}>
            {radioGroup}
          </div>
        )}

        {/* 키워드 검색 */}
        <div className={styles.textGroup}>
          <TextInput
            name="keyword"
            onKeyUp={(e) => handleSearchKeyword(e)}
            icon={<LuSearch className={styles.searchIcon} />}
            placeholder="검색어를 입력하세요."
          />
        </div>
      </form>

      {/* 선택된 검색 옵션 */}
      <div>
        <span>선택 필터</span>
        <div className={styles.activeFilters}>
          {activeFilters.length > 0 ? (
            activeFilters.map((filter) => (
              <span key={filter.key} className={styles.badge}>
                {filter.label}
                <button
                  type="button"
                  onClick={() => handleDeleteFilter(filter.key)}
                  className={styles.removeBtn}
                >
                  <IoClose />
                </button>
              </span>
            ))
          ) : (
            <span className={styles.noFilter}>선택된 필터가 없습니다.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchFilterBar;
