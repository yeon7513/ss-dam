import React, { useState } from 'react';
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import { createFeedFormData } from "../../../utils/createFeedFormData.js";
import Editor from "../../../components/common/editor/Editor.jsx";
import styles from "../feed-register/FeedRegister.module.scss";
import Hashtag from "../../../components/feed/hashtag/Hashtag.jsx";
import { useNavigate } from "react-router-dom";

// 수정용 폼 컴포넌트 -> 여기서 실제 데이터 가공과 전송이 이루어진다.
function FeedUpdateForm({ initFeed, categories }) {
  const navigate = useNavigate();

  // 수정된 피드 데이터 state
  const [updatedFeed, setUpdatedFeed] = useState(initFeed);
  const [hashs, setHashs] = useState(initFeed?.hashtags || []);

  // const selectedChallenge = categories?.find(category => category.code === updatedFeed?.chalCode);

  // 수정된 피드 전송
  const { handleSubmit } = useSubmitData("/api/feeds", "PUT");

  // 피드 전송 핸들러
  const handleSubmitUpdatedFeed = async () => {
    try {
      const formData = createFeedFormData(updatedFeed);
      const result = await handleSubmit(formData);

      if (result) {
        alert("작성된 피드를 수정했습니다.");
        navigate("/feed", { state: { code: result } });
      }

    } catch (err) {
      alert("피드 수정에 실패했습니다.");
      console.error(err);
    }
  }

  // 해시태그 등록 핸들러
  const handleRegisterHashs = (e) => {
    // 앞뒤 공백 제거, 중간 공백 제거
    const value = e.target.value.trim().replace(/\s+/g, "");

    if (e.code === "Enter" && value !== "") {
      // 중복 비허용
      if (hashs.includes(value)) {
        // 이 부분에 해당 input에 중복관련 경고 띄우면 좋을 것 같음.
        e.target.value = "";
        return;
      }

      // 화면 렌더링용
      setHashs((prev) => [...(prev || []), value]);

      // 서버 전송용
      setUpdatedFeed((prev) => ({
        ...prev,
        hashtags: [...(prev?.hashtags || []), value],
      }));

      e.target.value = "";
    }
  };

  // 해시태그 삭제
  const handleDeleteHash = (tagName) => {
    // prev.hashtags가 자꾸 undefined로 나옴.. 안전하게 처리하기 위해 빈 배열을 기본값으로 사용
    // -> 비동기 통신으로 인해 데이터가 언제 넘어올 지 모르기 때문에 안전장치를 추가함.
    setHashs((hashs || []).filter((hash) => hash !== tagName));
    setUpdatedFeed((prev) => ({
      ...prev,
      hashtags: (prev?.hashtags || []).filter((hash) => hash !== tagName),
    }));
  };
  return (
    <form>
      <Editor
        title="피드 수정"
        typeName="chalCode"
        post={updatedFeed}
        setPost={setUpdatedFeed}
        categories={categories}
        selectedValue={updatedFeed?.chalCode}
        onSubmit={handleSubmitUpdatedFeed}
      >
        <div className={styles.hash}>
          <div className={styles.regHashs}>
            {hashs.length === 0 ? (
              <p>등록된 태그가 없습니다.</p>
            ) : (
              hashs.map((hash, idx) => (
                <Hashtag key={idx}>
                  <button type="button" onClick={() => handleDeleteHash(hash)}>
                    # {hash} X
                  </button>
                </Hashtag>
              ))
            )}
          </div>
          <input
            type="text"
            onKeyUp={handleRegisterHashs}
            placeholder="해시태그 등록"
          />
        </div>
      </Editor>
    </form>
  );
}

export default FeedUpdateForm;
