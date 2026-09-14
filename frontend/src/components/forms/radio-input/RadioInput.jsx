import cn from 'classnames';
import styles from './RadioInput.module.scss';

function RadioInput({ className, id, name, label, value, isChecked }) {
  return (
    <div className={cn(styles.radio, className)}>
      <input id={id} type="radio" name={name} value={value} checked={isChecked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default RadioInput;
