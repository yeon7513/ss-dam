import cn from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSetField } from '../../../utils/changeHandler';
import TextInput from '../../forms/text-input/TextInput';
import SelectBox from './../../forms/select-box/SelectBox';
import Button from './../button/Button';
import styles from './Editor.module.scss';

function Editor({ title, categories }) {
  const [post, setPost] = useState({
    memCode: '',
    title: '',
    content: '',
  });
  const [hashs, setHashs] = useState([]);

  const navigate = useNavigate();

  // ** 해시태그 관련 핸들러 및 코드들은 해시태그 컴포넌트로 옮길 예정임.

  // 해시태그 등록 핸들러
  const handleRegisterHashs = (e) => {
    // 앞뒤 공백 제거, 중간 공백 제거
    const hashtag = e.target.value.trim().replace(/\s+/g, '');

    if (e.code === 'Enter') {
      if (hashtag !== '') {
        // 중복 비허용
        if (!hashs.includes(hashtag)) {
          setHashs([...hashs, hashtag]);
        }
      }

      e.target.value = '';
    }
  };

  // 해시태그 삭제
  const handleDeleteHash = (e) => {
    const targetHash = Number(e.target.dataset.idx);
    setHashs(hashs.filter((hash, idx) => idx !== targetHash));
  };

  // 취소 버튼 핸들러
  const handleNavigateBack = () => {
    if (
      confirm(
        `작성을 취소하시겠습니까?\n취소하면 작성한 내용은 저장되지 않습니다.`,
      )
    ) {
      navigate(-1);
    }
  };

  return (
    <div className={cn(styles.editor)}>
      <h3>{title}</h3>
      <div className={styles.container}>
        <div className={styles.title}>
          <SelectBox options={categories} />
          <TextInput
            name="title"
            placeholder="제목을 입력하세요."
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>
        <div className={styles.content}>
          {/* 텍스트 에디터 라이브러리로 바꿀 것... */}
          <textarea
            name="content"
            onChange={(e) => handleSetField(e, setPost)}
          />
        </div>
        <div className={styles.hash}>
          <div className={styles.regHashs}>
            {hashs.length === 0 ? (
              <p>등록된 태그가 없습니다.</p>
            ) : (
              hashs.map((hash, idx) => (
                // 해시태그 컴포넌트 완성되면 변경할 것
                <div key={idx}>
                  <span>{hash}</span>
                  <button
                    type="button"
                    data-idx={idx}
                    onClick={handleDeleteHash}
                  >
                    X
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
          <Button type="submit">피드 등록</Button>
          <Button type="button" onClick={handleNavigateBack}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
