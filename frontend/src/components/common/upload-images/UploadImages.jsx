import cn from 'classnames';
import { useRef, useState } from 'react';
import placeholder from '../../../assets/images/placeholder.png';
import FileInput from '../../forms/file-input/FileInput';
import Button from '../button/Button';
import styles from './UploadImages.module.scss';

function UploadImage({ className, selectedImages, setSelectedImages }) {
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef();

  const MAX_COUNT = 10;
  const isMaxCount = selectedImages.length === MAX_COUNT;

  const handleChangeImage = (files) => {
    const newFiles = Array.from(files);
    const totalCount = selectedImages.length + newFiles.length;

    // 최대 개수 제한
    if (totalCount > MAX_COUNT) {
      alert(`최대 ${MAX_COUNT}장까지만 업로드할 수 있습니다.`);
    }

    const availableCount = MAX_COUNT - selectedImages.length;
    const slicedNewFiles = newFiles.slice(0, availableCount);

    slicedNewFiles.forEach((file) => {
      setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
      setSelectedImages((prev) => [...prev, file]);
    });
  };

  const handleDeleteImage = (e) => {
    const { target } = e.target.dataset;
    const targetIdx = Number(target);

    setPreviews(previews.filter((preview, idx) => idx !== targetIdx));
    setSelectedImages(selectedImages.filter((files, idx) => idx !== targetIdx));
  };

  return (
    <div className={cn(styles.uploadImage, className)}>
      {previews.length > 0 ? (
        previews.map((preview, idx) => (
          <div className={styles.imagePreview} key={idx}>
            <img src={preview || placeholder} width={300} />
            <button
              type="button"
              data-target={idx}
              onClick={(e) => handleDeleteImage(e)}
            >
              X
            </button>
          </div>
        ))
      ) : (
        <div>등록된 이미지가 없습니다.</div>
      )}
      {!isMaxCount && (
        <div>
          <Button onClick={() => fileInputRef.current.click()}>
            이미지 등록
          </Button>
          <FileInput ref={fileInputRef} onFileChange={handleChangeImage} />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
