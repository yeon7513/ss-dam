import cn from 'classnames';
import styles from './TextInput.module.scss';

function TextInput({
  className,
  label = '',
  type = 'text',
  name,
  onChange,
  icon,
  ...props
}) {
  return (
    <div className={cn(styles.wrap, className)}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={styles.textGroup}>
        <input
          id={name}
          type={type}
          name={name}
          onChange={onChange}
          autoComplete="off"
          {...props}
        />
        {icon && (
          <div className={styles.icon}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default TextInput;
