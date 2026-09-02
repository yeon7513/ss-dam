import { useState } from "react";
import TextInput from "../../forms/text-input/TextInput";
import Button from "../button/Button";
import styles from "./Address.module.scss";
import DaumPostcodeEmbed from "react-daum-postcode";

// 나중에 카카오 주소 API 같은 거랑 연동할 때 소스코드 변경해야합니다!!
function Address({ onChange }) {
  // ==========================================
  // State 정의
  // ==========================================
  const [post, setPost] = useState("");
  const [basic, setBasic] = useState("");
  const [detail, setDetail] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 주소창 열림/닫힘 상태

  // ==========================================
  // 변수 정의
  // ==========================================
  let buttonText = "주소 검색";
  // if (isOpen) {
  //   buttonText = "닫기";
  // }

  // const handleFormatAddress = (detail) => {
  //   if (post && basic && detail) {
  //     const formatAddress = `${basic} ${detail}`;
  //     onChange(formatAddress);
  //   }
  // };

  // ==========================================
  // 이벤트 핸들러
  // ==========================================
  // 주소 검색 버튼 클릭 시 실행
  const togglePostcode = () => {
    setIsOpen((prev) => !prev);
  };

  // 주소 선택 완료 핸들러
  const handleComplete = (data) => {
    let fullAddress = data.roadAddress;
    let extraAddress = "";

    // 법정동/읍/면/동 이름 추가 예외 처리 bname = 카카오에서 지원하는 변수명 법정동 이름임
    // [동|로|가] 우리나라 주소 체계의 특성 상 도로명 주소나 지번 주소 등을 전부 입력받기 위한 정규식 필터링 $는 끝 글자 g는 전체 검사 test는 true, false 체크
    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraAddress += data.bname;
    }

    // 공동주택일때 기존 주소가 있으면 , 붙이기 공동주택인지 아닌지는 api에서 걸러줌
    if (data.buildingName !== "" && data.apartment == "Y") {
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

    setPost(data.zonecode); // 우편번호 저장
    setBasic(fullAddress); // 기본 주소 저장
    setIsOpen(false); // 주소 입력창 닫기

    // 상세 주소가 입력되기 전, 기본 주소만 먼저 위로 전달
    onChange({
      address: fullAddress,
      detailAddress: detail,
    });
  };

  // 상세 주소 입력 핸들러
  const handleDetailChange = (e) => {
    const detailValue = e.target.value;
    setDetail(detailValue);

    // 객체 형태로 통일하여 전달
    onChange({
      address: basic,
      detailAddress: detailValue,
    });
  };

  // ==========================================
  // JSX 퍼블리싱
  // ==========================================

  return (
    <div className={styles.address}>
      <div className={styles.postGroup}>
        {/* 우편번호 */}
        <TextInput
          name="post_number"
          placeholder="우편 번호"
          value={post}
          disabled={post !== ""} //-> 주소 API 등록 후 주석 해제할 것!!
          readOnly
          onClick={togglePostcode} // 핸들러
        />
        <Button onClick={togglePostcode}>{buttonText}</Button>
      </div>

      {/* 주소 검색창 (isOpen이 true 일 때만 열림) */}
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

      {/*  기본 주소 */}
      <TextInput
        name="basic_address"
        placeholder="주소"
        value={basic}
        disabled={basic !== ""} // -> 주소 API 등록 후 주석 해제할 것!!
        readOnly
        onClick={togglePostcode} // 핸들러
      />

      {/* 상세 주소 */}
      <TextInput
        name="detaile_address"
        placeholder="상세 주소"
        value={detail}
        onChange={handleDetailChange}
        disabled={!post || !basic}
      />
    </div>
  );
}

export default Address;
