import React, { useState } from "react";
import TextInput from "../../../components/forms/text-input/TextInput";
import Button from "../../../components/common/button/Button";

const LogIn = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log({ memberId, password });

  return (
    <div>
      <h2>로그인</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <TextInput
            name="id"
            label="아이디"
            placeholder="아이디 입력"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
          <TextInput
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
};

export default LogIn;
