import { LuSearch } from "react-icons/lu";
import TextInput from "../../../forms/text-input/TextInput.jsx";
import styles from "./KeywordGroup.module.scss";

function KeywordGroup({ draftFilters, setDraftFilters, onSearch }) {

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

  return (
    <div className={styles.keywordGroup}>
      <TextInput
        name="keyword"
        onKeyUp={(e) => handleSearchKeyword(e)}
        icon={<LuSearch className={styles.searchIcon} />}
        placeholder="검색어를 입력하세요."
        aria-label="검색어 입력"
      />
    </div>
  );
}

export default KeywordGroup;