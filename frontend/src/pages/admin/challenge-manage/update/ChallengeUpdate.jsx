import React from 'react';
import ChallengeUpdateForm from "../../../../components/admin/challenge/challenge-update-form/ChallengeUpdateForm.jsx";

function ChallengeUpdate() {
  // 수정 폼은 좀 더 까다로움
  // 이 첫 랜딩 페이지에서 데이터를 불러온 후,
  // ChallengeUpdateForm 컴포넌트를 호출 -> 데이터 넣어줌
  // register와 다르게 동작해야 데이터가 끊김없이 들어옵니다.

  return (
    <div>
      <ChallengeUpdateForm
        key={""} // 렌더링 감지용
        initChallengeDetail={null} // 들어온 데이터 (기존에 작성된 글 내용)
      />
    </div>
  );
}

export default ChallengeUpdate;
