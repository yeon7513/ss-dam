import Editor from "../../../components/common/editor/Editor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import { createFormData } from "../../../utils/createFormData.js";
import CategorySelectBox from "../../../components/market/category-select-box/CategorySelectBox.jsx";

const ProductRegister = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  // 등록이 가능한 마켓 카테고리 조회
  const { data: categories } = useLoadData("/api/market/categories");

  console.log(categories);

  // 거래글 등록 커스텀 훅 호출
  const { handleSubmit, loading } = useSubmitData("/api/market/products", "POST");

  // 서브밋 핸들러
  const handleRegisterProduct = async (newPost) => {
    try {
      const formData = createFormData(newPost);
      const { data: newCode, success } = await handleSubmit(formData);

      if (success) {
        alert("거래글이 등록되었습니다.");
        navigate(`/market/${newCode}`);
      } else {
        alert("거래글 등록에 실패했습니다.");
      }
    } catch (err) {
      alert("서버와 통신에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <main>
      <form>
        <Editor
          title="물품 등록"
          post={post}
          setPost={setPost}
          onSubmit={handleRegisterProduct}
          selectCategoryBox={
            <CategorySelectBox
              categories={categories}
              setPost={setPost}
            />}
          cancelUrl="/market"
          submitText="물품 등록"
        />
      </form>
    </main>
  );
};

export default ProductRegister;
