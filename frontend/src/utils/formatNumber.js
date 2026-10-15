// 값이 없으면 '-'를 반환하고, 숫자는 천 단위 구분 쉼표를 넣어 표시
// 예: 12345 → '12,345', 0 → '0', null → '-'
export const formatNumber = (value) =>
  value == null ? '-' : Number(value).toLocaleString('ko-KR');


// 연락처 포맷팅
export const formatPhoneNumber = (e, setError) => {
  const rawValue = e.target.value.replace(/[^0-9]/g, "");

  let formattedPhone = rawValue;

  if (rawValue.length > 3 && rawValue.length <= 7) {
    formattedPhone = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
  } else if (rawValue.length > 7) {
    formattedPhone = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 11)}`;
  }

  if (rawValue.length === 0) {
    setError("");
  } else if (rawValue.length < 11) {
    setError("휴대폰 번호 11자리를 모두 입력해 주세요.");
  } else if (!rawValue.startsWith("010")) {
    setError("010으로 시작하는 올바른 번호를 입력해 주세요.");
  } else {
    setError("");
  }

  return formattedPhone;
};
