import { HOST } from "../lib/url";

export const sendToSignup = async (data, navigate) => {
  const formData = new FormData();

  formData.append("id", data.id);
  formData.append("password", data.password);
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("phone", data.phone);

  if (data.file) {
    formData.append("file", data.file);
  }

  try {
    // 1. URL 경로를 /member에서 백엔드와 맞춘 /api/member 로 변경
    const response = await fetch(`${HOST}/api/member`, {
      method: "POST",
      body: formData,
    });

    // 2. res.text() 대신 res.json()으로 응답 수신
    const result = await response.json();

    // 3. 백엔드의 ApiResponse 구조({ success: true, message: "..." })에 맞춰 조건 처리
    if (response.ok && result.success) {
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } else {
      alert(result.message || "회원가입 실패");
    }
  } catch (error) {
    console.error("통신 에러: ", error);
    alert("서버 연결에 실패했습니다.");
  }
};

// 아이디 중복확인 API 호출
export const checkDuplicateId = async (id) => {
  try {
    const response = await fetch(
      `${HOST}/api/member/check-id?id=${encodeURIComponent(id)}`, //경로에서 admin 삭제
    );

    if (!response.ok) {
      throw new Error("서버 응답 에러");
    }

    // 백엔드의 ApiResponse<Boolean> 수신
    const result = await response.json();
    return result; // { success: true, message: "...", data: true/false }
  } catch (error) {
    console.error("중복확인 통신 에러:", error);
    throw error;
  }
};
