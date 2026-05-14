function FileInput({ id, isMultiple = true, onFileChange, ref }) {
  return (
    <input
      id={id}
      ref={ref}
      type="file"
      name="files"
      accept="image/*"
      onChange={(e) => onFileChange(e.target.files)}
      multiple={isMultiple}
      // style={{ display: 'none' }}
    />
  );
}

export default FileInput;
