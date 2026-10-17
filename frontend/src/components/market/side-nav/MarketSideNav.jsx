import { useId, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../common/button/Button.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import styles from "./MarketSideNav.module.scss";

function MarketSideNav({ categories, isLoggedIn, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuId = useId();
  const [expandedCategories, setExpandedCategories] = useState({});

  /* 인증 상태 조회 */
  const auth = useAuth();
  const checkLoggedIn = isLoggedIn ?? auth?.isLoggedIn ?? !!auth?.user;

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
        {checkLoggedIn ? (
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
            <Button
              fullWidth
              onClick={() =>
                navigate("/login", {
                  state: { from: location.pathname + location.search },
                })
              }
            >
              로그인
            </Button>
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
          const hasChildren = category.depth?.length > 0;
          const isExpanded = expandedCategories[category.code] ?? isActive;
          const subMenuId = `${menuId}-${category.code}`;

          return (
            <li key={category.code}>
              <div className={styles.categoryRow}>
              <button
                className={isActive ? styles.active : ""}
                type="button"
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-controls={hasChildren ? subMenuId : undefined}
                onClick={(e) => {
                  setExpandedCategories((previous) => ({ ...previous, [category.code]: !isExpanded }));
                  handleClickCategory(e, category.code);
                }}
              >
                {category.name}
              </button>
              {hasChildren && (
                <button
                  className={`${styles.toggle} ${isActive ? styles.active : ""}`}
                  type="button"
                  aria-label={`${category.name} 소분류 ${isExpanded ? "접기" : "펼치기"}`}
                  aria-expanded={isExpanded}
                  aria-controls={subMenuId}
                  onClick={() => setExpandedCategories((previous) => ({
                    ...previous,
                    [category.code]: !isExpanded,
                  }))}
                >
                  <HiChevronDown className={isExpanded ? styles.expandedArrow : ""} aria-hidden="true" />
                </button>
              )}
              </div>

              {/* 서브 메뉴 영역 */}
              <ul id={subMenuId} className={styles.subMenu} hidden={!isExpanded}>
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
