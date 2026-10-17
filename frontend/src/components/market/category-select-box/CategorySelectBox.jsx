import { useEffect, useMemo, useState } from "react";
import SelectBox from "../../forms/select-box/SelectBox.jsx";
import { handleSetField } from "../../../utils/changeHandler.js";
import styles from "./CategorySelectBox.module.scss";

/**
 * 마켓용 카테고리 선택 드롭다운 컴포넌트
 */
function CategorySelectBox({
  categories = [],
  initParentCode = "",
  initSubCode = "",
  setPost,
}) {
  /* 상위 및 하위 카테고리 코드 상태 관리 */
  const [parentCode, setParentCode] = useState(initParentCode);
  const [subCode, setSubCode] = useState(initSubCode);

  /* 초기 카테고리 선택 상태 설정 */
  useEffect(() => {
    if (!initParentCode || !categories.length) {
      // 카테고리 선택 상태를 초기화함.
      setParentCode("");
      setSubCode("");
      return;
    }

    // 상위 카테고리 존재 여부를 확인함.
    const isParent = categories.some(
      (cat) => String(cat.code) === String(initParentCode),
    );
    if (isParent) {
      setParentCode(initParentCode);
      setSubCode(initSubCode);
      return;
    }

    // 하위 카테고리의 부모 카테고리를 탐색함.
    const parent = categories.find((category) =>
      category.depth?.some(
        (sub) => String(sub.code) === String(initParentCode),
      ),
    );

    if (parent) {
      setParentCode(String(parent.code));
    }
  }, [initParentCode, initSubCode, categories]);

  /* 하위 카테고리 옵션 목록 추출 */
  const subCategoryOptions = useMemo(() => {
    if (!parentCode) {
      return [];
    }

    // 선택된 부모 카테고리의 하위 카테고리 목록을 반환함.
    const parent = categories?.find(
      (cat) => String(cat.code) === String(parentCode),
    );
    return parent?.depth || [];
  }, [categories, parentCode]);

  /* 상위 카테고리 변경 처리 */
  const handleChangeParentCategory = (e) => {
    // 상위 카테고리 변경 시 하위 카테고리를 초기화함.
    setParentCode(e.target.value);
    setSubCode("");
  };

  /* 하위 카테고리 변경 처리 */
  const handleChangeSubCategory = (e) => {
    // 선택된 하위 카테고리 값을 게시글 상태에 반영함.
    setSubCode(e.target.value);
    handleSetField(e, setPost);
  };

  return (
    /* 카테고리 선택 상자 영역 */
    <div className={styles.categorySelectBox}>
      {/* 상위 카테고리 선택 영역 */}
      <SelectBox
        options={categories}
        placeholder="대분류"
        hidePlaceholderOption
        selectedValue={parentCode}
        name="parentCategory"
        onChange={handleChangeParentCategory}
      />
      {/* 하위 카테고리 선택 영역 */}
      <SelectBox
        options={subCategoryOptions}
        placeholder="소분류"
        hidePlaceholderOption
        selectedValue={subCode}
        disabled={!parentCode || subCategoryOptions.length === 0}
        name="cateCode"
        onChange={handleChangeSubCategory}
      />
    </div>
  );
}

export default CategorySelectBox;
