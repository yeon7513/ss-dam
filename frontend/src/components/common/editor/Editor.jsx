import { useState } from "react";
import cn from "classnames";
import CancelButton from "../button/cancel/CancelButton.jsx";
import styles from "./Editor.module.scss";
import TextInput from "../../forms/text-input/TextInput.jsx";
import { handleSetField } from "../../../utils/changeHandler.js";
import UploadImage from "../upload-images/UploadImages.jsx";
import Button from "../button/Button.jsx";

function Editor({
  selectCategoryBox,
  title,
  children,
  onSubmit,
  post = {},
  setPost,
  cancelUrl = "/feed",
  submitText = "등록",
  extraOptions = null,
}) {
  /* 업로드 이미지 상태 관리 */
  const [selectedImages, setSelectedImages] = useState(post?.imagePaths || []);

  /* 폼 제출 처리 */
  const handleSubmit = (e) => {
    // 폼 기본 제출 동작을 방지함.
    e.preventDefault();

    const resultData = {
      ...post,
      images: selectedImages,
    };

    setPost(resultData);
    onSubmit(resultData);
  };

  return (
    /* 에디터 영역 */
    <div className={cn(styles.editor)}>
      <h3>{title}</h3>
      {/* 에디터 컨테이너 영역 */}
      <div className={styles.container}>
        {/* 제목 입력 영역 */}
        <div className={styles.title}>
          {selectCategoryBox && selectCategoryBox}
          <TextInput
            placeholder="제목을 입력하세요."
            value={post?.title || ""}
            name="title"
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>

        {/* 옵션 그룹 영역 */}
        <div className={styles.optionGroup}>
          <UploadImage
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
          {extraOptions && <div className={styles.extra}>{extraOptions}</div>}
        </div>

        {/* 본문 입력 영역 */}
        <div className={styles.content}>
          <textarea
            placeholder="본문을 입력하세요."
            value={post?.content || ""}
            name="content"
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>

        {/* 폼 하단 영역 */}
        <div className={styles.formFooter}>
          {/* children 부분에 해시태그 및 가격 등록 섹션이 들어옴 */}
          {children}
          {/* 제출 버튼 그룹 영역 */}
          <div className={styles.submitGroup}>
            <Button btnStyle="submit" onClick={handleSubmit}>
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
