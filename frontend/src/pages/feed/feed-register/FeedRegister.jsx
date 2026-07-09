import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../../components/common/editor/Editor";
import Hashtag from "../../../components/feed/hashtag/Hashtag";
import styles from "./FeedRegister.module.scss";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import { createFeedFormData } from "../../../utils/createFeedFormData.js";

// 초기값
const initPost = {
  title: "",
  content: "",
};

/* 피드 등록 */
const FeedRegister = () => {
  const navigate = useNavigate();
  const [hashs, setHashs] = useState([]);
  const [post, setPost] = useState(initPost);

  // 등록이 가능한 챌린지 카테고리 조회 (현재 진행 중인 카테고리만)
  const { data: categories } = useLoadData("/api/category/challenge/active");

  // 피드 등록 커스텀 훅 호출
  const { handleSubmit, loading } = useSubmitData("/api/feed", "POST");

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
      setPost((prev) => ({
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
    setPost((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((hash) => hash.tagName !== tagName),
    }));
  };

  // 서브밋 핸들러
  const handleRegisterFeed = async (newPost) => {
    try {
      const formData = createFeedFormData(newPost);
      const result = await handleSubmit(formData);

      // 값이 있을 경우
      if (result) {
        alert("등록되었습니다.");
        navigate(`/feed/${result}`);
      }
    } catch (err) {
      alert("등록에 실패했습니다.");
      console.error(err);
    }
  };


  return (
    <form>
      <Editor
        title="피드 등록"
        typeName="chalCode"
        post={post}
        setPost={setPost}
        categories={categories}
        onSubmit={handleRegisterFeed}
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
};

export default FeedRegister;
