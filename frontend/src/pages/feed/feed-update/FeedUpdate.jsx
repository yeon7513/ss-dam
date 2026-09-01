import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { createFeedFormData } from "../../../utils/createFeedFormData.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import Editor from "../../../components/common/editor/Editor.jsx";
import styles from "../feed-register/FeedRegister.module.scss";
import Hashtag from "../../../components/feed/hashtag/Hashtag.jsx";

// 수정용 컴포넌트
function FeedUpdate() {
  const navigate = useNavigate();
  const { code } = useParams();

  // 수정할 피드 데이터 불러오기
  const { data } = useLoadData(`/api/feeds/${code}/edit`);
  const initFeed = data || {};

  const [updatedFeed, setUpdatedFeed] = useState(initFeed);
  const [hashs, setHashs] = useState(updatedFeed?.hashtags);

  // 수정된 피드 데이터 state

  // 수정된 피드 전송
  const { handleSubmit } = useSubmitData("/api/feeds", "PUT");

  // 피드 전송 핸들러
  const handleSubmitUpdatedFeed = async (updatedFeed) => {
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
      setHashs((prev) => [...prev, value]);

      // 서버 전송용
      setUpdatedFeed((prev) => ({
        ...prev,
        hashtags: [
          ...(prev.hashtags || []),
          {
            tagName: value,
          },
        ],
      }));

      e.target.value = "";
    }
  };

  // 해시태그 삭제
  const handleDeleteHash = (tagName) => {
    setHashs(hashs.filter((hash) => hash !== tagName));
    setUpdatedFeed((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((hash) => hash.tagName !== tagName),
    }));
  };


  console.log("initFeed: ", initFeed);

  if (!initFeed) {
    alert("해당 게시글을 수정할 수 없습니다.");
    navigate(-1);
  }

  return (
    <main>
      <form>
        <Editor post={initFeed} setPost={setUpdatedFeed} onSubmit={handleSubmitUpdatedFeed}>
          <div className={styles.hash}>
            <div className={styles.regHashs}>
              {hashs?.length === 0 ? (
                <p>등록된 태그가 없습니다.</p>
              ) : (
                hashs?.map((hash, idx) => (
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
    </main>
  );
}

export default FeedUpdate;
