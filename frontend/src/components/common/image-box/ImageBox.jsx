import cn from 'classnames';
import placeholder from '../../../assets/images/placeholder.png';
import styles from './imageBox.module.scss';

const ImageBox = ({ className, src, alt, ...props }) => {
  return (
    <img
      className={cn(styles.imageBox, className)}
      src={src || placeholder}
      alt={alt}
      {...props}
    />
  );
};

export default ImageBox;
