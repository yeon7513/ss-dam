import cn from 'classnames';
import { useRef, useState } from 'react';
import placeholder from '../../assets/images/placeholder.png';
import FileInput from '../forms/file-input/FileInput';
import styles from './ProfileImage.module.scss';

function ProfileImage({ className }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleChangeImage = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  return (
    <div className={cn(styles.uploadImage, className)}>
      <img src={preview || placeholder} width={300} />
      <FileInput ref={fileInputRef} onFileChange={handleChangeImage} />
    </div>
  );
}

export default ProfileImage;
