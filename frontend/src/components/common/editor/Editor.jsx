import cn from 'classnames';
import { useState } from 'react';
import { feedCategory } from '../../../lib/categoryTest';
import { handleSetField } from '../../../utils/changeHandler';
import TextInput from '../../forms/text-input/TextInput';
import CancelButton from '../button/CancelButton';
import SelectBox from './../../forms/select-box/SelectBox';
import Button from './../button/Button';
import UploadImage from './../upload-images/UploadImages';
import styles from './Editor.module.scss';

// 초기값
const initPost = {
  memCode: '',
  title: '',
  content: '',
};

function Editor({
  typeName = 'chalCode', // 분류 코드 (FK)
  categories = feedCategory, // 카테고리명 (임시로 넣음)
  title,
  children,
  onSubmit, // AJAX 전송 핸들러
}) {
  const [post, setPost] = useState(initPost);
  const [hashs, setHashs] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // ** 해시태그 관련 핸들러 및 코드들은 해시태그 컴포넌트로 옮길 예정임.

  // 해시태그 등록 핸들러
  const handleRegisterHashs = (e) => {
    // 앞뒤 공백 제거, 중간 공백 제거
    const value = e.target.value.trim().replace(/\s+/g, '');

    if (e.code === 'Enter' && value !== '') {
      // 중복 비허용
      if (hashs.includes(value)) {
        // 이 부분에 해당 input에 중복관련 경고 띄우면 좋을 것 같음.
        e.target.value = '';
        return;
      }

      // 화면 렌더링용
      setHashs((prev) => [...prev, value]);

      // 서버 전송용
      setPost((prev) => ({
        ...prev,
        hashtags: [
          ...(prev.hashtags || []),
          {
            tagName: value,
          },
        ],
      }));

      e.target.value = '';
    }
  };

  // 해시태그 삭제
  const handleDeleteHash = (tagName) => {
    setHashs(hashs.filter((hash) => hash !== tagName));
    setPost((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((hash) => hash.tagName !== tagName),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 임시로 회원 번호 넣음
    setPost((prev) => ({
      ...prev,
      files: selectedImages,
    }));

    onSubmit(post);
  };

  return (
    <div className={cn(styles.editor)}>
      <h3>{title}</h3>
      <div className={styles.container}>
        <div className={styles.title}>
          <SelectBox
            name={typeName}
            options={categories}
            onChange={(e) => handleSetField(e, setPost)}
          />
          <TextInput
            name="title"
            placeholder="제목을 입력하세요."
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
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>
        {children} {/* 여기로 해시태그 컴포넌트 넣을 예정임 */}
        {/* 
          이 부분을 다 해시태그로 옮겨서 값들을 props로 전달 받을 것!! 
          피드로 들어왔을 경우에만 해시태그 섹션 열림
        */}
        <div className={styles.hash}>
          <div className={styles.regHashs}>
            {hashs.length === 0 ? (
              <p>등록된 태그가 없습니다.</p>
            ) : (
              hashs.map((hash, idx) => (
                // 해시태그 컴포넌트 완성되면 변경할 것
                <div key={idx}>
                  <button type="button" onClick={() => handleDeleteHash(hash)}>
                    # {hash} X
                  </button>
                </div>
              ))
            )}
          </div>
          <input
            type="text"
            onKeyUp={handleRegisterHashs}
            placeholder="해시태그 등록"
          />
        </div>
        <div className={styles.submit}>
          <Button onClick={handleSubmit}>피드 등록</Button>
          <CancelButton targetUrl="/feed">취소</CancelButton>
        </div>
      </div>
    </div>
  );
}

export default Editor;
