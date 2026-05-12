import cn from 'classnames';
import styles from './RadioInput.module.scss';

function RadioInput({ className, id, name, label, isChecked }) {
  return (
    <div className={cn(styles.radio, className)}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="radio" name={name} checked={isChecked} />
    </div>
  );
}

export default RadioInput;
