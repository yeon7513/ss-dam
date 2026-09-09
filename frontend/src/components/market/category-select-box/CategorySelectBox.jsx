import React, { useEffect, useMemo, useState } from 'react';
import SelectBox from "../../forms/select-box/SelectBox.jsx";
import { handleSetField } from "../../../utils/changeHandler.js";

// 마켓용 카테고리 선택 드롭다운
function CategorySelectBox({ categories, initParentCode = '', initSubCode = '', setPost }) {
  const [parentCode, setParentCode] = useState(initParentCode);
  const [subCode, setSubCode] = useState(initSubCode);

  // 수정 모드이거나 초기 값이 있을 때 상위 카테고리 역추적
  useEffect(() => {
    if (!initParentCode || !categories.length) {
      setParentCode('');
      setSubCode('');
      return;
    }

    // 현재 value가 상위 카테고리인지 체크
    const isParent = categories.some((cat) => String(cat.code) === String(initParentCode));
    if (isParent) {
      setParentCode(initParentCode);
      setSubCode(initSubCode);
      return;
    }

    // 현재 value가 하위 카테고리라면 해당 부모 찾기
    const parent = categories.find((category) =>
      category.depth?.some((sub) => String(sub.code) === String(initParentCode)),
    );

    if (parent) {
      setParentCode(String(parent.code));
    }
  }, [initParentCode, initSubCode, categories]);

  // 상위 선택값에 따른 하위 카테고리 옵션 추출
  const subCategoryOptions = useMemo(() => {
    if (!parentCode) {
      return [];
    }

    const parent = categories?.find((cat) => String(cat.code) === String(parentCode));
    return parent?.depth || [];
  }, [categories, parentCode]);

  // 상위 카테고리 변경 시 선택된 하위 카테고리 초기화
  const handleChangeParentCategory = (e) => {
    setParentCode(e.target.value);
    setSubCode('');
  }

  // 하위 카테고리 변경 핸들러
  const handleChangeSubCategory = (e) => {
    setSubCode(e.target.value);
    handleSetField(e, setPost);
  }


  return (
    <div>
      {/* 상위 카테고리 */}
      <SelectBox
        name="parentCategory"
        options={categories}
        selectedValue={parentCode}
        onChange={(e) => handleChangeParentCategory(e)}
        placeholder="대분류"
      />
      {/* 하위 카테고리 */}
      <SelectBox
        name="cateCode"
        options={subCategoryOptions}
        selectedValue={subCode}
        onChange={(e) => handleChangeSubCategory(e, setPost)}
        placeholder="소분류"
        disabled={!parentCode || subCategoryOptions.length === 0}
      />
    </div>
  );
}

export default CategorySelectBox;
