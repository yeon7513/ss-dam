import { useRef, useState } from "react";
import cn from "classnames";
import placeholder from "../../../assets/images/placeholder.png";
import FileInput from "../../forms/file-input/FileInput";
import styles from "./ProfileImageSection.module.scss";

const ProfileSection = ({ className, setForm }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  // 이미지 클릭 시 파일 선택창 열기
  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  // 프로필 이미지 변경 핸들러
  const handleChangeProfileImage = (files) => {
    const file = files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      // 상위 SignUp form state 업데이트
      setForm((prev) => ({ ...prev, file }));
    }
  };

  // 프로필 이미지 삭제 핸들러
  const handleRemoveImage = () => {
    setPreview(null);
    // 상위 SignUp form state 초기화
    setForm((prev) => ({ ...prev, file: null }));
  };

  return (
    <div className={styles.profileImgGroup}>
      <label className={styles.label}>프로필</label>

      <div className={cn(styles.profileImg, className)}>
        <img
          src={preview || placeholder}
          width={300}
          alt="프로필 미리보기"
          onClick={handleClickImage}
        />
        <FileInput ref={fileInputRef} onFileChange={handleChangeProfileImage} />
        {preview !== null && (
          <button type="button" onClick={handleRemoveImage}>
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
