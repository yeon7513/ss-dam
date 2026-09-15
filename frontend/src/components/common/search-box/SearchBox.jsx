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
  onSearch,
}) {
  const [selectValue, setSelectValue] = useState(initSelectValue);
  const [keyword, setKeyword] = useState(initKeyword);

  // 검색 조건 서브밋 핸들러
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    onSearch({
      [name]: selectValue,
      keyword,
    });
  }

  // 검색 조건 드롭다운 or 라디오 변경 시
  const handleChangeSearchCode = (e) => {
    const value = e.target.value;

    setSelectValue(value);
    // 키워드 input 초기화
    setKeyword("");

    onSearch({
      [name]: value,
      keyword: "",
    })
  }


  // 검색어 입력 시
  const handleChangeKeyword = (e) => {
    const value = e.target.value;

    // 키워드 input 값이 없어질 경우
    // 검색된 결과 초기화
    if (value.trim() === "") {
      onSearch({
        [name]: "",
        keyword: "",
      });
    } else {
      onSearch({
        [name]: selectValue,
        keyword: "",
      });
    }

    setKeyword(value);
  }


  // 라디오 or 드롭다운 렌더링 분기 처리
  const renderFilters = () => {
    if (!options) return null;

    // 라디오 버튼으로 조건을 지정할 경우
    if (isRadio) {
      return (
        <div className={styles.radioGroup}>
          {
            options.map((option) => (
              <RadioInput
                key={option.value}
                id={option.value}
                name={name}
                value={option.value}
                label={option.name}
                isChecked={option.value === selectValue}
                onChange={e => handleChangeSearchCode(e)}
              />
            ))
          }
        </div>
      )
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
    )
  }

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
