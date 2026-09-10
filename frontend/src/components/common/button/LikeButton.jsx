import React, { useState } from "react";
import styles from "./LikeButton.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({
  targetType = "feeds",
  targetCode,
  initialIsLiked = false,
  initialLikeCount = 0,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLike = async () => {
    if (!targetCode || isLoading) return;
    setIsLoading(true);

    const prevIsLiked = isLiked;
    const prevCount = likeCount;

    setIsLiked(!prevIsLiked);
    setLikeCount(prevIsLiked ? prevCount - 1 : prevCount + 1);

    try {
      const response = await fetch(`/api/${targetType}/${targetCode}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "처리 중 오류가 발생했습니다");
      }

      setIsLiked(result.data);
    } catch (error) {
      console.error("좋아요 토글 실패: ", error);
      setIsLiked(prevIsLiked);
      setLikeCount(prevCount);
      alert(error.message || "로그인이 필요한 서비스입니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`${styles["like-button"]} ${isLiked ? styles.liked : ""}`}
      onClick={handleToggleLike}
      disabled={isLoading}
      aria-label="좋아요"
    >
      {isLiked ? <FaHeart className={styles["like-count"]} /> : <FaRegHeart />}
      <span className={styles["like-count"]}>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
