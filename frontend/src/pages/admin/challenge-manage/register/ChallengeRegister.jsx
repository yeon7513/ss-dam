import React from 'react';
import Editor from "../../../../components/common/editor/Editor.jsx";
import ExtraOptions from "../../../../components/admin/challenge/extra-options/ExtraOptions.jsx";

function ChallengeRegister() {
  // 여기서 전송 로직 ㄱㄱ

  return (
    <form>
      <Editor
        title="챌린지 등록"
        extraOptions={<ExtraOptions />}
      />
    </form>
  );
}

export default ChallengeRegister;
