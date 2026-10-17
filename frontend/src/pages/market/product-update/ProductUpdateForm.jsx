import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Editor from "../../../components/common/editor/Editor.jsx";
import RadioInput from "../../../components/forms/radio-input/RadioInput.jsx";
import TextInput from "../../../components/forms/text-input/TextInput.jsx";
import CategorySelectBox from "../../../components/market/category-select-box/CategorySelectBox.jsx";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import { handleSetField } from "../../../utils/changeHandler.js";
import { createFormData } from "../../../utils/createFormData.js";
import styles from "./ProductUpdate.module.scss";

const DEAL_STATUS = [
  { label: "판매중", name: "dealStatus", value: "ON_SALE" },
  { label: "예약중", name: "dealStatus", value: "IN_PROGRESS" },
  { label: "판매완료", name: "dealStatus", value: "SOLD" },
]

function ProductUpdateForm({ initPost, categories }) {
  // 카테고리를 다시 선택하지 않아도 기존 소분류가 cateCode로 전송되도록 초기값 설정
  const [updatedPost, setUpdatedPost] = useState({
    ...initPost,
    cateCode: initPost?.subCategoryCode,
  });
  const navigate = useNavigate();

  // 수정 완료 전송 핸들러
  const { handleSubmit } = useSubmitData(`/api/market/products/${initPost?.code}`, "PUT");

  const handleSubmitUpdatedPost = async (resultData) => {
    // 필수값 검증
    if (!resultData.cateCode) {
      alert("카테고리를 선택해 주세요.");
      return;
    }
    if (!resultData.title?.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }

    try {
      // 화면 표시용 필드는 전송에서 제외
      // eslint-disable-next-line no-unused-vars
      const { mainCategoryCode, subCategoryCode, ...sendData } = resultData;

      const formData = createFormData(sendData);
      const { success } = await handleSubmit(formData);

      if (success) {
        alert("작성된 거래글을 수정했습니다.");
        navigate(`/market/${initPost?.code}`);
      } else {
        alert("거래글 수정에 실패했습니다.");
      }
    } catch (err) {
      alert(err?.message || "거래글 수정 중 오류가 발생했습니다.");
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
            initParentCode={initPost?.mainCategoryCode}
            initSubCode={initPost?.subCategoryCode}
          />
        }
        onSubmit={handleSubmitUpdatedPost}
        submitText="수정"
        cancelUrl={`/market/${initPost?.code}`}
      >
        <div className={styles.meta}>
          <div className={styles.price}>
            <label htmlFor="price">가격</label>
            <TextInput
              id="price"
              type="text"
              name="price"
              value={updatedPost?.price ?? ""}
              onChange={(e) => handleSetField(e, setUpdatedPost)}
            />
          </div>
          <div className={styles.dealStatus}>
            {DEAL_STATUS.map((status) => (
              <RadioInput
                key={status.value}
                id={status.value}
                name={status.name}
                label={status.label}
                value={status.value}
                isChecked={status.value === updatedPost?.dealStatus}
                onChange={(e) => handleSetField(e, setUpdatedPost)}
              />
            ))}
          </div>
        </div>
      </Editor>
    </form>
  );
}

export default ProductUpdateForm;