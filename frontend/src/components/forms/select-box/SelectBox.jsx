import cn from "classnames";
import styles from "./SelectBox.module.scss";

function SelectBox({ className, name, options, onChange }) {
  return (
    <select
      className={cn(styles.select, className)}
      name={name}
      onChange={onChange}
    >
      <option key="default" value="">
        카테고리 선택
      </option>
      {options &&
        options.map((option, idx) => (
          <option key={idx} value={option.code}>
            {option.name}
          </option>
        ))}
    </select>
  );
}

export default SelectBox;
