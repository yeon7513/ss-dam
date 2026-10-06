import cn from "classnames";
import { useState } from "react";
import { handleSetField } from "../../../utils/changeHandler";
import TextInput from "../../forms/text-input/TextInput";
import CancelButton from "../button/cancel/CancelButton.jsx";
import Button from "./../button/Button";
import UploadImage from "./../upload-images/UploadImages";
import styles from "./Editor.module.scss";

function Editor({
  selectCategoryBox, // 카테고리 선택
  title,
  children, // 해시태그용 (피드)
  onSubmit, // AJAX 전송 핸들러
  post = {},
  setPost,
  cancelUrl = "/feed",
  submitText = "등록",
  extraOptions = null, // 관리자 전용 등록 옵션
}) {
  const [selectedImages, setSelectedImages] = useState(post?.imagePaths || []);

  // 입력된 데이터 전송
  const handleSubmit = (e) => {
    e.preventDefault();

    const resultData = {
      ...post,
      images: selectedImages,
    };

    console.log("resultData: ", resultData);

    setPost(resultData);
    onSubmit(resultData);
  };

  return (
    <div className={cn(styles.editor)}>
      <h3>{title}</h3>
      <div className={styles.container}>
        <div className={styles.title}>
          {/* 카테고리 선택용 컴포넌트 영역 */}
          {selectCategoryBox && (selectCategoryBox)}
          {/* 제목 */}
          <TextInput
            name="title"
            placeholder="제목을 입력하세요."
            value={post?.title || ''}
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>
        <div className={styles.optionGroup}>
          <UploadImage
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
          {
            // 관리자 전용 옵션 영역
            extraOptions && (
              <div className={styles.extra}>
                {extraOptions}
              </div>
            )
          }
        </div>
        <div className={styles.content}>
          <textarea
            name="content"
            value={post?.content || ''}
            placeholder="본문을 입력하세요."
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>
        <div className={styles.formFooter}>
          {/* children 부분에 해시태그 및 가격 등록 섹션이 들어옴 */}
          {children}
          <div className={styles.submitGroup}>
            <Button onClick={handleSubmit}>
              {submitText}
            </Button>
            <CancelButton targetUrl={cancelUrl}>취소</CancelButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
