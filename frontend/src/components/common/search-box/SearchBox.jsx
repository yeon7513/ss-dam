import SelectBox from "../../forms/select-box/SelectBox";
import TextInput from "../../forms/text-input/TextInput";
import Button from "./../button/Button";
import cn from "classnames";
import styles from "./SearchBox.module.scss";
import { useState } from "react";

function SearchBox({
  className,
  initSearchCode = 0,
  initKeyword = '',
  options = null,
  onSubmit,
}) {
  const [searchCode, setSearchCode] = useState(initSearchCode);
  const [keyword, setKeyword] = useState(initKeyword);

  const handleChangeSearchCode = (e) => {
    setSearchCode(e.target.value);
    onSubmit(e.target.value, keyword);
  }

  // 검색 조건 서브밋 핸들러
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    onSubmit(searchCode, keyword);
  }

  return (
    <form className={cn(styles.wrap, className)} onSubmit={handleSubmitSearch}>
      {options && (
        <SelectBox
          name="searchCode"
          options={options}
          selectedValue={searchCode}
          placeholder="전체"
          onChange={(e) => handleChangeSearchCode(e)}
        />
      )}
      <TextInput
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요."
      />
      <Button type="submit">검색</Button>
    </form>
  );
}

export default SearchBox;
