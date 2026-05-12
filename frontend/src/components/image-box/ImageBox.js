import cn from "classnames";
import style from "./imageBox.module.scss";

const ImageBox = ({ className, src, alt, ...props }) => (
  <img
    className={cn(style.ImageBox, className)}
    src={src}
    alt={alt}
    {...props}
  />
);

export default ImageBox;
