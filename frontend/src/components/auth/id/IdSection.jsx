import Button from "../../common/button/Button";
import TextInput from "../../forms/text-input/TextInput";
import styles from "./IdSection.module.scss";

const IdSection = ({ form, setForm, isIdChecked, setIsIdChecked }) => {
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
    return null;
  };

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.replace(/\s/g, "").toLowerCase();
    setForm((prev) => ({ ...prev, [name]: formattedValue }));
    setIsIdChecked(false);
  };

  const handleCheckIdDuplicate = () => {
    if (isIdChecked) {
      alert("이미 확인된 아이디입니다.");
      return;
    }
    const errorMsg = validateId(form.id);
    if (errorMsg) {
      alert(errorMsg);
      return;
    }
    alert(`[${form.id}] 사용 가능한 아이디입니다.`);
    setIsIdChecked(true);
  };

  return (
    <div className={styles.idGroup}>
      <TextInput
        name="id"
        label="아이디"
        placeholder="영문 소문자, 숫자, 언더바(_) 조합 (8~20자)"
        value={form.id}
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
  );
};

export default IdSection;
