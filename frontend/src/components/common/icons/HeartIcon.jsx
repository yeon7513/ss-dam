import React from "react";

// ㅅㅂ 이게 뭐람 대체
// 웹 개발(React/JSX)에서 사용하는 하트(♥) 모양 아이콘의 SVG 코드입니다. 주로 웹사이트나 앱의 '좋아요', '찜하기', '즐겨찾기' 버튼으로 사용됩니다. 랍니다
// lucide-react? 라는걸 쓰면 {Heart} 뭐 이런걸로 불러올 수 있나봐요 감사합니다 (__)
const HeartIcon = ({ className = "" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};

export default HeartIcon;
