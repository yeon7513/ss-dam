// 입력 필드 전용 핸들러
// input 등 form 관련해 입력한 내용을 state에 저장할 때 사용
export const handleSetField = (e, setState) => {
  const { name, value } = e.target;

  setState((prev) => ({
    ...prev,
    [name]: value,
  }));
};
