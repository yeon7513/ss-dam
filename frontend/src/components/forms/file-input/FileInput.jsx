function FileInput({ isMultiple = true }) {
  return <input type="file" name="imgFile" multiple={isMultiple} />;
}

export default FileInput;
