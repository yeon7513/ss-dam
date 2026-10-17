import { useEffect, useRef, useState } from "react";
import styles from "./ProductDetail.module.scss";

export default function ProductDescription({ content }) {
  const textRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    const measure = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
      setOverflows(element.scrollHeight > lineHeight * 8 + 1);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [content]);

  return (
    <div className={styles.description}>
      <p
        id="product-description"
        ref={textRef}
        className={`${styles.descriptionText} ${expanded ? "" : styles.collapsed}`}
      >
        {content}
      </p>
      {overflows && (
        <button
          type="button"
          className={styles.descriptionToggle}
          aria-expanded={expanded}
          aria-controls="product-description"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
}
