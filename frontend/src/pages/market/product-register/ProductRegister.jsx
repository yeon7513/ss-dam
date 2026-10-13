import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../../components/common/editor/Editor";
import TextInput from "../../../components/forms/text-input/TextInput.jsx";
import CategorySelectBox from "../../../components/market/category-select-box/CategorySelectBox.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSubmitData } from "../../../hooks/useSubmitData.js";
import { handleSetField } from "../../../utils/changeHandler.js";
import { createFormData } from "../../../utils/createFormData.js";
import styles from "./ProductRegister.module.scss";

/** 물품 등록 페이지 컴포넌트 */
const ProductRegister = () => {
  /* 페이지 이동 함수 정의 */
  const navigate = useNavigate();

  /* 게시글 상태 관리 */
  const [post, setPost] = useState({});

  /* 마켓 카테고리 데이터 조회 */
  const { data: categories } = useLoadData("/api/market/categories");

  /* 거래글 등록 요청 설정 */
  const { handleSubmit, loading } = useSubmitData(
    "/api/market/products",
    "POST",
  );

  /* 거래글 등록 처리 */
  const handleRegisterProduct = async (newPost) => {
    try {
      const formData = createFormData(newPost);
      const { data: newCode, success } = await handleSubmit(formData);

      if (success) {
        // 거래글 등록 성공 시 안내 후 상세 페이지로 이동함.
        alert("거래글이 등록되었습니다.");
        navigate(`/market/${newCode}`);
      } else {
        // 거래글 등록 실패 시 안내 메시지를 출력함.
        alert("거래글 등록에 실패했습니다.");
      }
    } catch (err) {
      // 서버 통신 에러 발생 시 안내 메시지를 출력함.
      alert("서버와 통신에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    /* 물품 등록 페이지 영역 */
    <main>
      {/* 물품 등록 양식 영역 */}
      <form>
        {/* 에디터 영역 */}
        <Editor
          title="물품 등록"
          post={post}
          setPost={setPost}
          selectCategoryBox={
            <CategorySelectBox categories={categories} setPost={setPost} />
          }
          cancelUrl="/market"
          submitText="등록"
          onSubmit={handleRegisterProduct}
        >
          {/* 가격 입력 영역 */}
          <div className={styles.priceWrap}>
            <label htmlFor="price">가격</label>
            <TextInput
              id="price"
              name="price"
              type="text"
              onChange={(e) => handleSetField(e, setPost)}
            />
          </div>
        </Editor>
      </form>
    </main>
  );
};

export default ProductRegister;
