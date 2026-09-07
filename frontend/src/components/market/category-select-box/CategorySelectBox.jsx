import React, { useEffect, useMemo, useState } from 'react';
import SelectBox from "../../forms/select-box/SelectBox.jsx";
import { handleSetField } from "../../../utils/changeHandler.js";

// 마켓용 카테고리 선택 드롭다운
function CategorySelectBox({ categories, initValue = '', setPost }) {
  const [parentCode, setParentCode] = useState('');
  const [subCode, setSubCode] = useState('');

  // 수정 모드이거나 초기 값이 있을 때 상위 카테고리 역추적
  useEffect(() => {
    if (!initValue || !categories.length) {
      setParentCode('');
      setSubCode('');
      return;
    }

    // 현재 value가 상위 카테고리인지 체크
    const isParent = categories.some((cat) => String(cat.code) === String(initValue));
    if (isParent) {
      setParentCode(initValue);
      return;
    }

    // 현재 value가 하위 카테고리라면 해당 부모 찾기
    const parent = categories.find((category) =>
      category.depth?.some((sub) => String(sub.code) === String(initValue)),
    );

    if (parent) {
      setParentCode(String(parent.code));
    }
  }, [initValue, categories]);

  // 상위 선택값에 따른 하위 카테고리 옵션 추출
  const subCategoryOptions = useMemo(() => {
    if (!parentCode) {
      return [];
    }
    const parent = categories.find((cat) => String(cat.code) === String(parentCode));
    return parent?.depth || [];
  }, [categories, parentCode]);

  console.log("subCategoryOptions: ", subCategoryOptions);

  return (
    <div>
      {/* 상위 카테고리 */}
      <SelectBox
        name="parentCategory"
        options={categories}
        selectedValue={parentCode}
        onChange={(e) => setParentCode(e.target.value)}
        placeholder="상위 카테고리"
      />
      {/* 하위 카테고리 */}
      <SelectBox
        name="cateCode"
        options={subCategoryOptions}
        onChange={(e) => handleSetField(e, setPost)}
        placeholder="하위 카테고리"
      />
    </div>
  );
}

export default CategorySelectBox;
