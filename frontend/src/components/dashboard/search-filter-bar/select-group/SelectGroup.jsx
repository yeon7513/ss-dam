import React from 'react';
import SelectBox from "../../../forms/select-box/SelectBox.jsx";
import styles from "./SelectGroup.module.scss";

function SelectGroup({
  label,
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
      <label htmlFor={name}>{label}</label>
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
