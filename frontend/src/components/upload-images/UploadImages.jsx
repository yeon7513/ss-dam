import cn from 'classnames';
import { useState } from 'react';
import placeholder from '../../assets/images/placeholder.png';
import FileInput from '../forms/file-input/FileInput';
import styles from './UploadImage.module.scss';

function UploadImage({ className }) {
  const [preview, setPreview] = useState(null);

  const MAX_COUNT = 10;

  const handleChangeImage = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={cn(styles.uploadImage, className)}>
      <img src={preview || placeholder} width={300} />
      <FileInput onFileChange={handleChangeImage} />
    </div>
  );
}

export default UploadImage;
