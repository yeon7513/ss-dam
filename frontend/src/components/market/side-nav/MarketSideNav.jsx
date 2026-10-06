import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Button from "../../common/button/Button";

import styles from "./MarketSideNav.module.scss";

// 다시쓰담 전용 사이드 메뉴
// 이 사이드메뉴는 목록, 상세 페이지에서 사용함.
// 목록에서 카테고리 메뉴 클릭 -> 필터링되어 재렌더링
// 상세 페이지에서 카테고리 메뉴 클릭 -> 목록으로 이동 후 필터링되어 재렌더링
function MarketSideNav({ categories, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  /* 카테고리 선택 상태 */
  const [selectedCategory, setSelectedCategory] = useState(null);

  /* 카테고리 선택 처리 */
  const handleClickCategory = (e, categoryCode) => {
    // 이벤트 버블링을 중단함.
    e.stopPropagation();

    // 선택한 카테고리 코드를 저장함.
    setSelectedCategory(categoryCode);

    onSearch({ categoryCode });
  };

  /* 전체 조회 상태 확인 */
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
          onClick={() => navigate("/market/register")}
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
          const isActive =
            !isAllSelected &&
            (selectedCategory === category.code ||
              category.depth?.some((sub) => sub.code === selectedCategory));

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
                        !isAllSelected && selectedCategory === sub.code
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
