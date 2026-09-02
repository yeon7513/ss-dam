import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* [아이콘 추가] react-icons/hi 패키지에서 눈 모양 아이콘 가져오기 */
import { HiEye, HiEyeOff } from "react-icons/hi";

import { sendToSignup } from "../../../api/member";
import Address from "../../../components/common/address/Address";
import Button from "../../../components/common/button/Button";
import { handleSetField } from "../../../utils/changeHandler";
import ProfileImage from "./../../../components/common/profile-image/ProfileImage";
import TextInput from "./../../../components/forms/text-input/TextInput";
import styles from "./SignUp.module.scss";

// ==========================================
// 아이디 정규식 & 예약어 리스트 정의
// ==========================================

// 시스템 및 서비스 필수 예약어 리스트
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

  // 생년월일 : 오늘 날짜 구하기 (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // ==========================================
  // 공통 & 기본 Form State
  // ==========================================
  const [form, setForm] = useState({
    id: "",
    password: "",
    name: "",
    phone: "",
    address: "", // 기본 주소
    detailAddress: "", // 상세 주소
  });

  // 아이디 중복확인 통과 여부 State
  const [isIdChecked, setIsIdChecked] = useState(false);

  // ==========================================
  // 아이디 관련 State & 핸들러
  // ==========================================
  /* 아이디 변경 핸들러 */
  const handleIdChange = (e) => {
    const { name, value } = e.target;
    const valueWithoutSpace = value.replace(/\s/g, ""); // 공백 제거

    setForm((prev) => ({
      ...prev,
      [name]: valueWithoutSpace,
    }));
    setIsIdChecked(false);
  };

  /* 아이디 중복확인 버튼 클릭 핸들러 */
  const handleCheckIdDuplicate = () => {
    const id = form.id;

    // 1. 빈 값 체크
    if (!id.trim()) {
      alert("아이디를 입력해 주세요.");
      return;
    }

    // 2. 글자 수 체크 (8~20자)
    if (id.length < 8 || id.length > 20) {
      alert("아이디는 8자 이상 20자 이하로 입력해 주세요.");
      return;
    }

    // 3. 첫 글자 규칙 체크
    if (!/^[a-z]/.test(id)) {
      alert("아이디의 첫 글자는 영문 소문자여야 합니다.");
      return;
    }

    // 4. 맨 끝 글자 규칙 체크 (언더바 제한)
    if (/_$/.test(id)) {
      alert("아이디 맨 끝에는 언더바(_)를 사용할 수 없습니다.");
      return;
    }

    // 5. 허용되지 않은 특수문자/대문자/한글 등 포함 여부 체크
    if (/[^a-z0-9_]/.test(id)) {
      alert("아이디는 영문 소문자, 숫자, 언더바(_)만 사용할 수 있습니다.");
      return;
    }

    // 6. 시스템 예약어 체크
    if (reservedIds.includes(id.toLowerCase())) {
      alert("해당 아이디는 서비스에서 예약된 단어로 사용할 수 없습니다.");
      return;
    }

    // 모든 조건을 통과하면 중복확인 성공 처리
    alert(`[${id}] 사용 가능한 아이디입니다!`);
    setIsIdChecked(true);
  };

  // ==========================================
  // 비밀번호 관련 State, 정규식 & 핸들러
  // ==========================================
  // 비밀번호 확인 전용 state
  const [passwordCheck, setPasswordCheck] = useState("");

  // 에러 메시지 state
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  // 비밀번호 일치(성공) 상태 관리 state
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  /* 비밀번호 보이기/숨기기 상태 관리 (false: 숨김, true: 표시) */
  const [showPassword, setShowPassword] = useState(false);

  /* 비밀번호 보이기/숨기기 토글 핸들러 */
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // 비밀번호 정규식 : 영문, 숫자, 특수문자(@$!%*?&) 포함 8~20자
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    handleSetField(e, setForm);

    // 비밀번호 유효성 검사
    if (!value) {
      setPasswordError("");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "비밀번호는 영문, 숫자, 특수문자 포함 8~20자여야 합니다.",
      );
    } else {
      setPasswordError("");
    }

    // 비밀번호란 입력/수정 시 비밀번호 확인란 초기화
    setPasswordCheck(""); // 입력되어 있던 확인란 값 삭제
    setPasswordConfirmError(""); // 확인란 관련 메시지 초기화
    setIsPasswordMatched(false); // 일치 상태 해제
  };

  // 비밀번호 확인 변경 핸들러
  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPasswordCheck(value);

    // 비동기 State(form.password) 대신 e.target.value에서 직접 가져온 value와 일치하면 성공 처리
    if (!value) {
      setPasswordConfirmError("");
      setIsPasswordMatched(false);
    } else if (form.password !== value) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      setIsPasswordMatched(false);
    } else {
      setPasswordConfirmError("비밀번호가 일치합니다!");
      setIsPasswordMatched(true);
    }
  };

  // ==========================================
  // 이름 핸들러 (공백 제한)
  // ==========================================
  // 이름 핸들러
  const handleNameChange = (e) => {
    const { name, value } = e.target;

    // 연달아 친 공백만 1칸으로 변경 (앞/뒤 trim은 제출 시 수행)
    const formattedValue = value.replace(/\s+/g, " ");

    setForm((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  // ==========================================
  // 전화번호 핸들러
  // ==========================================
  // 전화번호 정규식 : 010, 011 등으로 시작하는 11자리 숫자
  const phoneRegex = /^01[016789]\d{7,8}$/;

  // ==========================================
  // 주소 & 프로필 이미지 핸들러
  // ==========================================

  // 주소 추가
  const handleTakeAddress = ({ address, detailAddress }) => {
    setForm((prev) => ({
      ...prev,
      address: address, // 기본 주소 업데이트
      detailAddress: detailAddress, // 상세 주소 업데이트
    }));
  };

  // 이미지 전용
  const handleChangeProfileImg = (file) => {
    if (file) {
      setForm((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  // ==========================================
  // Submit 제출 핸들러
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = form.id;

    // ==========================================
    // 1. 아이디 세부 검증 (오류 원인 명확화)
    // ==========================================
    // 1-1. 빈 값 체크
    if (!id.trim()) {
      alert("아이디를 입력해 주세요.");
      return;
    }

    // 1-2. 글자 수 체크 (8~20자)
    if (id.length < 8 || id.length > 20) {
      alert("아이디는 8자 이상 20자 이하로 입력해 주세요.");
      return;
    }

    // 1-3. 첫 글자 규칙 체크
    if (!/^[a-z]/.test(id)) {
      alert("아이디의 첫 글자는 영문 소문자여야 합니다.");
      return;
    }

    // 1-4. 맨 끝 글자 규칙 체크 (언더바 제한)
    if (/_$/.test(id)) {
      alert("아이디 맨 끝에는 언더바(_)를 사용할 수 없습니다.");
      return;
    }

    // 1-5. 허용되지 않은 문자 체크
    if (/[^a-z0-9_]/.test(id)) {
      alert("아이디는 영문 소문자, 숫자, 언더바(_)만 사용할 수 있습니다.");
      return;
    }

    // 1-6. 시스템 예약어 체크
    if (reservedIds.includes(id.toLowerCase())) {
      alert("해당 아이디는 서비스에서 예약된 단어로 사용할 수 없습니다.");
      return;
    }

    // 2. 아이디 중복확인 완료 여부 검증
    if (!isIdChecked) {
      alert("아이디 중복확인을 진행해 주세요.");
      return;
    }

    // ==========================================
    // 비밀번호 검증
    // ==========================================
    // 3. 비밀번호 입력 여부 검증
    if (!form.password) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    // 4. 비밀번호 형식이 올바른지 검증
    if (!passwordRegex.test(form.password)) {
      alert("비밀번호 형식을 확인해 주세요.");
      return;
    }

    // 5. 비밀번호 확인 입력 여부 검증
    if (!passwordCheck) {
      alert("비밀번호 확인을 입력해 주세요.");
      return;
    }

    // 6. 비밀번호 일치 여부 검증
    if (!isPasswordMatched) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // ==========================================
    // 7. 이름 검증 (양 끝 공백 정제 & 형태 검사)
    // ==========================================
    const cleanName = form.name.trim(); // 양 끝 공백 최종 제거

    // 7-1. 이름 입력 여부
    if (!cleanName) {
      alert("이름을 입력해 주세요.");
      return;
    }

    // 7-2. 이름 글자 수 검증 (공백 포함 2~20자)
    if (cleanName.length < 2 || cleanName.length > 20) {
      alert("이름은 2자 이상 20자 이하로 입력해 주세요.");
      return;
    }

    // 7-3. 올바른 한글/영문 형태 검증 (단독 자음/모음, 특수문자, 숫자 금지)
    const nameRegex = /^[가-힣a-zA-Z\s]+$/;
    if (!nameRegex.test(cleanName) || /[ㄱ-ㅎㅏ-ㅣ]/.test(cleanName)) {
      alert("이름은 올바른 한글 또는 영문으로만 입력해 주세요.");
      return;
    }

    // ==========================================
    // 기타 입력 정보 검증
    // ==========================================
    // 8. 생년월일 선택 여부 검증
    if (!form.birth) {
      alert("생년월일을 선택해 주세요.");
      return;
    }

    // 9. 전화번호 입력 및 형식 검증
    if (!form.phone.trim()) {
      alert("전화번호를 입력해 주세요.");
      return;
    }

    if (!phoneRegex.test(form.phone.replace(/-/g, ""))) {
      alert("올바른 전화번호 형식(11자리 숫자)을 입력해 주세요.");
      return;
    }

    // 10-1. 기본 주소 입력 여부 검증
    if (!form.address) {
      alert("주소를 입력해 주세요.");
      return;
    }

    // 10-2. 상세 주소 입력 여부 검증
    if (!form.detailAddress || !form.detailAddress.trim()) {
      alert("상세 주소를 입력해 주세요.");
      return;
    }

    // ==========================================
    // API 호출 전 최종 데이터 정리 (이름 양 끝 공백 정제 반영)
    // ==========================================
    const submitData = {
      ...form,
      name: cleanName,
    };

    sendToSignup(submitData, navigate);
  };

  // ==========================================
  // JSX 퍼블리싱
  // ==========================================
  return (
    <main className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <h2>회원가입</h2>
        <form method="post" onSubmit={handleSubmit}>
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
          <div className={styles.messageContainer}>
            <div className={styles.passwordGroup}>
              {/* type 속성을 showPassword 상태에 따라 "text" 또는 "password"로 동적 변경 */}
              <TextInput
                type={showPassword ? "text" : "password"}
                name="password"
                label="비밀번호"
                placeholder="비밀번호 입력"
                onChange={handlePasswordChange}
              />

              {/* 비밀번호 확인란도 동일하게 type 동적 변경 */}
              <TextInput
                type={showPassword ? "text" : "password"}
                name="password_check"
                label="비밀번호 확인"
                value={
                  passwordCheck
                } /* 확인란 입력값 초기화 (비밀번호란 수정 시) */
                placeholder={
                  !passwordError && form.password
                    ? "비밀번호 확인"
                    : "비밀번호 먼저 입력하세요"
                }
                onChange={handlePasswordCheckChange}
                /* 1차 비밀번호가 없거나 정규식을 통과하지 못하면 비활성화 */
                disabled={!form.password || !!passwordError}
              />

              {/* 삼항 연산자로 눈 상태에 따라 아이콘 분기 */}
              <button
                type="button"
                className={styles.togglePasswordBtn}
                onClick={toggleShowPassword}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
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
          </div>

          {/* 기본 정보 (이름, 생년월일) 영역 */}
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

          {/* 프로필 영역 */}
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
