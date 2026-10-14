import React from 'react';
import TextInput from "../../../forms/text-input/TextInput.jsx";
import { MdArrowForwardIos } from "react-icons/md";
import styles from "./DateGroup.module.scss";

function DateGroup({
  label,
  draftFilters,
  setDraftFilters,
  onSearch,
}) {
  const today = new Date().toISOString().split("T")[0];

  // 날짜 선택 핸들러
  const handleSelectDate = (e) => {
    const { name, value } = e.target;

    const nextFilters = {
      ...draftFilters,
      [name]: value,
    }

    // HTML 속성으로 막아뒀지만 혹시 모르니까...
    if (nextFilters.fromDate > today) {
      alert("시작일은 현재 날짜보다 이후일 수 없습니다.");
      return;
    }

    if (today < nextFilters.toDate) {
      alert("종료일은 현재 날짜보다 이후일 수 없습니다.");
      return;
    }

    if (nextFilters.fromDate && nextFilters.toDate) {
      if (nextFilters.fromDate > nextFilters.toDate) {
        alert("시작일은 종료일보다 이후일 수 없습니다.");
        return;
      }

    }

    // 상위 컴포넌트로 선택된 날짜 전달
    setDraftFilters(nextFilters);
    // 서버 전송 -> 재검색
    onSearch(nextFilters);
  };

  return (
    <div className={styles.dateGroup}>
      <TextInput
        name="fromDate"
        type="date"
        max={today}
        value={draftFilters.fromDate || ""}
        onChange={e => handleSelectDate(e)}
        aria-label="조회 시작일"
      />
      <span aria-hidden="true">
        <MdArrowForwardIos />
      </span>
      <TextInput
        name="toDate"
        type="date"
        max={today}
        value={draftFilters.toDate || ""}
        onChange={e => handleSelectDate(e)}
        aria-label="조회 종료일"
      />
    </div>
  );
}

export default DateGroup;
