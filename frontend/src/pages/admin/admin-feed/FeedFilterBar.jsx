import { useCallback, useState } from "react";
import { handleSetField } from "../../../utils/changeHandler";
import { MAX_REGION_COUNT } from "../../../constants/FeedManage.constants.jsx";
import { MdArrowForwardIos, MdSearch, MdClose } from "react-icons/md";

import RadioInput from "../../../components/forms/radio-input/RadioInput.jsx";
import SelectBox from "../../../components/forms/select-box/SelectBox.jsx";
import TextInput from "../../../components/forms/text-input/TextInput.jsx";
import Button from "../../../components/common/button/Button.jsx";
import styles from "./FeedManage.module.scss";

export default function FeedFilterBar({
  searchFilter,
  categoryOptions = [],
  onSearch,
}) {
  const [draftFilters, setDraftFilters] = useState(searchFilter);
  const [regionList, setRegionList] = useState(() =>
    searchFilter.region ? searchFilter.region.split(",").filter(Boolean) : [],
  );
  const [regionInput, setRegionInput] = useState("");

  const handleChange = (e) => handleSetField(e, setDraftFilters);

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    const nextFilters = {
      ...draftFilters,
      [name]: value,
    };

    setDraftFilters(nextFilters);
    onSearch({
      ...nextFilters,
      region: regionList.join(","),
    });
  };

  const handleRegionKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
      e.preventDefault();

      const trimmed = regionInput.trim();

      if (!trimmed) return;

      if (regionList.length >= MAX_REGION_COUNT) {
        alert(`지역 태그는 최대 ${MAX_REGION_COUNT}개까지 추가 가능합니다`);
        setRegionInput("");

        return;
      }

      if (!regionList.includes(trimmed)) {
        setRegionList((prev) => [...prev, trimmed]);
      }
      setRegionInput("");
    },
    [regionInput, regionList],
  );

  const handleRemoveRegion = (target) => {
    setRegionList((prev) => prev.filter((r) => r !== target));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      ...draftFilters,
      region: regionList.join(","),
    });
  };

  return (
    <form className={styles.filterBar} onSubmit={handleSubmit}>
      <div className={styles.filterRow}>
        <div className={styles.datePickerGroup}>
          <TextInput
            name="startDate"
            type="date"
            value={draftFilters.startDate || ""}
            onChange={handleChange}
            aria-label="조회 시작일"
          />
          <span aria-hidden="true">
            <MdArrowForwardIos />
          </span>
          <TextInput
            name="endDate"
            type="date"
            value={draftFilters.endDate || ""}
            onChange={handleChange}
            aria-label="조회 종료일"
          />
        </div>

        <SelectBox
          name="category"
          className={styles.categorySelect}
          selectedValue={draftFilters.category || ""}
          placeholder="챌린지 선택"
          options={categoryOptions}
          onChange={handleChange}
        />

        <div className={styles.radioGroup}>
          <RadioInput
            id="likeCount-popular"
            name="likeCount"
            label="인기순"
            value="POPULAR"
            isChecked={draftFilters.likeCount === "POPULAR"}
            onChange={handleSortChange}
          />
          <RadioInput
            id="likeCount-newest"
            name="likeCount"
            label="최신순"
            value="NEWEST"
            isChecked={draftFilters.likeCount === "NEWEST"}
            onChange={handleSortChange}
          />
        </div>

        <div className={styles.searchBox}>
          <input
            name="keyword"
            type="text"
            value={draftFilters.keyword || ""}
            placeholder="글 제목을 입력하세요."
            onChange={handleChange}
            aria-label="검색어 입력"
          />

          <Button
            type="submit"
            btnStyle="submit"
            size="lg"
            className={styles.searchBtn}
          >
            검색
          </Button>
        </div>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.regionInputContainer}>
          <input
            type="text"
            className={styles.regionInput}
            value={regionInput}
            placeholder={
              regionList.length >= MAX_REGION_COUNT
                ? `지역 태그는 최대 ${MAX_REGION_COUNT}개까지 추가 가능합니다`
                : "지역명 또는 동 이름을 입력하세요 (예: 역삼동, 유성구)"
            }
            disabled={regionList.length >= MAX_REGION_COUNT}
            onChange={(e) => setRegionInput(e.target.value)}
            onKeyDown={handleRegionKeyDown}
            aria-label="지역 태그 입력"
          />

          <div className={styles.tagContainer}>
            {regionList.map((region) => (
              <span key={region} className={styles.regionTag}>
                {region}
                <button
                  type="button"
                  className={styles.removeTagBtn}
                  onClick={() => handleRemoveRegion(region)}
                  aria-label={`${region} 태그 삭제`}
                >
                  <MdClose />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
