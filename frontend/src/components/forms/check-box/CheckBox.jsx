import cn from 'classnames';
import styles from './CheckBox.module.scss';

function CheckBox({ className, id, name, label, isChecked = false }) {
  return (
    <div className={cn(styles.checkbox, className)}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="checkbox" name={name} checked={isChecked} />
    </div>
  );
}

export default CheckBox;
