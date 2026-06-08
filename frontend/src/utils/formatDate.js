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
      return "방금 전";
    }
  } else {
    // 오늘이 아니면 "YYYY년 MM월 DD일" 형식으로
    const year = createdDate.getFullYear();
    const month = String(createdDate.getMonth() + 1).padStart(2, "0");
    const day = String(createdDate.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  }
};
