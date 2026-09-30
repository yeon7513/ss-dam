import cn from "classnames";
import { MdExpandMore } from "react-icons/md";

import styles from "./SelectBox.module.scss";

function SelectBox({
  className,
  name,
  options,
  onChange,
  selectedValue, // 수정 시 이미 선택된 value
  placeholder = "선택",
  disabled = false,
}) {
  return (
    <div className={cn(styles.selectWrap, className)}>
      <select
        name={name}
        onChange={onChange}
        value={selectedValue || ""} // 수정 시 사용할 선택된 옵션으로 미리 선택되게
        disabled={disabled}
      >
        <option key="default" value="">
          {placeholder}
        </option>
        {options &&
          options.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
      </select>
      {/* 기본 아래화살표 아이콘으로 변경 */}
      <MdExpandMore className={styles.arrowIcon} />
    </div>
  );
}

export default SelectBox;
