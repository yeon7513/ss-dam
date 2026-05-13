import cn from 'classnames';
import styles from './SelectBox.module.scss';

function SelectBox({ className, name, options }) {
  return (
    <select className={cn(styles.select, className)} name={name}>
      <option value="">카테고리 선택</option>
      {options &&
        options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
    </select>
  );
}

export default SelectBox;
