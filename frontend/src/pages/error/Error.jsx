import React from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/button/Button.jsx";

function Error() {
  const { errCode } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const defaultMessage = {
    403: "접근 권한이 없습니다.",
    404: "페이지를 찾을 수 없습니다.",
    500: "서버 내부 오류가 발생했습니다.",
  }

  const errMessage = location.state?.errMessage
    || defaultMessage[errCode]
    || "알 수 없는 오류가 발생했습니다.";


  return (
    <div>
      <h2>{errCode}</h2>
      <p>{errMessage}</p>

      <div>
        {errCode === '403' && (
          <Button onClick={() => navigate("/login")}>
            로그인
          </Button>
        )}
        <Button onClick={() => navigate("/", { replace: true })}>
          메인 페이지로 이동
        </Button>
      </div>
    </div>
  );
}

export default Error;
