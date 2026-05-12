import cn from 'classnames';
import styles from './SelectBox.module.scss';

function SelectBox({ className, name, options }) {
  return (
    <select className={cn(styles.select, className)} name={name}>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

export default SelectBox;
