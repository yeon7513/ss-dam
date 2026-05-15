import React from "react";

const ChallengeGuide = () => {
  return (
    <div className="challenge-guide-page">
      {/* 상단바 */}
      <header className="top-bar">
        <div className="logo">쓰담쓰담</div>

        <div className="nav-right">
          <div className="user-menu">
            <span>마이페이지</span>
            <span>|</span>
            <span>로그아웃</span>
          </div>

          <nav>
            <span>소개</span>
            <span>다시쓰담</span>
            <span>피드</span>
            <span className="active">챌린지</span>
            <span>고객센터</span>
          </nav>
        </div>
      </header>

      <div className="breadcrumb"></div>
    </div>
  );
};

export default ChallengeGuide;
