import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import Button from "../../common/button/Button";
import TextInput from "../../forms/text-input/TextInput";
import styles from "./AddressSection.module.scss";

const AddressSection = ({ setForm }) => {
  // ==========================================
  // State 정의
  // ==========================================
  const [post, setPost] = useState("");
  const [basic, setBasic] = useState("");
  const [detail, setDetail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const buttonText = "주소 검색";

  // ==========================================
  // 이벤트 핸들러
  // ==========================================
  // 주소 검색 창 토글
  const togglePostcode = () => {
    setIsOpen((prev) => !prev);
  };

  // 주소 선택 완료 핸들러
  const handleComplete = (data) => {
    let fullAddress = data.roadAddress;
    let extraAddress = "";

    // 법정동/읍/면/동 이름 예외 처리
    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraAddress += data.bname;
    }

    // 공동주택 예외 처리
    if (data.buildingName !== "" && data.apartment === "Y") {
      if (extraAddress !== "") {
        extraAddress += `, ${data.buildingName}`;
      } else {
        extraAddress += data.buildingName;
      }
    }

    // 참고 주소가 존재하면 최종 주소 뒤에 붙임
    if (extraAddress !== "") {
      fullAddress += `(${extraAddress})`;
    }

    setPost(data.zonecode);
    setBasic(fullAddress);
    setIsOpen(false);

    // 상위 SignUp의 form state 업데이트
    setForm((prev) => ({
      ...prev,
      address: fullAddress,
      detailAddress: detail,
    }));
  };

  // 상세 주소 입력 핸들러
  const handleDetailChange = (e) => {
    const detailValue = e.target.value;
    setDetail(detailValue);

    // 상위 SignUp의 form state 업데이트
    setForm((prev) => ({
      ...prev,
      address: basic,
      detailAddress: detailValue,
    }));
  };

  // ==========================================
  // JSX 퍼블리싱
  // ==========================================
  return (
    <div className={styles.addressGroup}>
      <label className={styles.label}>주소</label>

      <div className={styles.address}>
        {/* 우편번호 */}
        <div className={styles.postGroup}>
          <TextInput
            name="post_number"
            placeholder="우편 번호"
            value={post}
            disabled={post !== ""}
            readOnly
            onClick={togglePostcode}
          />
          <Button type="button" onClick={togglePostcode}>
            {buttonText}
          </Button>
        </div>

        {/* 주소 검색창 모달 */}
        {isOpen && (
          <div className={styles.modalOverlay} onClick={togglePostcode}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </div>
          </div>
        )}

        {/* 기본 주소 */}
        <TextInput
          name="basic_address"
          placeholder="주소"
          value={basic}
          disabled={basic !== ""}
          readOnly
          onClick={togglePostcode}
        />

        {/* 상세 주소 */}
        <TextInput
          name="detail_address"
          placeholder="상세 주소"
          value={detail}
          onChange={handleDetailChange}
          disabled={!post || !basic}
        />
      </div>
    </div>
  );
};

export default AddressSection;
