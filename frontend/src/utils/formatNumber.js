// 값이 없으면 '-'를 반환하고, 숫자는 천 단위 구분 쉼표를 넣어 표시
// 예: 12345 → '12,345', 0 → '0', null → '-'
export const formatNumber = (value) =>
  value == null ? '-' : Number(value).toLocaleString('ko-KR');
