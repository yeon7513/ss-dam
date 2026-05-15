import cn from 'classnames';
import { useRef, useState } from 'react';
import placeholder from '../../../assets/images/placeholder.png';
import FileInput from '../../forms/file-input/FileInput';
import styles from './ProfileImage.module.scss';

function ProfileImage({ className, onChange }) {
  const [preview, setPreview] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  const handleChangeProfileImage = (files) => {
    const file = files[0];

    console.log(files);

    if (file) {
      // 이미지 미리보기
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
    console.log(preview);
  };

  return (
    <div className={cn(styles.profileImg, className)}>
      <img
        src={preview || placeholder}
        width={300}
        onClick={handleClickImage}
      />
      <FileInput ref={fileInputRef} onFileChange={handleChangeProfileImage} />
      {preview !== null && (
        <button type="button" onClick={handleRemoveImage}>
          삭제
        </button>
      )}
    </div>
  );
}

export default ProfileImage;
