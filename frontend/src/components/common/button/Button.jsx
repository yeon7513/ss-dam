import cn from "classnames";
import styles from "./Button.module.scss";

/**
 * 공통 버튼 컴포넌트 가이드
 * @param {string} [className] - 외부에서 전달하는 추가 커스텀 SCSS/CSS 클래스명
 * @param {'fill' | 'outline' | 'danger'} [btnStyle="fill"] - 버튼 스타일 (fill: 기본 배경 채우기, outline: 테두리만 표시, danger: 빨간색 삭제/위험)
 * @param {'sm' | 'md' | 'lg'} [size="lg"] - 버튼 높이 (sm: 2.4rem, md: 3rem, lg: 3.4rem)
 * @param {boolean} [fullWidth=false] - true 설정 시 가로 너비를 100% 가득 채움
 * @param {React.ReactNode} children - 버튼 내부에 들어갈 콘텐츠 (텍스트, 아이콘 등)
 * @param {Function} [onClick] - 버튼 클릭 이벤트 핸들러
 * @param {'button' | 'submit' | 'reset'} [type="button"] - HTML 버튼 type 속성 (기본값: "button")
 * @param {object} [props] - 기타 HTML button 태그 속성(disabled, id, aria-* 등)도 자유롭게 쓰면 됩니다!
 */

function Button({
  className,
  btnStyle = "fill",
  size = "lg",
  fullWidth = false,
  children,
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      className={cn(
        styles.button,
        styles[btnStyle],
        styles[size],
        { [styles.fullWidth]: fullWidth },
        className,
      )}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
