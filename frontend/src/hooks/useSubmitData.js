import { useState } from "react";

// 기본 전송은 POST로
export const useSubmitData = (url, method = "POST") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (data) => {
    // 전송 시작 시 기존에 남아있을 수도 있는 로딩값과 에러 비우기
    setLoading(true);
    setError(null);

    // 데이터가 이미지 파일을 포함한 FormData인지 확인
    const isFormData = data instanceof FormData;

    // FormData가 아닐 때만 JSON용 headers 추가
    const headers = isFormData ? {} : { "Content-Type": "application/json" };

    // 전송 옵션
    const options = {
      method,
      headers,
      body: isFormData ? data : JSON.stringify(data), // formData면 그대로, 아니면 JSON으로 변환
    };

    // 실제 서버 전송 로직 (fetch의 결과(result)를 반환)
    return fetch(url, { ...options })
    .then(res => {
      if (!res.ok) {
        throw new Error("데이터 전송에 실패했습니다.");
      }
      return res.json();
    })
    .then(result => {
      console.log("result: ", result);
      setLoading(false);
      return result;
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
      throw err;
    });
  };

  // 전송 실행 함수와 상태값 반환
  return { handleSubmit, loading, error };
};
