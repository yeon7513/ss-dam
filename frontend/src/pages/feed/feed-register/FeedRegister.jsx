import { useNavigate } from "react-router-dom";
import { sendToFeed } from "../../../api/feed";
import Editor from "../../../components/common/editor/Editor";

/* 피드 등록 */
const FeedRegister = () => {
  const navigate = useNavigate();

  // 서브밋 핸들러
  const handleSubmit = (post) => {
    sendToFeed(post, navigate);
  };

  return (
    <form>
      <Editor title="피드 등록" typeName="chalCode" onSubmit={handleSubmit} />
    </form>
  );
};

export default FeedRegister;
