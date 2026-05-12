import cn from 'classnames';
import styles from './TextInput.module.scss';

function TextInput({
  className,
  id,
  label = '',
  type = 'text',
  name,
  onChange,
  ...props
}) {
  return (
    <div className={cn(styles.input, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} type={type} name={name} onChange={onChange} {...props} />
    </div>
  );
}

export default TextInput;
