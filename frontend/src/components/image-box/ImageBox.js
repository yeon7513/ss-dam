import cn from 'classnames';
import styles from './imageBox.module.scss';

const ImageBox = ({ className, src, alt, ...props }) => (
  <img
    className={cn(styles.ImageBox, className)}
    src={src}
    alt={alt}
    {...props}
  />
);

export default ImageBox;
