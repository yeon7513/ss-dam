import { useEffect, useRef, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

import { updateMember } from "../../../../api/memberAccount.js";
import placeholder from "../../../../assets/images/placeholder.png";
import { useAuth } from "../../../../context/AuthContext.jsx";
import styles from "../MemberAccount.module.scss";

export default function EditProfile() {
  const { user, authFetch } = useAuth();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const submitting = useRef(false);

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [addressOpen, setAddressOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];
    event.target.value = "";

    if (!selected) return;

    if (!["image/jpeg", "image/png"].includes(selected.type)) {
      setError("JPG 또는 PNG 파일을 선택해주세요.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("이미지는 5MB 이하로 선택해주세요.");
      return;
    }

    setError("");
    setFile(selected);
  };

  const handleAddressComplete = (data) => {
    setPostcode(data.zonecode);
    setAddress(data.roadAddress || data.jibunAddress);
    setDetailAddress("");
    setAddressOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;

    setError("");

    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (password && !passwordPattern.test(password)) {
      setError("비밀번호는 8~20자의 영문·숫자·특수문자(@$!%*?&)를 포함해야 합니다.");
      return;
    }

    if (password !== passwordCheck) {
      setError("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const normalizedPhone = phone.replace(/-/g, "").trim();

    if (!/^010\d{8}$/.test(normalizedPhone)) {
      setError("올바른 휴대전화 번호를 입력해주세요.");
      return;
    }

    if (!address.trim()) {
      setError("주소 검색으로 주소를 선택해주세요.");
      return;
    }

    submitting.current = true;
    setSaving(true);

    try {
      await updateMember(authFetch, {
        password,
        phone: normalizedPhone,
        address: [address.trim(), detailAddress.trim()]
        .filter(Boolean)
        .join(" "),
        file,
      });

      alert("회원 정보가 수정되었습니다.");
      navigate("/mypage");
    } catch (err) {
      setError(err.message || "회원 정보 수정에 실패했습니다.");
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  };

  return (
    <section className={styles.panel}>
      <h2>정보 변경</h2>

      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fields} disabled={saving}>
          <div className={styles.editGrid}>
            <div className={styles.profile}>
              <img
                src={preview || user?.profileImage || placeholder}
                alt="프로필 미리보기"
              />

              <input
                ref={fileInput}
                className={styles.fileInput}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                hidden
              />

              <button
                type="button"
                className={styles.secondary}
                onClick={() => fileInput.current?.click()}
              >
                프로필 사진 변경
              </button>
              <p className={styles.profileHelp}>
                - JPG, PNG 파일을 사용할 수 있습니다.<br />
                - 파일 크기는 5MB 이하로 선택해주세요.<br />
                - 사진 선택 후 ‘변경’을 누르면 저장됩니다.
              </p>
            </div>

            <div className={styles.formBody}>
              <label className={styles.field}>
                비밀번호
                <input
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="비밀번호"
                  maxLength={20}
                />
                <small>8~20자의 영문, 숫자, 특수문자(@$!%*?&) 포함</small>
              </label>

              <label className={styles.field}>
                비밀번호 확인
                <input
                  type="password"
                  autoComplete="new-password"
                  value={passwordCheck}
                  onChange={(event) => setPasswordCheck(event.target.value)}
                  placeholder="비밀번호 확인"
                  maxLength={20}
                />
              </label>

              <div className={styles.field}>
                <label htmlFor="member-phone">전화번호</label>
                <div className={styles.row}>
                  <input
                    id="member-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="전화번호"
                    required
                  />
                  <button
                    type="button"
                    className={styles.secondary}
                    disabled
                  >
                    본인 인증
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="member-address">주소</label>
                <div className={styles.row}>
                  <input
                    aria-label="우편번호"
                    value={postcode}
                    placeholder="우편번호"
                    readOnly
                  />
                  <button
                    type="button"
                    className={styles.secondary}
                    onClick={() => setAddressOpen(true)}
                  >
                    주소 검색
                  </button>
                </div>

                <input
                  id="member-address"
                  value={address}
                  placeholder="기본 주소"
                  readOnly
                />

                <input
                  aria-label="상세 주소"
                  value={detailAddress}
                  onChange={(event) => setDetailAddress(event.target.value)}
                  placeholder="상세 주소"
                  disabled={!address}
                />
              </div>

              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}

            </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() => navigate("/mypage")}
                >
                  취소
                </button>
                <button type="submit" className={styles.primary}>
                  {saving ? "저장 중..." : "변경"}
                </button>
              </div>
          </div>
        </fieldset>
      </form>

      {addressOpen && (
        <div className={styles.overlay}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="주소 검색"
            onKeyDown={(event) => {
              if (event.key === "Escape") setAddressOpen(false);
            }}
          >
            <button
              type="button"
              className={styles.secondary}
              onClick={() => setAddressOpen(false)}
              autoFocus
            >
              닫기
            </button>
            <DaumPostcodeEmbed onComplete={handleAddressComplete} />
          </div>
        </div>
      )}
    </section>
  );
}
