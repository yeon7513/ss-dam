import { useState } from 'react';
import { MdClose } from "react-icons/md";
import styles from "./TagGroup.module.scss";

// 태그 입력 그룹 (Enter로 추가, X로 삭제)
// -> 값은 "역삼동,유성구"처럼 쉼표로 이어서 draftFilters[name]에 저장
function TagGroup({
  name,
  placeholder = "입력 후 Enter",
  maxCount = 5,
  draftFilters,
  setDraftFilters,
  onSearch,
}) {
  const [input, setInput] = useState("");

  // 현재 태그 목록
  const tags = String(draftFilters[name] || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const isFull = tags.length >= maxCount;

  // 태그 목록 반영 + 재검색
  const applyTags = (nextTags) => {
    const nextFilters = {
      ...draftFilters,
      [name]: nextTags.join(","),
    };

    setDraftFilters(nextFilters);
    onSearch(nextFilters);
  };

  // Enter로 태그 추가
  const handleKeyDown = (e) => {
    // 한글 조합 중 Enter는 무시
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault(); // form 제출 방지

    const trimmed = input.trim();
    if (!trimmed) return;

    if (isFull) {
      alert(`최대 ${maxCount}개까지 추가할 수 있습니다.`);
      setInput("");
      return;
    }

    if (!tags.includes(trimmed)) {
      applyTags([...tags, trimmed]);
    }
    setInput("");
  };

  // 태그 삭제
  const handleRemove = (target) => {
    applyTags(tags.filter((tag) => tag !== target));
  };

  return (
    <div className={styles.tagGroup}>
      <input
        type="text"
        className={styles.tagInput}
        value={input}
        placeholder={isFull ? `최대 ${maxCount}개까지 추가할 수 있습니다.` : placeholder}
        disabled={isFull}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label={placeholder}
      />

      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => handleRemove(tag)}
              aria-label={`${tag} 태그 삭제`}
            >
              <MdClose />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagGroup;