import React from 'react';
import styles from "./RadioGroup.module.scss";

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

  return (
    <>
      <span className={styles.radioRabel}>{label}</span>
      <div className={styles.radioContents}>
        {radioOptions.map((radio, idx) => (
          <div key={idx} className={styles.radioItem}>
            <input
              type="radio"
              id={`${name}_${radio.code}`}
              name={name}
              checked={String(radio.code) === String(draftFilters[name])}
              value={radio.code}
              onChange={(e) => handleChangeRadio(e)}
            />
            <label htmlFor={`${name}_${radio.code}`}>{radio.name}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export default RadioGroup;
