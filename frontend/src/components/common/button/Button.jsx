import cn from "classnames";
import styles from "./Button.module.scss";

/**
 * 공통 버튼 컴포넌트 명세
 * @param {string} [className] 외부에서 전달하는 추가 커스텀 SCSS/CSS 클래스명
 * @param {object} [style] 인라인 스타일 객체
 * @param {'fill' | 'outline' | 'danger' | 'o_danger' | 'submit' | 'o_submit' | 'word'} [btnStyle="fill"] 버튼 스타일
 * @param {'sm' | 'md' | 'lg'} [size="lg"] 버튼 높이
 * @param {boolean} [fullWidth=false] true 설정 시 가로 너비를 100% 가득 채움
 * @param {string} [color] 텍스트 기본 커스텀 색상
 * @param {string} [hoverColor] 텍스트 호버 커스텀 색상
 * @param {React.ReactNode} children 버튼 내부에 들어갈 콘텐츠
 * @param {Function} [onClick] 버튼 클릭 이벤트 핸들러
 * @param {'button' | 'submit' | 'reset'} [type="button"] HTML 버튼 type 속성
 */
function Button({
  className,
  btnStyle = "fill",
  action, // 버튼의 역할 (경고인지, 서브밋인지..)
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
        action ? styles[action] : "",
        fullWidth ? styles.fullWidth : "",
        className,
      )}
      type={type}
      onClick={onClick}
      {...props}
    >
      {/* 버튼 영역 */}
      {children}
    </button>
  );
}

export default Button;
