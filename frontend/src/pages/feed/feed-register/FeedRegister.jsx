import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendToFeed } from "../../../api/feed";
import Editor from "../../../components/common/editor/Editor";
import Hashtag from "../../../components/feed/hashtag/Hashtag";
import styles from "./FeedRegister.module.scss";

// 초기값
const initPost = {
  memCode: "",
  title: "",
  content: "",
};

/* 피드 등록 */
const FeedRegister = () => {
  const navigate = useNavigate();
  const [hashs, setHashs] = useState([]);
  const [post, setPost] = useState(initPost);

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
  const handleSubmit = (post) => {
    sendToFeed(post, navigate);
  };

  return (
    <form>
      <Editor
        title="피드 등록"
        typeName="chalCode"
        post={post}
        setPost={setPost}
        onSubmit={handleSubmit}
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
