import cn from 'classnames';
import FileInput from './../forms/file-input/FileInput';
import ImageBox from './../image-box/ImageBox';
import styles from './UploadImage.module.scss';

function UploadImage({ className }) {
  return (
    <div className={cn(styles.uploadImage, className)}>
      <ImageBox />
      <FileInput />
    </div>
  );
}

export default UploadImage;
