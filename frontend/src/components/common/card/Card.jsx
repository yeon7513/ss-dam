import cn from 'classnames';
import styles from './Card.module.scss';

function Card({ className, children }) {
  return <div className={cn(styles.card, className)}>{children}</div>;
}

export default Card;
