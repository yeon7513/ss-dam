import React, { useState } from 'react';
import Editor from "../../../components/common/editor/Editor.jsx";
import CategorySelectBox from "../../../components/market/category-select-box/CategorySelectBox.jsx";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import { createFormData } from "../../../utils/createFormData.js";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/forms/text-input/TextInput.jsx";
import { handleSetField } from "../../../utils/changeHandler.js";

function ProductUpdateForm({ initPost, categories }) {
  const [updatedPost, setUpdatedPost] = useState(initPost);
  const navigate = useNavigate();

  console.log("updatedPost: ", updatedPost);


  console.log(updatedPost?.code);

  // 수정 완료 전송 핸들러
  const { handleSubmit } = useSubmitData(`/api/market/products/${updatedPost?.code}`, "PUT");

  const handleSubmitUpdatedPost = async (resultData) => {
    try {
      const formData = createFormData(resultData);
      const { success } = await handleSubmit(formData);

      if (success) {
        alert("작성된 거래글을 수정했습니다.");
        navigate(`/market/${initPost?.code}`);
      } else {
        alert("거래글 수정에 실패했습니다.");
      }
    } catch (err) {
      alert("거래글 수정 중 오류가 발생했습니다.");
      console.error(err);
    }
  }

  return (
    <form>
      <Editor
        title="거래글 수정"
        post={updatedPost}
        setPost={setUpdatedPost}
        selectCategoryBox={
          <CategorySelectBox
            categories={categories}
            setPost={setUpdatedPost}
            initParentCode={updatedPost?.mainCategoryCode}
            initSubCode={updatedPost?.subCategoryCode}
          />
        }
        onSubmit={handleSubmitUpdatedPost}
        submitText="수정"
        cancelUrl={`/market/${initPost?.code}`}
      >
        <div>
          <label htmlFor="price">가격</label>
          <TextInput
            id="price"
            type="text"
            name="price"
            value={updatedPost?.price}
            onChange={(e) => handleSetField(e, setUpdatedPost)}
          />
        </div>
      </Editor>
    </form>
  );
}

export default ProductUpdateForm;
