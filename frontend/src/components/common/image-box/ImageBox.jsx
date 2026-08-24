import cn from "classnames";
import placeholder from "../../../assets/images/placeholder.png";
import styles from "./imageBox.module.scss";

const ImageBox = ({ className, src, alt, ...props }) => {
  // 이미지 경로는 있지만, 이미지 파일이 없을 경우 엑박으로 뜸.
  // 이걸 방지하기 위해 onError 핸들러를 사용함.

  const handleError = (e) => {
    // 이미지 파일이 깨졌을 경우 플레이스홀더 이미지로
    e.target.src = placeholder;
  }

  return (
    <img
      className={cn(styles.imageBox, className)}
      src={src || placeholder}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageBox;
