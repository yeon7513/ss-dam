import cn from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendToFeed } from '../../../api/feed';
import { feedCategory } from '../../../lib/categoryTest';
import { handleSetField } from '../../../utils/changeHandler';
import TextInput from '../../forms/text-input/TextInput';
import SelectBox from './../../forms/select-box/SelectBox';
import Button from './../button/Button';
import styles from './Editor.module.scss';

function Editor({ type = 'chalCode', categories = feedCategory, title }) {
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
    const value = e.target.value.trim().replace(/\s+/g, '');
    const tag = {
      tagName: value, // DTO 이름에 맞게 먼저 설정
    };

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
        hashtags: [...(prev.hashtags || []), tag],
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

  // 서브밋 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 임시로 회원 번호 넣음
    setPost((prev) => ({
      ...prev,
      memCode: 1,
    }));

    sendToFeed(post, navigate);
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
      <form className={styles.container}>
        <div className={styles.title}>
          <SelectBox
            name={type}
            options={categories}
            onChange={(e) => handleSetField(e, setPost)}
          />
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
          <Button onClick={handleNavigateBack}>취소</Button>
        </div>
      </form>
    </div>
  );
}

export default Editor;
