import SelectBox from "../../../forms/select-box/SelectBox.jsx";
import styles from "./SelectGroup.module.scss";

// 라벨 없이 드롭다운만 렌더링
// -> placeholder(그룹 이름)가 드롭다운 기본 문구 역할
function SelectGroup({
  name,
  selectOptions,
  placeholder,
  draftFilters,
  setDraftFilters,
  onSearch,
}) {
  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    const nextFilters = {
      ...draftFilters,
      [name]: value,
    };

    setDraftFilters(nextFilters);
    onSearch(nextFilters);
  };

  return (
    <div className={styles.select}>
      <SelectBox
        className={styles.selectBox}
        name={name}
        options={selectOptions}
        selectedValue={draftFilters[name]}
        placeholder={placeholder}
        onChange={(e) => handleSelectChange(e)}
      />
    </div>
  );
}

export default SelectGroup;