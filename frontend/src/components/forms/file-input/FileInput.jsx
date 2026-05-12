function FileInput({ id, isMultiple = true, onFileChange, ref }) {
  return (
    <input
      id={id}
      ref={ref}
      type="file"
      name="files"
      accept="image/*"
      onChange={onFileChange}
      multiple={isMultiple}
      // style={{ display: 'none' }}
    />
  );
}

export default FileInput;
