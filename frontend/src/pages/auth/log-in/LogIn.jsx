import React, { useState } from "react";
import TextInput from "../../../components/forms/text-input/TextInput";
import Button from "../../../components/common/button/Button";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: memberId,
          password: password,
        }),
        credentials: "include",
      });

      const result = await response.json();
      console.log("백엔드가 준 결과물:", result);

      if (result.success) {
        const userRole = result.data.role;
        const userName = result.data.name;

        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userName", userName);

        if (userRole === "ADMIN") {
          alert("관리자 계정으로 로그인");
          navigate("/admin");
        } else {
          alert(`${userName}님 환영`);
          navigate("/");
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("로그인 중 서버 통신 에러:", error);
      alert("서버와 통신하는 중 문제가 발생했습니다.");
    }
  };

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
