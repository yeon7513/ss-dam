import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HiEye, HiEyeOff } from "react-icons/hi"; //눈아이콘

import { sendToSignup } from "../../../api/member";
import Address from "../../../components/common/address/Address";
import Button from "../../../components/common/button/Button";
import { handleSetField } from "../../../utils/changeHandler";
import ProfileImage from "./../../../components/common/profile-image/ProfileImage";
import TextInput from "./../../../components/forms/text-input/TextInput";
import styles from "./SignUp.module.scss";

// 시스템 및 서비스 필수 예약어 리스트 (컴포넌트 외부에 선언하여 리렌더링 시 재생성 방지)
const reservedIds = [
  "admin",
  "administrator",
  "root",
  "system",
  "master",
  "webmaster",
  "support",
  "help",
  "info",
  "contact",
  "official",
  "null",
  "undefined",
  "test",
  "login",
  "signup",
  "dashboard",
  "pay",
  "service",
];

const SignUp = () => {
  const navigate = useNavigate();

  // ==========================================
  // 공통 & 통합 Form State
  // ==========================================

  // 폼 입력 데이터 상태
  const [form, setForm] = useState({
    id: "",
    password: "",
    name: "",
    birth: "",
    phone: "",
    address: "", // 기본 주소
    detailAddress: "", // 상세 주소
    file: null, // file 필드 초기값
  });

  // 생년월일 max값 설정을 위한 오늘 날짜 (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // ==========================================
  // 아이디(ID) 관련 State, 검증 & 핸들러
  // ==========================================

  const [isIdChecked, setIsIdChecked] = useState(false); // 아이디 중복확인 통과 여부

  // 아이디 정규식 검증 함수
  const validateId = (id) => {
    const trimmedId = id ? id.trim() : "";
    if (!trimmedId) return "아이디를 입력해 주세요.";
    if (trimmedId.length < 8 || trimmedId.length > 20)
      return "아이디는 8자 이상 20자 이하로 입력해 주세요.";
    if (!/^[a-z]/.test(trimmedId))
      return "아이디의 첫 글자는 영문 소문자여야 합니다.";
    if (/_$/.test(trimmedId))
      return "아이디 맨 끝에는 언더바(_)를 사용할 수 없습니다.";
    if (/[^a-z0-9_]/.test(trimmedId))
      return "아이디는 영문 소문자, 숫자, 언더바(_)만 사용할 수 있습니다.";
    if (reservedIds.includes(trimmedId.toLowerCase()))
      return "해당 아이디는 서비스에서 예약된 단어로 사용할 수 없습니다.";
    return null;
  };

  // ==========================================
  // 아이디 관련 State & 핸들러
  // ==========================================
  // 아이디 입력 변경 핸들러
  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.replace(/\s/g, "") })); // 공백 제거
    setIsIdChecked(false); // 입력값이 바뀌면 중복확인 초기화
  };

  // 아이디 중복확인 버튼 클릭 핸들러
  const handleCheckIdDuplicate = () => {
    const errorMsg = validateId(form.id); // 공통 validateId 함수로 검증 수행
    if (errorMsg) {
      alert(errorMsg);
      return;
    }
    // 모든 조건을 통과하면 중복확인 성공 처리
    alert(`[${form.id}] 사용 가능한 아이디입니다.`);
    setIsIdChecked(true);
  };

  // ==========================================
  // 비밀번호(Password) 관련 State & 핸들러
  // ==========================================

  const [passwordCheck, setPasswordCheck] = useState(""); // 비밀번호 확인 입력값
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 양식 에러 메시지
  const [passwordConfirmError, setPasswordConfirmError] = useState(""); // 일치 여부 메시지
  const [isPasswordMatched, setIsPasswordMatched] = useState(false); // 일치 상태
  const [showPassword, setShowPassword] = useState(false); // 보기/숨기기 토글

  // 비밀번호 정규식 : 영문, 숫자, 특수문자(@$!%*?&) 포함 8~20자
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    handleSetField(e, setForm);

    // 비밀번호 유효성 검사
    if (!value) {
      setPasswordError("");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "비밀번호는 영문, 숫자, 특수문자를 조합하여 8~20자로 입력해 주세요.",
      );
    } else {
      setPasswordError("");
    }

    // 비밀번호 변경 시 비밀번호확인란 관련 상태 초기화
    setPasswordCheck(""); // 확인란 입력값 삭제
    setPasswordConfirmError(""); // 확인란 관련 메시지 초기화
    setIsPasswordMatched(false); // 일치 상태 해제
  };

  // 비밀번호 확인 입력 핸들러
  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPasswordCheck(value);

    if (!value) {
      setPasswordConfirmError("");
      setIsPasswordMatched(false);
    } else if (form.password !== value) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      setIsPasswordMatched(false);
    } else {
      setPasswordConfirmError("비밀번호가 일치합니다.");
      setIsPasswordMatched(true);
    }
  };

  // ==========================================
  // 이름(Name) 관련 핸들러
  // ==========================================
  const [nameError, setNameError] = useState("");

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    // 연속 공백 1칸 제한 및 form state 업데이트
    const formattedValue = value.replace(/\s+/g, " ");
    setForm((prev) => ({ ...prev, [name]: formattedValue }));

    // 실시간 인라인 유효성 검사
    const cleanName = formattedValue.trim();
    const nameRegex = /^[가-힣a-zA-Z\s]+$/;

    if (!cleanName) {
      setNameError(""); // 입력값이 없을 때는 메시지를 노출하지 않음
    } else if (cleanName.length < 2 || cleanName.length > 20) {
      setNameError("이름은 2자 이상 20자 이하로 입력해 주세요.");
    } else if (!nameRegex.test(cleanName) || /[ㄱ-ㅎㅏ-ㅣ]/.test(cleanName)) {
      setNameError("이름은 올바른 한글 또는 영문으로만 입력해 주세요.");
    } else {
      setNameError(""); // 모든 유효성 조건 통과 시 에러 메시지 초기화
    }
  };

  // ==========================================
  // 기타(전화번호, 주소, 프로필) 핸들러
  // ==========================================

  // 전화번호 정규식 : 010, 011 등으로 시작하는 11자리 숫자
  const phoneRegex = /^01[016789]\d{7,8}$/;

  // 주소 입력 핸들러
  const handleTakeAddress = ({ address, detailAddress }) => {
    setForm((prev) => ({ ...prev, address, detailAddress }));
  };

  // 프로필 이미지 변경 핸들러
  const handleChangeProfileImg = (file) => {
    if (file) setForm((prev) => ({ ...prev, file }));
  };

  // ==========================================
  // Form 제출 및 키보드 이벤트 처리
  // ==========================================

  // 엔터키 자동 Submit 방지
  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  // 최종 회원가입 Submit 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 아이디 검증
    const idError = validateId(form.id);
    if (idError) return alert(idError);
    if (!isIdChecked) return alert("아이디 중복확인을 진행해 주세요.");

    // 비밀번호 검증
    if (!form.password) return alert("비밀번호를 입력해 주세요.");
    if (!passwordRegex.test(form.password))
      return alert("비밀번호 형식을 확인해 주세요.");
    if (!passwordCheck) return alert("비밀번호 확인을 입력해 주세요.");
    if (!isPasswordMatched) return alert("비밀번호가 일치하지 않습니다.");

    // 이름 검증
    const cleanName = form.name.trim();
    if (!cleanName) return alert("이름을 입력해 주세요.");
    if (cleanName.length < 2 || cleanName.length > 20)
      return alert("이름은 2자 이상 20자 이하로 입력해 주세요.");

    const nameRegex = /^[가-힣a-zA-Z\s]+$/;
    if (!nameRegex.test(cleanName) || /[ㄱ-ㅎㅏ-ㅣ]/.test(cleanName)) {
      return alert("이름은 올바른 한글 또는 영문으로만 입력해 주세요.");
    }

    // 생년월일, 전화번호, 주소 검증
    if (!form.birth) return alert("생년월일을 선택해 주세요.");
    if (!form.phone.trim()) return alert("전화번호를 입력해 주세요.");
    if (!phoneRegex.test(form.phone.replace(/-/g, ""))) {
      return alert("올바른 전화번호 형식(11자리 숫자)을 입력해 주세요.");
    }
    if (!form.address) return alert("주소를 입력해 주세요.");
    if (!form.detailAddress || !form.detailAddress.trim()) {
      return alert("상세 주소를 입력해 주세요.");
    }

    // API 호출
    sendToSignup({ ...form, name: cleanName }, navigate);
  };

  // ==========================================
  // JSX 퍼블리싱
  // ==========================================
  return (
    <main className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <h2>회원가입</h2>
        <form method="post" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          {/* 아이디 영역 */}
          <div className={styles.idGroup}>
            <TextInput
              name="id"
              label="아이디"
              placeholder="영문 소문자로 시작, 8~20자"
              value={form.id} // 실시간 공백 제거
              onChange={handleIdChange}
            />

            <Button
              type="button"
              className={styles.checkButton}
              onClick={handleCheckIdDuplicate}
            >
              중복확인
            </Button>
          </div>

          {/* 비밀번호 영역 */}
          <div className={styles.passwordGroup}>
            {/* 1. 비밀번호 입력란 (아이콘 제거) */}
            <div className={styles.inputWithIcon}>
              <TextInput
                type={showPassword ? "text" : "password"}
                name="password"
                label="비밀번호"
                placeholder="비밀번호 입력"
                value={form.password}
                onChange={handlePasswordChange}
              />
            </div>

            {/* 2. 비밀번호 확인란 (아이콘 1개로 전체 제어) */}
            <div className={styles.inputWithIcon}>
              <TextInput
                type={showPassword ? "text" : "password"}
                name="password_check"
                label="비밀번호 확인"
                value={passwordCheck}
                placeholder={
                  !passwordError && form.password
                    ? "비밀번호 확인"
                    : "비밀번호 먼저 입력"
                }
                onChange={handlePasswordCheckChange}
                disabled={!form.password || !!passwordError}
              />
              <button
                type="button"
                className={styles.togglePasswordBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          {/* 비밀번호 메시지 영역 */}
          <div className={styles.errorGroup}>
            {passwordError && (
              <span className={styles.errorMessage}>{passwordError}</span>
            )}

            {passwordConfirmError && (
              <span
                className={
                  isPasswordMatched
                    ? styles.successMessage
                    : styles.errorMessage
                }
              >
                {passwordConfirmError}
              </span>
            )}
          </div>

          {/* 이름, 생년월일 영역 */}
          <div className={styles.basicInfoGroup}>
            <TextInput
              name="name"
              label="이름"
              placeholder="실명 입력"
              value={form.name} // 실시간 공백 제거
              onChange={handleNameChange}
            />
            <TextInput
              type="date"
              name="birth"
              label="생년월일"
              max={today} //오늘 이후 날짜 선택 불가 처리
              onChange={(e) => handleSetField(e, setForm)}
            />
          </div>

          {/* 이름 메시지 영역 */}
          {nameError && (
            <div className={styles.nameErrorGroup}>
              <span className={styles.errorMessage}>{nameError}</span>
            </div>
          )}

          {/* 전화번호 영역 */}
          <div className={styles.phoneGroup}>
            <TextInput
              name="phone"
              label="전화번호"
              placeholder="'-' 없이 11자리 숫자 입력"
              onChange={(e) => handleSetField(e, setForm)}
            />
          </div>

          {/* 주소 영역 */}
          <div className={styles.addressGroup}>
            <label className={styles.label}>주소</label>
            <Address onChange={handleTakeAddress} />
          </div>

          {/* 프로필 이미지 영역 */}
          <div className={styles.profileImgGroup}>
            <label className={styles.label}>프로필</label>
            <ProfileImage onChange={handleChangeProfileImg} />
          </div>

          {/* 회원가입 버튼 */}
          <div>
            <Button className={styles.submitButton} type="submit">
              회원가입
            </Button>
          </div>
        </form>

        {/* 하단 로그인 링크 */}
        <div className={styles.ctaLogin}>
          <p>계정이 있으신가요?</p>
          <Link className={styles.loginLink} to="/login">
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
