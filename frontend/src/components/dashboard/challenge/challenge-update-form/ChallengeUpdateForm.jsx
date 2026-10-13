import React, { useState } from 'react';
import Editor from "../../../common/editor/Editor.jsx";
import ExtraOptions from "../extra-options/ExtraOptions.jsx";

function ChallengeUpdateForm({ initChallengeDetail }) {
  const [updatedChallengePost, setUpdatedChallengePost] = useState(initChallengeDetail);

  // 여기서 수정용 커스텀 훅 호출

  return (
    <form>
      <Editor
        title="챌린지 수정"
        post={updatedChallengePost}
        setPost={setUpdatedChallengePost}
        extraOptions={<ExtraOptions />}
      />
    </form>
  );
}

export default ChallengeUpdateForm;
