import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../common/button/Button.jsx";
import styles from "./MarketSideNav.module.scss";

function MarketSideNav({ categories, isLoggedIn, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  /* URL 선택 카테고리 코드 추출 */
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory =
    searchParams.get("category") || searchParams.get("categoryCode");

  /* 카테고리 선택 처리 */
  const handleClickCategory = (e, categoryCode) => {
    // 이벤트 버블링을 중단함.
    e.stopPropagation();

    onSearch({ categoryCode });
  };

  /* 물품 등록 처리 */
  const handleRegisterClick = () => {
    // 로그인 상태를 확인함.
    if (!isLoggedIn) {
      // 비로그인 상태 시 현재 경로를 세션 스토리지에 저장함.
      sessionStorage.setItem(
        "returnUrl",
        `${location.pathname}${location.search}`,
      );
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    // 로그인 상태 시 물품 등록 페이지로 이동함.
    navigate("/market/register");
  };

  /* 전체 선택 상태 확인 */
  const isAllSelected = location.pathname === "/market" && !location.search;

  return (
    /* 사이드 메뉴 영역 */
    <div className={styles.sideNav}>
      {/* 물품 등록 영역 */}
      <div>
        <Button
          btnStyle="fill"
          size="lg"
          fullWidth
          onClick={handleRegisterClick}
        >
          물품 등록
        </Button>
      </div>

      {/* 메인 메뉴 영역 */}
      <ul className={styles.mainMenu}>
        <li>
          <button
            className={isAllSelected ? styles.active : ""}
            type="button"
            onClick={(e) => handleClickCategory(e, null)}
          >
            전체
          </button>
        </li>

        {categories?.map((category) => {
          /* 서브 메뉴 활성화 상태 확인 */
          const isSubActive = category.depth?.some(
            (sub) => String(sub.code) === String(selectedCategory),
          );
          /* 메인 메뉴 활성화 상태 확인 */
          const isActive =
            !isAllSelected &&
            (String(category.code) === String(selectedCategory) || isSubActive);

          return (
            <li key={category.code}>
              <button
                className={isActive ? styles.active : ""}
                type="button"
                onClick={(e) => handleClickCategory(e, category.code)}
              >
                {category.name}
              </button>

              {/* 서브 메뉴 영역 */}
              <ul className={styles.subMenu}>
                {category.depth?.map((sub) => (
                  <li key={sub.code}>
                    <button
                      className={
                        !isAllSelected &&
                        String(sub.code) === String(selectedCategory)
                          ? styles.subActive
                          : ""
                      }
                      type="button"
                      onClick={(e) => handleClickCategory(e, sub.code)}
                    >
                      {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MarketSideNav;
