import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  /* 전체 선택 상태 확인 */
  const isAllSelected = location.pathname === "/market" && !location.search;

  return (
    /* 사이드 메뉴 영역 */
    <div className={styles.sideNav}>
      {/* 물품 등록 영역 */}
      <div>
        {isLoggedIn ? (
          <Button
            btnStyle="fill"
            size="lg"
            fullWidth
            onClick={() => navigate("/market/register")}
          >
            물품 등록
          </Button>
        ) : (
          <div className={styles.loginNotice}>
            <p>로그인하세요.</p>
            <Button fullWidth={true} onClick={() => navigate("/login")}>로그인</Button>
          </div>
        )}
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
