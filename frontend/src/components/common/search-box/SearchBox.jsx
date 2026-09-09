import SelectBox from "../../forms/select-box/SelectBox";
import TextInput from "../../forms/text-input/TextInput";
import Button from "./../button/Button";
import cn from "classnames";
import styles from "./SearchBox.module.scss";

function SearchBox({
  className,
  options = null,
  onSearchCodeChange = null,
  onKeywordChange,
  onSubmit,
}) {

  const handleChangeSearchKeyword = (e) => {
    const value = e.target.value;
    onKeywordChange(value);
  };

  const handleChangeSearchCode = (e) => {
    const value = e.target.value;
    onSearchCodeChange(value);
  };

  return (
    <div className={cn(styles.wrap, className)}>
      {options && (
        <SelectBox
          name="searchCode"
          options={options}
          onChange={(e) => handleChangeSearchCode(e)}
        />
      )}
      <TextInput
        onChange={(e) => handleChangeSearchKeyword(e)}
        placeholder="검색어를 입력하세요."
      />
      <Button onClick={() => onSubmit}>검색</Button>
    </div>
  );
}

export default SearchBox;
