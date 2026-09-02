import cn from "classnames";
import styles from "./SelectBox.module.scss";


function SelectBox({ className, name, options, onChange, selectedValue }) {
  return (
    <select
      className={cn(styles.select, className)}
      name={name}
      onChange={onChange}
      value={selectedValue || ''} // 수정 시 사용할 선택된 옵션으로 미리 선택되게
    >
      <option key="default" value="">
        카테고리 선택
      </option>
      {options &&
        options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
    </select>
  );
}

export default SelectBox;
