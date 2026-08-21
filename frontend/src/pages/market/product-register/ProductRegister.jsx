import Editor from "../../../components/common/editor/Editor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoadData } from "../../../hooks/useLoadData.js";

// 초기값
const initPost = {
  title: "",
  content: "",
}

const ProductRegister = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initPost);

  const { data: categories } = useLoadData("/api/categories/challenge/active");

  return (
    <form>
      <Editor title="물품 등록" typeName="cateCode" onSubmit={null} />
    </form>
  );
};

export default ProductRegister;
