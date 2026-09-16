import SelectBox from "../../forms/select-box/SelectBox";
import TextInput from "../../forms/text-input/TextInput";
import Button from "./../button/Button";
import cn from "classnames";
import styles from "./SearchBox.module.scss";
import { useState } from "react";
import RadioInput from "../../forms/radio-input/RadioInput.jsx";

function SearchBox({
  className,
  name,
  isRadio = false,
  initSelectValue,
  initKeyword,
  options = null,
  onSubmit,
}) {
  const [selectValue, setSelectValue] = useState(initSelectValue);
  const [keyword, setKeyword] = useState(initKeyword);

  // 검색 조건 서브밋 핸들러
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    onSubmit({
      [name]: selectValue,
      keyword,
    });
  };

  // 검색 조건 드롭다운 변경 시
  const handleChangeSearchCode = (e) => {
    const value = e.target.value;
    setSelectValue(value);
    // 키워드 input 초기화
    setKeyword("");

    onSubmit({
      [name]: value,
      keyword: "",
    });
  };

  // 검색어 입력 시
  const handleChangeKeyword = (e) => {
    const value = e.target.value;

    // 키워드 input 값이 없어질 경우
    // 검색된 결과 초기화
    if (value.trim() === "") {
      onSubmit({
        [name]: "",
        keyword: "",
      });
    } else {
      onSubmit({
        [name]: selectValue,
        keyword: "",
      });
    }

    setKeyword(value);
  };

  // 라디오 or 드롭다운 렌더링 분기 처리
  const renderFilters = () => {
    if (!options) return null;

    // 라디오 버튼으로 조건을 지정할 경우
    if (isRadio) {
      return (
        <div className={styles.radioGroup}>
          {options.map((option) => (
            <RadioInput
              key={option.code}
              id={option.code}
              name={name}
              value={option.code}
              label={option.name}
              checked={option.code === Number(selectValue)}
              onChange={(e) => handleChangeSearchCode(e)}
            />
          ))}
        </div>
      );
    }

    // 그 외에는 드롭다운(select)으로 선택하는 조건 렌더링
    return (
      <SelectBox
        name={name}
        options={options}
        selectedValue={selectValue}
        placeholder="전체"
        onChange={(e) => handleChangeSearchCode(e)}
      />
    );
  };

  return (
    <form className={cn(styles.wrap, className)} onSubmit={handleSubmitSearch}>
      {/* options가 있을 때 지정된 형태로 렌더링 */}
      {renderFilters()}

      {/* 키워드 검색은 항상 존재 */}
      <TextInput
        name="keyword"
        value={keyword}
        onChange={(e) => handleChangeKeyword(e)}
        placeholder="검색어를 입력하세요."
      />
      <Button type="submit">검색</Button>
    </form>
  );
}

export default SearchBox;
