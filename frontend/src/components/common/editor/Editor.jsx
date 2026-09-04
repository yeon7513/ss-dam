import cn from "classnames";
import { useState } from "react";
import { handleSetField } from "../../../utils/changeHandler";
import TextInput from "../../forms/text-input/TextInput";
import CancelButton from "../button/CancelButton";
import SelectBox from "./../../forms/select-box/SelectBox";
import Button from "./../button/Button";
import UploadImage from "./../upload-images/UploadImages";
import styles from "./Editor.module.scss";

function Editor({
  typeName, // 분류 코드 (FK)
  categories, // 카테고리명
  selectedValue,
  title,
  children, // 해시태그용 (피드)
  onSubmit, // AJAX 전송 핸들러
  post = {},
  setPost,
}) {
  const [selectedImages, setSelectedImages] = useState(post?.imagePaths || []);

  // 등록, 수정 모드 판별
  const isEditMode = post?.code;
  const modeText = isEditMode ? "수정" : "등록";

  // 전송
  const handleSubmit = (e) => {
    e.preventDefault();

    const resultData = {
      ...post,
      images: selectedImages,
    };

    setPost(resultData);
    onSubmit(resultData);
  };

  return (
    <div className={cn(styles.editor)}>
      <h3>{title}</h3>
      <div className={styles.container}>
        <div className={styles.title}>
          <SelectBox
            name={typeName}
            options={categories}
            selectedValue={post?.[typeName] ?? selectedValue ?? ""}
            onChange={(e) => handleSetField(e, setPost)}
          />
          <TextInput
            name="title"
            placeholder="제목을 입력하세요."
            value={post?.title || ''}
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>
        <div className={styles.images}>
          <UploadImage
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        </div>
        <div className={styles.content}>
          {/* 텍스트 에디터 라이브러리로 바꿀 것... */}
          <textarea
            name="content"
            value={post?.content || ''}
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>
        {/* children 부분에 해시태그 등록 섹션이 들어옴 -> 피드에서만 사용, 마켓은 사용 X  */}
        {children}
        <div className={styles.submit}>
          <Button onClick={handleSubmit}>
            {typeName === "chalCode" ? "피드" : "거래글"} {modeText}
          </Button>
          <CancelButton targetUrl={typeName === "chalCode" ? "/feed" : "/market"}>취소</CancelButton>
        </div>
      </div>
    </div>
  );
}

export default Editor;
