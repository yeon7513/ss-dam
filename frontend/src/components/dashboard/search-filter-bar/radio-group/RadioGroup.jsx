import styles from "./RadioGroup.module.scss";

// 박스형(세그먼트) 라디오 그룹
// -> 라벨 없이 옵션 버튼만 렌더링 (그룹 이름은 스크린리더용 aria-label)
function RadioGroup({
  label,
  name,
  radioOptions,
  draftFilters,
  setDraftFilters,
  onSearch,
}) {
  const handleChangeRadio = (e) => {
    const { name, value } = e.target;

    const nextFilters = {
      ...draftFilters,
      [name]: value,
    };

    setDraftFilters(nextFilters);
    onSearch(nextFilters);
  };

  // null·undefined는 "" (전체)로 취급해서 비교
  const currentValue = String(draftFilters[name] ?? "");

  return (
    <div className={styles.segment} role="radiogroup" aria-label={label}>
      {radioOptions.map((radio) => (
        <div key={String(radio.code)} className={styles.radioItem}>
          <input
            type="radio"
            id={`${name}_${radio.code}`}
            name={name}
            checked={String(radio.code) === currentValue}
            value={radio.code}
            onChange={(e) => handleChangeRadio(e)}
          />
          <label htmlFor={`${name}_${radio.code}`}>{radio.name}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioGroup;