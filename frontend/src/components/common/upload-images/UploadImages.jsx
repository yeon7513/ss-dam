import cn from 'classnames';
import { useCallback, useRef, useState } from 'react';
import placeholder from '../../../assets/images/placeholder.png';
import FileInput from '../../forms/file-input/FileInput';
import Button from '../button/Button';
import styles from './UploadImages.module.scss';
import ImageBox from "../image-box/ImageBox.jsx";
import { MdImageNotSupported } from "react-icons/md";

function UploadImage({ className, selectedImages, setSelectedImages }) {
  const [previews, setPreviews] = useState(selectedImages || []);
  const fileInputRef = useRef();

  const MAX_COUNT = 10;
  const isMaxCount = selectedImages.length === MAX_COUNT;

  // 이미지 미리보기 등록
  const handleChangeImage = (files) => {
    const newFiles = Array.from(files);
    const totalCount = selectedImages.length + newFiles.length;

    // 최대 개수 제한
    if (totalCount > MAX_COUNT) {
      alert(`최대 ${MAX_COUNT}장까지만 업로드할 수 있습니다.`);
    }

    const availableCount = MAX_COUNT - selectedImages.length;
    const slicedNewFiles = newFiles.slice(0, availableCount);

    // 새 이미지가 추가될 때마다 state를 동기화
    slicedNewFiles.forEach((file) => {
      setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
      setSelectedImages((prev) => [...prev, file]);
    });
  };

  // 등록할 이미지 삭제
  const handleDeleteImage = (e) => {
    const { target } = e.target.dataset;
    const targetIdx = Number(target);

    setPreviews(previews.filter((preview, idx) => idx !== targetIdx));
    setSelectedImages(selectedImages.filter((files, idx) => idx !== targetIdx));
  };

  // 대표 이미지 선택 -> 선택한 이미지를 배열의 맨 앞(0번 인덱스)으로 이동
  const handleSetRepresentativeImage = (targetIdx) => {
    if (targetIdx === 0) return; // 이미 대표 이미지면 무시

    // 미리보기용
    setPreviews((prev) => {
      const newPreviews = [...prev];
      // 기존 위치에서 뽑아냄
      const target = newPreviews.splice(targetIdx, 1)[0];
      // 맨 앞에 삽입
      newPreviews.unshift(target);
      return newPreviews;
    });

    // 실제 서버 전송용
    setSelectedImages((prev) => {
      const newFiles = [...prev];
      const target = newFiles.splice(targetIdx, 1)[0];
      newFiles.unshift(target);
      return newFiles;
    });
  };

  // 이미지 리스트 가로 스크롤 ref
  const scrollRef = useCallback((node) => {

    if (node !== null) {
      const handleWheel = (e) => {

        if (e.deltaY !== 0) {
          e.preventDefault();
          node.scrollLeft += e.deltaY; // 세로 휠 동작을 가로 스크롤로 전환
        }
      };

      node.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        node.removeEventListener('wheel', handleWheel);
      }
    }
  }, []);

  return (
    <div className={cn(styles.uploadImage, className)}>
      {previews.length > 0 ? (
        <div className={styles.preview} ref={scrollRef}>
          {previews.map((preview, idx) => (
            <div className={styles.previewItem} key={idx}>
              <ImageBox src={preview || placeholder} alt="preview" />

              {/* 인덱스 0번은 대표 이미지로 표시, 나머지는 설정 버튼 표시 */}
              <div className={styles.badgeContainer}>
                {idx === 0 ? (
                  <span className={styles.representativeBadge}>대표 이미지</span>
                ) : (
                  <button
                    className={styles.changeRepresentativeImageButton}
                    type="button"
                    onClick={() => handleSetRepresentativeImage(idx)}
                  >
                    대표로 설정
                  </button>
                )}
              </div>

              <button
                type="button"
                data-target={idx}
                onClick={(e) => handleDeleteImage(e)}
              >
                X
              </button>
            </div>
          ))
          }
        </div>
      ) : (
        <div className={styles.noImages}>
          <MdImageNotSupported className={styles.icon} />
          <span>등록된 이미지가 없습니다.</span>
        </div>
      )}
      {!isMaxCount && (
        <div className={styles.registerImageButton}>
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
