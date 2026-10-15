export const formatCreatedAt = (createdAt) => {
  const createdDate = new Date(createdAt); // DB에서 받은 문자열을 Date 객체로
  const now = new Date();

  // 오늘인지 여부 확인
  const isToday =
    createdDate.getFullYear() === now.getFullYear() &&
    createdDate.getMonth() === now.getMonth() &&
    createdDate.getDate() === now.getDate();

  if (isToday) {
    const diffMs = now - createdDate; // 밀리초
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}시간 전`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}분 전`;
    } else {
      return '방금 전';
    }
  } else {
    // 오늘이 아니면 "YYYY년 MM월 DD일" 형식으로
    const year = createdDate.getFullYear();
    const month = String(createdDate.getMonth() + 1).padStart(2, '0');
    const day = String(createdDate.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  }
};

// 날짜 값이 있으면 'YYYY-MM-DD HH:mm' 형식으로 표시하고, 없으면 '-' 반환
// 예: '2026-10-13T14:30:00' → '2026-10-13 14:30'
export const formatDate = (value) =>
  value ? String(value).replace('T', ' ').slice(0, 16) : '-';

// 분 단위까지만 (YYYY-MM-DD HH:mm)
export const formatDateTime = (dateString) => {
  if (!dateString) {
    return '-';
  }

  const date = new Date(dateString);

  // 변환 실패 시 원본 반환
  if (isNaN(date)) {
    return dateString;
  }

  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
