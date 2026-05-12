import cn from 'classnames';
import styles from './TextInput.module.scss';

function TextInput({
  className,
  label = '',
  type = 'text',
  name,
  onChange,
  ...props
}) {
  return (
    <div className={cn(styles.wrap, className)}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        onChange={onChange}
        autoComplete="off"
        {...props}
      />
    </div>
  );
}

export default TextInput;
